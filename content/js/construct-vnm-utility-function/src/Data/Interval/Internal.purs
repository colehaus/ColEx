module Data.Interval.Internal where

import Prelude hiding (join,top,bottom)

import Data.Generic (class Generic, gShow)
import Data.Interval.Bound (Bound)
import Data.Lattice
  ( class BoundedJoinSemilattice
  , class BoundedMeetSemilattice
  , class JoinSemilattice
  , class MeetSemilattice
  , bottom, join, meet, top
  )

data Interval n
  = NonEmpty { lower :: Bound n, upper :: Bound n }
  | Empty
derive instance genericInterval :: Generic n => Generic (Interval n)
derive instance eqInterval :: Eq n => Eq (Interval n)
instance showInterval :: Generic n => Show (Interval n) where
  show = gShow
instance joinInterval :: Ord n => JoinSemilattice (Interval n) where
  join Empty r = r
  join l Empty = l
  join (NonEmpty l) (NonEmpty r) =
    NonEmpty { lower: (meet l.lower r.lower), upper: (join l.upper r.upper) }
instance boundedJoinInterval :: Ord n => BoundedJoinSemilattice (Interval n) where
  bottom = Empty
instance meetInterval :: Ord n => MeetSemilattice (Interval n) where
  meet Empty _ = Empty
  meet _ Empty = Empty
  meet (NonEmpty l) (NonEmpty r) =
    NonEmpty { lower: (join l.lower r.lower), upper: (meet l.upper r.upper) }
instance boundedMeetInterval :: Ord n => BoundedMeetSemilattice (Interval n) where
  top = NonEmpty { lower: bottom, upper: top }
