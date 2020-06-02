module View exposing (..)

import Object exposing (..)
import Model exposing (..)
import Message exposing (..)
import Html exposing (..)
import List.Extra exposing (interweave)
import Svg exposing (svg,rect,circle,line)
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
            renderBall (Point 50 37.5)
        ,   renderPillar (Point 10 8) (Point 90 8)
        ,   renderPillar (Point 10 45) (Point 90 45)
        ,   renderPillar (Point 10 8) (Point 10 45)
        ,   renderPillar (Point 90 8) (Point 90 45)
        --,   renderPaddle (Point 44 40) 12 1
        ,   renderPaddle (Point model.pad_x 40) 12 1
        ] (renderTotalGrid (Point 10 8) 6.5 2.5 5))   --* List可直接++
    ]