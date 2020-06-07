module View exposing (..)

import Object exposing (..)
import Model exposing (..)
import Message exposing (..)
import Html exposing (..)
import List.Extra exposing (interweave)
import Svg exposing (svg)
import Svg.Attributes exposing (..)

view: Model -> Html Msg
view model =
    div
        [
        ]
        [
            svg
            [
                viewBox "0 0 400 400"

            ]
            (interweave     --* 用于合并两个list(++不能对Html Msg使用)
            [
                 --* type alias 的构造为函数!
                renderBall (Point model.ball_x model.ball_y)
            ,   renderPillar (Point 10 8) (Point 90 8)
            ,   renderPillar (Point 10 45) (Point 90 45)
            ,   renderPillar (Point 10 8) (Point 10 45)
            ,   renderPillar (Point 90 8) (Point 90 45)
            ,   renderPaddle (Point model.pad_x 40) 12 1
            ] (renderRowBrick model (Point 10 8) 6.5 2.5 4 11))   --* List可直接++
        ]