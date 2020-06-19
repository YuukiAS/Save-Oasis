module Object exposing (..)

import Svg exposing (image)
import Svg.Attributes exposing (..)
import Html exposing (..)
import Model exposing (..)
import Message exposing (..)
import Outlooks exposing (..)
import List.Extra exposing (interweave)

renderInterface: Point -> Float -> Float -> String -> Html msg
renderInterface point wid hei pic =
    image [xlinkHref pic, x ((String.fromFloat point.x)++"%"), y ((String.fromFloat point.y)++"%"), width ((String.fromFloat wid)++"%"), height ((String.fromFloat hei)++"%")][]

renderBall: Point -> Float -> Float -> String -> Html msg
renderBall point side1 side2 pic =
    image [xlinkHref pic, x ((String.fromFloat ( point.x - r ))++"%"), y ((String.fromFloat ( point.y - r ))++"%"), width ((String.fromFloat side1)++"%"), height ((String.fromFloat side2)++"%")][]

r = 1

rotateCircle: Point -> Float -> Float -> String -> Float -> Html msg
rotateCircle point wid hei pic angle =
    image [xlinkHref pic, x ((String.fromFloat point.x)++"%"), y ((String.fromFloat point.y)++"%"), width ((String.fromFloat wid)++"%"), height ((String.fromFloat hei)++"%"), transform ("rotate(" ++ (String.fromFloat (-1 * angle)) ++ "," ++ String.fromFloat (4 * (point.x + 5)) ++ "," ++ String.fromFloat (4 * (point.y + 5)) ++")")][]

renderRandGem: Point -> Float -> Float -> String -> Html msg
renderRandGem point wid hei pic =
    image [xlinkHref pic, x (String.fromFloat point.x ++"%"), y (String.fromFloat point.y ++"%"), width ((String.fromFloat wid)++"%"), height ((String.fromFloat hei)++"%")][]

renderSomeBrick : Int -> Int -> Point -> Float -> Float -> String -> Html Msg  --* 修改pic改变方块
renderSomeBrick num1 num2 point wid hei pic =
    let
        a = point.x + wid * ( toFloat num1 )
        b = point.y + hei * ( toFloat num2 )
    in       --* xlinkHref 调用图片
        image [xlinkHref pic, x ((String.fromFloat a)++"%"), y ((String.fromFloat b)++"%"), width ((String.fromFloat wid)++"%"), height ((String.fromFloat hei)++"%")][]


renderABrick : (Int, Int) -> Model -> Point -> Float -> Float -> List (Html Msg) --* 决定方块颜色
renderABrick a model point wid hei =
    if ((List.member a model.cyanLeaves == True) && (List.member a model.emptyLeaves == False) )
    then [renderSomeBrick (Tuple.second a) (Tuple.first a) point wid hei nor_leaf_2]   -- cyan
    else if ((List.member a model.pinkLeaves == True) && (List.member a model.emptyLeaves == False))
    then [renderSomeBrick (Tuple.second a) (Tuple.first a) point wid hei inc_leaf]
    else if ((List.member a model.redLeaves == True) && (List.member a model.emptyLeaves == False))
    then [renderSomeBrick (Tuple.second a) (Tuple.first a) point wid hei dec_leaf]
    else if ( (List.member a model.cyanLeaves == False) && (List.member a model.pinkLeaves == False) && (List.member a model.redLeaves == False) && (List.member a model.emptyLeaves == False) && (List.member a model.blueLeaves == True))
    then [renderSomeBrick (Tuple.second a) (Tuple.first a) point wid hei nor_leaf]  -- blue
    else [div [] []]


renderColumnBrick : Point -> Model -> Float -> Float -> Int -> Int -> List (Html Msg)   -- 得到n行Grid
renderColumnBrick point model wid hei num1 num2   = --num1 = 4, num2 = 11
    if num1 >= 0 then    --* interweave 使得参数不用改变!!!
            interweave ( renderABrick (num1, num2) model point wid hei ) ( renderColumnBrick point model wid hei (num1 - 1) num2 )
    else
        []

renderRowBrick : Point -> Model -> Float -> Float -> Int -> Int -> List (Html Msg)   -- 先调用这个,沿水平方向
renderRowBrick point model wid hei num1 num2 =
    if num2 >= 0 then
            interweave ( renderColumnBrick point model wid hei num1 num2 )( renderRowBrick point model wid hei num1 (num2 - 1) )
    else
        []

renderBooklet: Point -> Float -> Float -> String -> Html msg
renderBooklet point wid hei pic =
    image [xlinkHref pic, x ((String.fromFloat point.x)++"%"), y ((String.fromFloat point.y)++"%"), width ((String.fromFloat wid)++"%"), height ((String.fromFloat hei)++"%")][]


{-

renderBlueBrick : Int -> Int -> Point -> Float -> Float -> Html Msg
renderBlueBrick num1 num2 point wid hei =
    let
        a = point.x + ( wid + 0.175 ) * ( toFloat num1 )   --* 这里修改位置!!
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
        []-}




