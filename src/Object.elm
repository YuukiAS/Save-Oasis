module Object exposing (..)

import Svg exposing (image)
import Svg.Attributes exposing (..)
import Html exposing (..)
import Model exposing (..)
import Message exposing (..)
import Outlooks exposing (..)
import List.Extra exposing (interweave)




renderBackground: Point -> Float -> Float -> String -> Html msg
renderBackground point wid hei pic =
    image [xlinkHref pic, x ((String.fromFloat point.x)++"%"), y ((String.fromFloat point.y)++"%"), width ((String.fromFloat wid)++"%"), height ((String.fromFloat hei)++"%")][]


renderBall: Point -> Float -> Float -> String -> Html msg
renderBall point side1 side2 pic =
    image [xlinkHref pic, x ((String.fromFloat ( point.x - 1 ))++"%"), y ((String.fromFloat ( point.y - 1 ))++"%"), width ((String.fromFloat side1)++"%"), height ((String.fromFloat side2)++"%")][]

r = 1

renderPaddle: Point -> Float -> Float -> String -> Html Msg
renderPaddle point wid hei pic=
    image [xlinkHref pic, x ((String.fromFloat point.x)++"%"), y ((String.fromFloat point.y)++"%"), width ((String.fromFloat wid)++"%"), height ((String.fromFloat hei)++"%")][]



renderBlueBrick : Int -> Int -> Point -> Float -> Float -> Html Msg
renderBlueBrick num1 num2 point wid hei =
    let
        a = point.x + ( wid + 0.175 ) * ( toFloat num1 )
        b = point.y + ( hei + 0.175 ) * ( toFloat num2 )
    in       --* xlinkHref 调用图片
        image [xlinkHref outOriginal, x ((String.fromFloat a)++"%"), y ((String.fromFloat b)++"%"), width ((String.fromFloat wid)++"%"), height ((String.fromFloat hei)++"%")][]

renderCyanBrick : Int -> Int -> Point -> Float -> Float -> Html Msg
renderCyanBrick num1 num2 point wid hei =
    let
        a = point.x + ( wid + 0.175 ) * ( toFloat num1 )
        b = point.y + ( hei + 0.175 ) * ( toFloat num2 )
    in
        image [xlinkHref outHit, x ((String.fromFloat a)++"%"), y ((String.fromFloat b)++"%"), width ((String.fromFloat wid)++"%"), height ((String.fromFloat hei)++"%")][]


renderPinkBrick : Int -> Int -> Point -> Float -> Float -> Html Msg   -- 加速度加命
renderPinkBrick num1 num2 point wid hei =
    let
        a = point.x + ( wid + 0.175 ) * ( toFloat num1 )
        b = point.y + ( hei + 0.175 ) * ( toFloat num2 )
    in
        image [xlinkHref outIncrease, x ((String.fromFloat a)++"%"), y ((String.fromFloat b)++"%"), width ((String.fromFloat wid)++"%"), height ((String.fromFloat hei)++"%")][]

renderRedBrick : Int -> Int -> Point -> Float -> Float -> Html Msg  -- 减速度减命
renderRedBrick num1 num2 point wid hei =
    let
        a = point.x + ( wid + 0.175 ) * ( toFloat num1 )
        b = point.y + ( hei + 0.175 ) * ( toFloat num2 )
    in
        image [xlinkHref outDecrease, x ((String.fromFloat a)++"%"), y ((String.fromFloat b)++"%"), width ((String.fromFloat wid)++"%"), height ((String.fromFloat hei)++"%")][]


renderABrick : Model -> (Int, Int) -> Point -> Float -> Float -> List (Html Msg) --* 生成单个方块
renderABrick model a point wid hei =  --a = (Int, Int) from cyanBricks

    if ((List.member a model.cyanBricks == True) && (List.member a model.emptyBricks == False) )
    then [renderCyanBrick (Tuple.second a) (Tuple.first a) point wid hei]   -- 第一项为y,第二项为x
    else if ((List.member a model.pinkBricks == True) && (List.member a model.emptyBricks == False))
    then [renderPinkBrick (Tuple.second a) (Tuple.first a) point wid hei]
    else if ((List.member a model.redBricks == True) && (List.member a model.emptyBricks == False))
    then [renderRedBrick (Tuple.second a) (Tuple.first a) point wid hei]
    else if ( (List.member a model.cyanBricks == False) && (List.member a model.pinkBricks == False) && (List.member a model.redBricks == False) && (List.member a model.emptyBricks == False) )  --* 放在最后
    then [renderBlueBrick (Tuple.second a) (Tuple.first a) point wid hei]
    else [div [] []]

renderColumnBrick : Model -> Point -> Float -> Float -> Int -> Int -> List (Html Msg)   -- 得到n行Grid
renderColumnBrick model point wid hei num1 num2   = --num1 = 4, num2 = 11
    if num1 >= 0 then    --* interweave 使得参数不用改变!!!
            interweave ( renderABrick model (num1, num2) point wid hei ) ( renderColumnBrick model point wid hei (num1 - 1) num2 )
    else
        []

renderRowBrick : Model -> Point -> Float -> Float -> Int -> Int -> List (Html Msg)   -- 先调用这个,沿水平方向
renderRowBrick model point wid hei num1 num2 =
    if num2 >= 0 then
            interweave ( renderColumnBrick model point wid hei num1 num2 )( renderRowBrick model point wid hei num1 (num2 - 1) )
    else
        []




