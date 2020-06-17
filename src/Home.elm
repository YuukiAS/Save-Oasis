module Home exposing (..)
import Html.Attributes exposing (..)
import Html exposing (..)
import Html.Events exposing (onClick)
import Message exposing (Msg(..))
import Browser

view: List(Html Msg)
view =
  [ text "Welcome to game \"Save Oasis\"! "
  , ul []
      [
        li [] [button [onClick GoHome][text "Play"]]
      --, li [] [ a [ href "help.html" ] [ text "Help" ] ]
      , li[] [button [onClick GoHelp][text "Help"]]
      , li [] [ a [ href "https://github.com/YuukiAS/VG100_Project1" ] [ text "Want to have a look on the source code?" ] ]
      ]
  ]