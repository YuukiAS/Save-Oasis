module View exposing (..)

import Object exposing (..)
import Model exposing (..)
import Message exposing (..)
import Outlooks exposing (..)
import Html exposing (..)
import Html.Attributes exposing (style,src,controls,loop,autoplay,start,hidden,loop)
import List.Extra exposing (interweave,intercalate)
import Svg exposing (svg)
import Svg.Attributes exposing (viewBox)
import Html exposing (Html, button, div, text)
import Html.Events exposing (on, onClick, onMouseDown, onMouseUp)
import Model exposing (Model)
import Svg.Attributes as SvgAttrs
import Dashboard exposing (..)
import Check exposing (..)

view: Model -> List (Html Msg)
view model =

            [
                div [ style "backgroundColor" "#1d1d1d"]
                [svg
                [ viewBox "0 0 400 400" ]
                (interweave (renderDashboard model) (interweave (renderRowBrick (Point 2 8) model 4 4 10 19)
                [
                        renderInterface (Point 0 0) 100 65 background
                    ,   renderInterface (Point 2 0) 80 60 interface
                     ,  if model.life >= 5 then
                        renderInterface (Point 38 26) 8 8 vKernel5
                        else if model.life == 4 then
                        renderInterface (Point 38 26) 8 8 vKernel4
                        else if model.life == 3 then
                        renderInterface (Point 38 26) 8 8 vKernel3
                        else if model.life == 2 then
                        renderInterface (Point 38 26) 8 8 vKernel2
                        else if model.life == 1 then
                        renderInterface (Point 38 26) 8 8 vKernel1
                        else renderInterface (Point 38 26) 8 8 vKernel0
                    ,   rotateCircle (Point model.pad_x model.pad_y) 10 10 pad model.pad_angle
                    ,   rotateCircle (Point model.gold_x model.gold_y) 10 10 gold model.gold_angle
                    ,   renderBall (Point model.ball_x model.ball_y) 2 2 ball
                    ,   rotateCircle (Point 5 25) 10 10 circular model.wShell_left
                    ,   rotateCircle (Point 69 25) 10 10 circular model.wShell_right
                    ,   rotateCircle (Point 37 9) 10 10 circular model.wShell_up
                    ,   rotateCircle (Point 37 41) 10 10 circular model.wShell_down
                    , if model.clover.upClover == False then
                        rotateCircle (Point 37 9) 10 10 vkf 0
                        else svg[][]
                    , if model.clover.leftClover == False then
                        rotateCircle (Point 5 25) 10 10 vkf 120
                        else svg[][]
                    , if model.clover.rightClover == False then
                        rotateCircle (Point 69 25) 10 10 vkf 240
                        else svg[][]
                    ,   if  (cValidB model.wShell_down model.ball_x model.ball_y 42 46) == True &&  model.life < 5
                    then rotateCircle (Point 37 41) 10 10 brighter 0
                    else rotateCircle (Point 37 41) 10 10 bright 0
                    ,   renderRandGem (Point (model.block_x) (model.block_y)) 2 2 attacker
                    ,   renderInterface (Point 2 8) 10 10 upleft
                    ,   renderInterface (Point 2 42) 10 10 downleft
                    ,   renderInterface (Point 72 8) 10 10 upright
                    ,   renderInterface (Point 72 42) 10 10 downright
                ]
                ))
                ]
              , div [][renderMusic model]
              , div [][renderSE model]
            ]

renderDashboard: Model -> List(Html Msg)   --* 包括整个dashboard
renderDashboard model =
    (interweave
        (List.append(List.append renderSettings (renderStatus model)) (renderSkills model))
        [renderPanel (Point 40 0.5) 50 6]
    )

{-renderGameButton : Model -> Html Msg
renderGameButton model =
    let
        ( txt, msg ) =
            case model.state of
                Model.Stopped ->
                    ( "New game", Pause ) -- 刚开始是Pause

                Model.Playing ->
                    ( "Enjoy the game! You now have "++ Debug.toString model.life ++ " lives.", Keep )

                Model.Paused ->
                    if model.life > 1 then
                    ( "Continue, you still have " ++ Debug.toString model.life ++ " lives.", Start )
                    else if model.life == 1 then
                    ( "Continue, you still have " ++ Debug.toString model.life ++ " life.", Start )
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
                  , style "height" "60px"
                  , style "left" "460px"
                  , style "line-height" "60px"
                  , style "outline" "none"
                  , style "padding" "0"
                  , style "top" "700px"
                  , style "position" "absolute"
                  , style "width" "600px"
        , onClick msg
        ]
        [ text txt ]-}

renderSE : Model -> Html Msg
renderSE model =
    let
        music =
            case model.se of
                Quite -> ""
                Fire -> "assets/musics/SE/Fire.mp3"
                Frozen -> "assets/musics/SE/Frozen.mp3"
                Ordinary -> "assets/musics/SE/Ordinary.mp3"
    in
        audio [style "height" "50px", style "width" "100px", src music,autoplay True,loop True][]

renderMusic : Model -> Html Msg
renderMusic model =
      let
            music =
                case model.music of
                    Null -> ""
                    ReturnOfAncients -> "assets/musics/Return of Ancients.mp3"
                    TheOasis -> "assets/musics/The Oasis.mp3"
                    TheChordOfSpring -> "assets/musics/The Chord of Spring.mp3"
                    InSearchOfLife ->"assets/musics/In Search of Life.mp3"
      in
         embed [style "height" "50px", style "width" "100px", src music,loop True][]