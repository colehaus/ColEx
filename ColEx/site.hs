--------------------------------------------------------------------------------
{-# LANGUAGE OverloadedStrings #-}
import           Control.Arrow       ((***))
import           Data.Functor        ((<$>))
import qualified Data.Map            as M
import           Data.Monoid         (mconcat, mempty, (<>))
import           System.FilePath

import           Hakyll
import           Text.Regex          (mkRegex, subRegex)


--------------------------------------------------------------------------------
main :: IO ()
main = hakyll $ do
  tags <- buildTags postPat (fromCapture "posts/tag/*/index.html")
  tagsRules tags $ \tag pat -> do
    route idRoute
    compile $ let ctx = constField "title" ("Tagged " <> tag) <>
                        constField (tag <> "-page") mempty <>
                        listField "posts"
                                  (tagsCtx tags <> postCtx)
                                  (recentFirst =<< loadAll pat) <>
                                  defaultContext in
              makeItem mempty >>=
              loadAndApplyTemplate "templates/tag.html" ctx >>=
              finish
  create ["tags/index.html"] $ do
    route idRoute
    compile $ do
      tagCloud <- renderTagCloud 50 180 tags
      let ctx = constField "tag-cloud" tagCloud <>
                constField "title" "Tags" <>
                constField "tags-page" mempty <>
                defaultContext
      makeItem mempty >>=
        loadAndApplyTemplate "templates/tags.html" ctx >>=
        finish

  pages <- buildPaginateWith ((paginateOverflow 5 <$>) . sortChronological)
                            postPat
                            (\n -> (fromCapture (fromGlob "posts/page/*/index.html") $ show n))
  paginateRules pages $ \n pat -> do
    route idRoute
    compile $ let pageCtx = paginateContext pages n
                  ctx = constField "title" "Home" <>
                        constField "home-page" mempty <>
                        listField "posts"
                                  (teaserField "teaser" "teaser" <>
                                   tagsCtx tags <>
                                   pageCtx <>
                                   postCtx)
                                  (loadAll pat) <>
                        pageCtx <>
                        defaultContext in
              makeItem mempty >>=
              loadAndApplyTemplate "templates/index.html" ctx >>=
              finish
  create ["index.html"] $ do
    route idRoute
    compile $ (load $ paginateLastPage pages :: Compiler (Item String)) >>= makeItem . itemBody

  match overPat $ compile pandocCompiler
  match warnPat $ compile getResourceBody
  match postPat $ do
      route . customRoute $ \ident -> "posts/" <>
                                     (takeBaseName . takeDirectory . toFilePath) ident <>
                                     "/index.html"
      compile $ let ctx = warnCtx <> overCtx <> jsCtx <> cssCtx <> tagsCtx tags <> postCtx in
        getResourceBody >>=
        (renderPandoc . (sidenotes <$>) <$>) . saveSnapshot "feed" >>=
        saveSnapshot "teaser" >>=
        loadAndApplyTemplate "templates/post.html" ctx >>=
        finish

  create ["archive"] $ do
      route $ constRoute "posts/index.html"
      compile $ let ctx = constField "title" "Archive" <>
                          constField "archive-page" mempty <>
                          listField "posts"
                                    (tagsCtx tags <> postCtx)
                                    (recentFirst =<< loadAll postPat) <>
                          defaultContext in
                makeItem mempty >>=
                loadAndApplyTemplate "templates/archive.html" ctx >>=
                finish

  let feedRender f = loadAllSnapshots postPat "feed" >>= (take 10 <$>) . recentFirst >>=
                     f feedConf (postCtx <> bodyField "description")
  create ["atom"] $ do
    route $ constRoute "posts/feed/atom.xml"
    compile $ feedRender renderAtom
  create ["rss"] $ do
    route $ constRoute "posts/feed/rss.xml"
    compile $ feedRender renderRss

  match "templates/*" $ compile templateCompiler
  match "images/*" $ do
      route idRoute
      compile copyFileCompiler
  match "css/default/*.css" $ compile getResourceBody
  create ["css/default.css"] $ do
    route idRoute
    compile $ loadAll "css/default/*.css" >>= makeItem . compressCss . concatMap itemBody
  match "css/*.css" $ do
    route idRoute
    compile copyFileCompiler
  match "js/default/*.js" $ compile getResourceBody
  create ["js/default.js"] $ do
    route idRoute
    compile $ loadAll "js/default/*.js" >>= makeItem . compressJs . concatMap itemBody
  match "js/*.js" $ do
    route idRoute
    compile copyFileCompiler

postPat :: Pattern
postPat = "posts/*/main.md"
overPat :: Pattern
overPat = "posts/*/overlay.md"
warnPat :: Pattern
warnPat = "posts/*/warnings.md"

finish :: Item String -> Compiler (Item String)
finish x = loadAndApplyTemplate "templates/default.html" postCtx x >>=
           ((replaceAll "index.html" (const mempty) <$>) <$>) . relativizeUrls

--TODO: Actual js compressor
compressJs :: String -> String
compressJs = id

postCtx :: Context String
postCtx = dateField "date" "%B %e, %Y" <>
          dateField "num-date" "%F" <>
          defaultContext

paginateOverflow :: Int -> [a] -> [[a]]
paginateOverflow low xs =
  if length (last pgs) < low
  then reverse . uncurry (:) . (mconcat *** id) . (splitAt 2) . reverse $ pgs
  else pgs where
    pgs = paginateEvery low xs

paginateLastPage :: Paginate -> Identifier
paginateLastPage pg = paginateMakeId pg $ paginateNumPages pg where
  paginateNumPages :: Paginate -> Int
  paginateNumPages = M.size . paginateMap

listFieldWith' :: String -> Context a -> (Identifier -> Compiler [a]) -> Context b
listFieldWith' k ctx f = listFieldWith k ctx ((mapM makeItem =<<) . f . itemIdentifier)

overCtx :: Context String
overCtx = field "overlay" (loadBody . fromFilePath . (<> "/overlay.md") . takeDirectory . toFilePath . itemIdentifier)
warnCtx :: Context String
warnCtx = listFieldWith "warnings"
                        (details <> summary)
                        ((mapM makeItem =<<) . (lines <$>) . loadBody .
                         fromFilePath . (<> "/warnings.md") .
                         takeDirectory . toFilePath . itemIdentifier) where
  split g = return . g . break (== '|') . itemBody
  details = field "details" $ split (tail . snd)
  summary = field "summary" $ split fst



jsCtx :: Context String
jsCtx = listFieldWith' "jses" fileNameCtx (getListMeta "js")
cssCtx :: Context String
cssCtx = listFieldWith' "csses" fileNameCtx (getListMeta "css")
fileNameCtx :: Context String
fileNameCtx = field "filename" $ return . itemBody
getListMeta :: MonadMetadata m => String -> Identifier -> m [String]
getListMeta k ident = return . maybe [] (map trim . splitAll ",") . M.lookup k =<<
                      getMetadata ident

tagsCtx :: Tags -> Context String
tagsCtx tags = listFieldWith' "tags" tagCtx getTags where
  tagCtx = (field "tag-name" $ return . itemBody) <>
           (field "tag-url" $ return . toUrl . toFilePath . (tagsMakeId tags) . itemBody)

feedConf :: FeedConfiguration
feedConf = FeedConfiguration
  { feedTitle       = "Collectively Exhaustive"
  , feedDescription = "A weblog"
  , feedAuthorName  = "Cole Haus"
  , feedAuthorEmail = "colehaus@cryptolab.net"
  , feedRoot        = "http://colex.me"
  }

sidenotes :: String -> String
sidenotes = flip (subRegex $ mkRegex "\\[(.*)\\]\\^\\[(.*)\\]")
                 "<span class=\"noted\">\\1<span class=\"sidenote\">\\2</span></span>"
