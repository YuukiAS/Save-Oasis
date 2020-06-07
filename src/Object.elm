module Object exposing (..)

import Svg exposing (svg,rect,circle,line)
import Svg.Attributes exposing (..)
import Html exposing (..)
import Model exposing (..)
import Message exposing (..)
import Color exposing (..)
import List.Extra exposing (interweave)



--* 多加一个方括号即从Svg msg变为Html msg
renderPillar: Point->Point->Html Msg
renderPillar pointA pointB =
     line [x1 ((String.fromFloat pointA.x)++"%"), y1 ((String.fromFloat pointA.y)++"%"), x2 ((String.fromFloat pointB.x)++"%"),y2((String.fromFloat pointB.y)++"%"), stroke cus_purple,strokeWidth "0.1%"][]

renderBall: Point->Html Msg
renderBall point =
   circle [ cx ((String.fromFloat point.x)++"%"), cy ((String.fromFloat point.y)++"%"), r "1%", fill cus_yellow ] []   -- c is the center point

renderPaddle: Point->Float->Float->Html Msg
renderPaddle point wid hei=
    rect [x ((String.fromFloat point.x)++"%"), y ((String.fromFloat point.y)++"%"), width ((String.fromFloat wid)++"%"), height ((String.fromFloat hei)++"%"), fill cus_orange][]


    --Tuple.second & Tuple.First
    --cyanBricks = [(1,0), (2,0), (3,6), (4,2), (0,8)]

renderRowBrick : Model -> Point -> Float -> Float -> Int -> Int -> List (Html Msg)
renderRowBrick model point wid hei num1 num2 =
    if num2 >= 0 then
            interweave ( renderColumnBrick model point wid hei num1 num2 )( renderRowBrick model point wid hei num1 (num2 - 1) )
    else
        []

renderColumnBrick : Model -> Point -> Float -> Float -> Int -> Int -> List (Html Msg)   -- 得到n行Grid
renderColumnBrick model point wid hei num1 num2   = --num1 = 4, num2 = 11

    if num1 >= 0 then
            interweave ( renderABrick model (num1, num2) point wid hei ) ( renderColumnBrick model point wid hei (num1 - 1) num2 )
    else
        []



renderABrick : Model -> (Int, Int) -> Point -> Float -> Float -> List (Html Msg) --put into the context where the brick exists
renderABrick model a point wid hei =  --a = (Int, Int) from cyanBricks
    if (List.member a model.cyanBricks && (List.member a model.emptyBricks == False) )
    then [renderCyanBrick (Tuple.second a) (Tuple.first a) point wid hei]
    else if ( (List.member a model.cyanBricks == False) && (List.member a model.emptyBricks == False) )
    then [renderBlueBrick (Tuple.second a) (Tuple.first a) point wid hei]
    else [div [] []]

renderCyanBrick : Int -> Int -> Point -> Float -> Float -> Html Msg
renderCyanBrick num1 num2 point wid hei =
    let
        a = point.x + ( wid + 0.175 ) * ( toFloat num1 )
        b = point.y + ( hei + 0.175 ) * ( toFloat num2 )
        c = cus_cyan
    in
        rect [x ((String.fromFloat a)++"%"), y ((String.fromFloat b)++"%"), width ((String.fromFloat wid)++"%"), height ((String.fromFloat hei)++"%"), fill c][]

renderBlueBrick : Int -> Int -> Point -> Float -> Float -> Html Msg
renderBlueBrick num1 num2 point wid hei =
    let
        a = point.x + ( wid + 0.175 ) * ( toFloat num1 )
        b = point.y + ( hei + 0.175 ) * ( toFloat num2 )
        c = cus_blue
    in
        rect [x ((String.fromFloat a)++"%"), y ((String.fromFloat b)++"%"), width ((String.fromFloat wid)++"%"), height ((String.fromFloat hei)++"%"), fill c][]





