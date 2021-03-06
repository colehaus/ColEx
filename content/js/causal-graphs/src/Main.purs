module Main where

import Prelude

import App (runApp)
import ConditionalDSep as ConditionalDSep
import Discriminate as Discriminate
import DToGraph as DToGraph
import Effect (Effect)
import FindInstruments as FindInstruments
import Foreign (Foreign)
import GraphToD as GraphToD
import JQuery (ready) as J

foreign import jQuery :: Foreign

main :: Effect Unit
main =
  J.ready do
    runApp GraphToD.app
    runApp DToGraph.app
    runApp FindInstruments.app
    runApp Discriminate.app
    runApp ConditionalDSep.app
