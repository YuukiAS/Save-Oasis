module Home exposing (..)

import Html.Attributes exposing (..)
import Html exposing (..)
import Html.Events exposing (onClick)
import Message exposing (Msg(..))
import Browser
import Object exposing (renderInterface)
import Outlooks exposing (..)
import Svg exposing (svg)
import Svg.Attributes exposing (viewBox)
import Model exposing (..)



view: List(Html Msg)
view =
  [ div [ style "backgroundColor" "#1d1d1d"]
                    [svg
                    [ viewBox "0 0 400 400" ][
                    renderInterface (Point 0 0) 100 65 viewbackground]]
  ,div [style "backgroundColor" "#1d1d1d"][
    img [][]
  , ul [][
    li [] [button [style "background" "#02020299"
                  , style "color" "#8acce7"
                  , style "cursor" "pointer"
                  , style "font-family" "Chalkduster"
                  , style "font-size" "40px"
                  , style "font-weight" "300"
                  , style "height" "90px"
                  , style "width" "350px"
                  , style "left" "580px"
                  , style "bottom" "450px"
                  , style "position" "absolute"
                  , style "border" "0"
                  ,onClick GoGame][text "Play"]]
  , li [] [button [style "background" "#02020299"
                  , style "color" "#8acce7"
                  , style "cursor" "pointer"
                  , style "font-family" "Chalkduster"
                  , style "font-size" "40px"
                  , style "font-weight" "300"
                  , style "height" "90px"
                  , style "width" "350px"
                  , style "left" "580px"
                  , style "bottom" "300px"
                  , style "position" "absolute"
                  , style "border" "0"
                  ,onClick GoHelp][text "Help"]]
  , embed [style "height" "50px", style "width" "100px", src "assets/musics/The Oasis.mp3",loop True][]

  ]

  ]
  ]

