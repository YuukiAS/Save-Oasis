module Breakout exposing (main)
----------------------- From Internet
import Html exposing (..)
import Message exposing (..)
import Playground exposing (..)
import Browser
import Browser.Events
import Json.Decode as D
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
subscriptions : Model.Model -> Sub Msg
subscriptions model =
    Sub.batch
        [
            Browser.Events.onKeyUp (D.map (KeyChanged False) (D.field "key" D.string))  -- 读取输入
        ,   Browser.Events.onKeyDown  (D.map (KeyChanged True) (D.field "key" D.string))
        ,   Browser.Events.onAnimationFrameDelta TimeDelta
        ]


