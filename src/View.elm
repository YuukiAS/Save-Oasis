module View exposing (..)

import Object exposing (..)
import Model exposing (..)
import Message exposing (..)
import Outlooks exposing (..)
import Html exposing (..)
import Html.Attributes exposing (style,src,controls,loop,autoplay,start)
import List.Extra exposing (interweave,intercalate)
import Svg exposing (svg)
import Svg.Attributes exposing (viewBox)
import Html exposing (Html, button, div, text)
import Html.Events exposing (on, onClick, onMouseDown, onMouseUp)
import Json.Decode as Json
import Model exposing (Model)
import Svg.Attributes as SvgAttrs
import Dashboard exposing (..)

view: Model -> Html Msg
view model =

    div
        [ style "backgroundColor" "#1d1d1d"
        ]
        [
            svg
            [ viewBox "0 0 400 400" ]
            (interweave  --? List.append会导致无法加载brick,但interweave可以
            (List.append (List.append(List.append renderSettings (renderStatus model)) (renderRowBrick model (Point 10 8) 6.5 2.5 4 11)) (renderSkills model))
            [
                (renderBackground (Point 0 0) 100 65 outBkg),
                (renderBackground (Point 9 8) 82 37 outInterface),
                (renderBall (Point model.ball_x model.ball_y) 2 2 outBall),
                (renderPaddle (Point model.pad_x 40) 12 1 outPaddle),
                (renderDashboard (Point 40 0.5) 50 6)
            ])

         , div [][renderGameButton model]
         , div [style "top" "700px" , style "left" "1000px", style "position" "absolute"][audio [src "src/assets/musics/Return of Ancients.mp3",controls True][]]
        ]





renderGameButton : Model -> Html Msg
renderGameButton model =
    let
        ( txt, msg ) =
            case model.state of    --todo 这里命名有点混乱,我都改成开始/重开时需要按两次了(也就是初始为pause),应该可以把两个合并一下?
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
                  , style "height" "600x"
                  , style "left" "330px"
                  , style "line-height" "60px"
                  , style "outline" "none"
                  , style "padding" "0"
                  , style "position" "absolute"
                  , style "width" "600px"
        , onClick msg
        ]
        [ text txt ]