module Main exposing (..)
import Browser
import Help
import Home
import Message exposing (..)
import Outlooks exposing (Music(..),Difficulty(..))
import Model exposing (Model,Page(..))
import Browser.Events exposing (onAnimationFrameDelta, onKeyDown, onKeyUp, onResize)
import Json.Decode as D
import Update
import Time
import View


main : Program () Model Msg
main =
  Browser.application
    { init = Model.initial
    , view = view
    , update = Update.update
    , subscriptions = subscriptions
    , onUrlChange = UrlChanged
    , onUrlRequest = LinkClicked
    }

-- SUBSCRIPTIONS
subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [  if model.state == Model.Playing then
          Browser.Events.onAnimationFrameDelta TimeDelta
          else Sub.none
          ,if model.state == Model.Playing then  Time.every 1000 Tick
          else Sub.none
          ,   Browser.Events.onKeyUp (D.map (KeyChanged False) (D.field "key" D.string))  -- 读取输入
          ,   Browser.Events.onKeyDown  (D.map (KeyChanged True) (D.field "key" D.string))
        ]


view : Model -> Browser.Document Msg
view model =
    let
        body =
            case model.page of
                Home -> Home.view
                Help -> Help.view model
                Game -> View.view model

        title =
            case model.page of
                Home -> "Save Oasis-Home"
                Help -> "Save Oasis-Settings"
                Game -> "Save the oasis!"
    in
        {
            title = title          --* 这样改变标题
          , body =  body
        }



