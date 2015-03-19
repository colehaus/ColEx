module Probability where

import qualified Data.Array as A
import qualified Data.Foldable as F
import Data.Maybe
import Data.Maybe.Unsafe
import Data.Monoid.All
import Data.Profunctor.Strong
import Data.Tuple
import Math

import qualified Probability.Internal as P

type ProbList = P.ProbList
type Prob = P.Prob
type Dist = P.Dist
type Event a = a -> Boolean
type Spread a = [a] -> Maybe (P.Dist a)

oneOf :: forall a. (Eq a) => [a] -> Event a
oneOf = flip F.elem

just :: forall a. (Eq a) => a -> Event a
just = (==)

dist :: forall a. [Tuple a P.Prob] -> Maybe (P.Dist a)
dist d =
  if isValid d'
  then Just $ P.Dist d'
  else Nothing where
  d' = second runProb <$> d

runDist :: forall a. P.Dist a -> [Tuple a Number]
runDist (P.Dist a) = a

distProbs :: forall a. P.Dist a -> P.ProbList
distProbs (P.Dist a) = P.ProbList $ P.Prob <<< snd <$> a

extract :: forall a. P.Dist a -> [a]
extract = (<$>) fst <<< runDist

approx :: forall a. (Ord a) => P.Dist a -> P.Dist a -> Boolean
approx (P.Dist xs) (P.Dist ys) =
  runAll <<< F.mconcat $
  A.zipWith (\(Tuple x p) (Tuple y q) -> All $ x == y && p P.~~ q) xs ys

size :: forall a. P.Dist a -> Number
size = A.length <<< runDist

isValid :: forall a. [Tuple a Number] -> Boolean
isValid = (P.(~~)) 1 <<< P.sumP

zipDist :: forall a. [a] -> P.ProbList -> P.Dist a
zipDist as (P.ProbList ps) = P.Dist $ A.zipWith (\a (P.Prob p) -> Tuple a p) as ps

fromFreqs :: forall a. [Tuple a Number] -> Maybe (P.Dist a)
fromFreqs xs = let q = P.sumP xs in dist $ second (P.Prob <<< (/ q)) <$> xs

norm :: forall a. (Ord a) => P.Dist a -> P.Dist a
norm = P.lift P.norm'

choose :: forall a. P.Prob -> a -> a -> P.Dist a
choose p x y = let p' = runProb p in P.Dist [Tuple x p', Tuple y (1-p')]

reshape :: forall a. Spread a -> P.Dist a -> Maybe (P.Dist a)
reshape s = s <<< extract

relative :: forall a. [Number] -> Spread a
relative ns = fromFreqs <<< flip zip ns

uniform :: forall a. Spread a
uniform = fromFreqs <<< (<$>) (\a -> Tuple a 1)

map :: forall a b. (Ord b) => (a -> b) -> P.Dist a -> P.Dist b
map f = norm <<< (<$>) f

cond :: forall a. P.Dist Boolean-> P.Dist a -> P.Dist a -> P.Dist a
cond b d d' = b >>= \c -> if c then d else d'

infixl 1 >>=?
infixr 1 ?=<<
(?=<<) :: forall a. (a -> Boolean) -> P.Dist a -> Maybe (P.Dist a)
(?=<<) = filter
(>>=?) :: forall a. P.Dist a -> (a -> Boolean) -> Maybe (P.Dist a)
(>>=?) = flip filter

filter :: forall a. (a -> Boolean) -> P.Dist a -> Maybe (P.Dist a)
filter p = fromFreqs <<< A.filter (p <<< fst) <<< runDist

mapMaybe :: forall a b. (a -> Maybe b) -> P.Dist a -> Maybe (P.Dist b)
mapMaybe f =
  fromFreqs <<< A.mapMaybe (\(Tuple a p) -> flip Tuple p <$> f a) <<< runDist

runProb :: P.Prob -> Number
runProb (P.Prob p) = p

prob :: Number -> Maybe P.Prob
prob n | 0 P.<~ n && n P.<~ 1 = Just $ P.Prob n
prob n | otherwise = Nothing

infixr 1 ??
(??) :: forall a. Event a -> P.Dist a -> P.Prob
(??) p = P.Prob <<< P.sumP <<< A.filter (p <<< fst) <<< runDist

joinDists :: forall a b c. (a -> b -> c) -> P.Dist a -> (a -> P.Dist b) -> P.Dist c
joinDists f as bs'a = do
  a <- as
  b <- bs'a a
  pure $ f a b

marginalize :: forall a b. (Eq b) => (a -> b) -> P.Dist a -> P.Dist b
marginalize f d =
  fromJust <<< dist $ (<$>) (\b -> Tuple b $ ((==) b <<< f) ?? d) <<<
  A.nub $ f <$> extract d

data Iso a b = Iso (a -> b) (b -> a)
to :: forall a b. Iso a b -> a -> b
to (Iso f _) = f
from :: forall a b. Iso a b -> b -> a
from (Iso _ f) = f

expected :: forall a. Iso a Number -> P.Dist a -> a
expected i = from i <<< F.sum <<< (<$>) (\(Tuple a b) -> to i a * b) <<< runDist

variance :: forall a. Iso a Number -> P.Dist a -> a
variance i xs =
  from i <<< expected i' $ (\x -> pow (x - m) 2) <$> xs' where
    i' = (Iso id id)
    m = expected i' xs'
    xs' = to i <$> xs

stdDev :: forall a. Iso a Number -> P.Dist a -> a
stdDev i = from i <<< sqrt <<< to i <<< variance i

probList :: [P.Prob] -> Maybe P.ProbList
probList ps =
  if F.sum (runProb <$> ps) P.~~ 1
  then Just $ P.ProbList ps
  else Nothing

runProbList :: P.ProbList -> [P.Prob]
runProbList (P.ProbList ps) = ps
