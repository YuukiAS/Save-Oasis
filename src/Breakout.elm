module Breakout exposing (main)
----------------------- From Internet
import Html exposing (..)
import Message exposing (Msg)
import Playground exposing (..)
import Browser
import Task
import Ionicon exposing (..) -- some svg icons, may be helpful later
----------------------- From src
import Update
import Model
import View

main : Program () Model.Model Msg
main =
    Browser.element
    {
        init  = Model.initial
    ,   update = Update.update
    ,   view = View.view
    ,   subscriptions = subscriptions
    }
  --game View.view Update.update Model.initial
subscriptions : Model.Model -> Sub Msg
subscriptions model =
    Sub.batch
        [
        ]


