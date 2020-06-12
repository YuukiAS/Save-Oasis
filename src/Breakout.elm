module Breakout exposing (main)

import Html exposing (..)
import Message exposing (..)
import Browser
import Browser.Events
import Json.Decode as D
import Task
----------------------- From src
import Update
import Model
import View
import Browser
import Browser.Dom exposing (getViewport)
import Browser.Events exposing (onAnimationFrameDelta, onKeyDown, onKeyUp, onResize)
import Json.Decode as Decode
import Model exposing (Model)
import Update
import View
import Time

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
    Sub.batch  --todo 允许A和D移动踏板;允许数字键选技能
        [  if model.state == Model.Playing then
          Browser.Events.onAnimationFrameDelta TimeDelta
          else Sub.none
          ,if model.state == Model.Playing then  Time.every 1000 Tick
          else Sub.none
          ,   Browser.Events.onKeyUp (D.map (KeyChanged False) (D.field "key" D.string))  -- 读取输入
          ,   Browser.Events.onKeyDown  (D.map (KeyChanged True) (D.field "key" D.string))
        ]


