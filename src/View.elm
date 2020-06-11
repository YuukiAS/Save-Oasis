module View exposing (..)

import Object exposing (..)
import Model exposing (..)
import Message exposing (..)
import Outlooks exposing (..)
import Time exposing (utc,toHour,toMinute,toSecond)
import Html exposing (..)
import Html.Attributes exposing (style)
import List.Extra exposing (interweave)
import Svg exposing (svg)
import Svg.Attributes exposing (viewBox)
import Html exposing (Html, button, div, text)
import Html.Attributes exposing (style)
import Html.Events exposing (on, onClick, onMouseDown, onMouseUp)
import Json.Decode as Json
import Model exposing (Model)
import Svg
import Svg.Attributes as SvgAttrs


view: Model -> Html Msg
view model =

    div
        [ style "backgroundColor" "#1d1d1d"
        ]
        [ svg
            [ viewBox "0 0 400 400" ]
            (interweave     --* 用于合并两个list(++不能对Html Msg使用)
            [
                renderBackground (Point 0 0) 100 65 outBkg
            ,   renderBackground (Point 9 8) 82 37 outInterface
            ,   renderBall (Point model.ball_x model.ball_y) 2 2 outBall
            ,   renderPaddle (Point model.pad_x 40) 12 1 outPaddle
            ]
            (renderRowBrick model (Point 10 8) 6.5 2.5 4 11) -- 5行*12个
             )
         , div [][renderGameButton model]
         , div [][renderTime model]
         , div [][]
        ]


renderTime : Model -> Html Msg
renderTime model =
        let
            minute1 = toMinute utc model.now
            second1 = toSecond utc model.now
            minute2 = toMinute utc model.start
            second2 =  toSecond utc model.start
            out_minute = String.fromInt (minute1 - minute2)
            out_second = String.fromInt (second1 - second2)
        in
            h1 [ style "background" "#f8f4f4"
              , style "border" "0"
              , style "bottom" "30px"
              , style "color" "#0ca101"
              , style "cursor" "pointer"
              , style "display" "block"
              , style "font-family" "Helvetica, Arial, sans-serif"
              , style "font-size" "18px"
              , style "font-weight" "300"
              , style "height" "400x"
              , style "left" "130px"
              , style "line-height" "60px"
              , style "outline" "none"
              , style "padding" "0"
              , style "position" "absolute"
              , style "width" "200px"]
              [ text ("Time Played" ++ ":" ++ out_minute ++ ":" ++ out_second) ]


renderGameButton : Model -> Html Msg
renderGameButton model =
    let
        ( txt, msg ) =
            case model.state of
                Model.Stopped ->
                    ( "New game", Pause )

                Model.Playing ->
                    ( "Enjoy the game! You now have "++ Debug.toString model.life ++ " lives.", Keep )

                Model.Paused ->
                    if model.life > 1 then
                    ( "Continue, you still have " ++ Debug.toString model.life ++ " lives.", Start )
                    else if model.life == 1 then
                    ( "Continue, you still have " ++ Debug.toString model.life ++ " lives.", Start )
                    else ("Game Over. Click here to restart.", Resume)
    in
    button
        [ style "background" "#f8f4f4"
                  , style "border" "0"
                  , style "bottom" "30px"
                  , style "color" "#0ca101"
                  , style "cursor" "pointer"
                  , style "display" "block"
                  , style "font-family" "Helvetica, Arial, sans-serif"
                  , style "font-size" "18px"
                  , style "font-weight" "300"
                  , style "height" "600x"
                  , style "left" "230px"
                  , style "line-height" "60px"
                  , style "outline" "none"
                  , style "padding" "0"
                  , style "position" "absolute"
                  , style "width" "600px"
        , onClick msg
        ]
        [ text txt ]