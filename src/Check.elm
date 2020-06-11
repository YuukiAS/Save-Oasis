module Check exposing (..)


import Object exposing (..)
import Model exposing (..)
import Calculate exposing (..)
import Outlooks exposing (Brick(..))
import Message exposing (..)
import Html exposing (..)
import List.Extra exposing (interweave)
import Svg exposing (svg,rect,circle,line)

-- *判断碰到了什么

cUpBricks: Model -> Bool
cUpBricks model =
    if (
        ( model.ball_y - r - 10.5)/2.675 < toFloat (round ((model.ball_y - r - 10.5)/2.675)) &&
        ( model.ball_y - r > 8 && model.ball_y - r < 21.2) &&
        ( List.member (upCoordinate model) model.emptyBricks == False)
       )
    then True
    else False


cUpPillar: Model -> Bool
cUpPillar model =
    if ( model.ball_x + r <= 90 && model.ball_x - r >= 10 ) && model.ball_y - r <= 8
    then True
    else False

----left
cLeftBricks: Model -> Bool
cLeftBricks model =
    if ( --✨bricks
           ( model.ball_x - r - 16.5 )/6.675 < toFloat (round ((model.ball_x - r - 16.5)/6.675))  &&
           ( model.ball_y - r > 8 && model.ball_y < 21.2) &&
           ( List.member (leftCoordinate model) model.emptyBricks == False)
       )
    then True
    else False

cLeftPillar: Model -> Bool
cLeftPillar model =
    if   model.ball_y + r < 45 && model.ball_y - r > 8 && model.ball_x - r <= 10
    then True
    else False

--right
cRightBricks: Model -> Bool
cRightBricks model =
    if (
           (model.ball_x + r - 10)/6.675 <= 11 && (model.ball_x + r - 10)/6.675 >= 0 &&
           (model.ball_x + r - 10)/6.675 > toFloat (round ((model.ball_x + r - 10)/6.675))  &&
           ( model.ball_y - r > 8 && model.ball_y < 21.2) &&
           ( List.member (rightCoordinate model) model.emptyBricks == False)
       )
    then True
    else False

cRightPillar: Model -> Bool
cRightPillar model =
    if   model.ball_y + r < 45 && model.ball_y - r > 8 && model.ball_x + r >= 90
    then True
    else False



cDownPaddle: Model -> Bool
cDownPaddle model =
    --✨paddle
    if (( model.ball_x >= model.pad_x && model.ball_x <= model.pad_x + 12 ) && model.ball_y + r > 40 && model.ball_y + r <= 40.5)
    then True
    else False



{-cNextBrick: Model -> (Int, Int)-> Outlooks.Brick ->  Bool
cNextBrick model a color =
    case color of
        Blue -> if List.member a model.blueBricks == True then True else False
        Cyan -> if List.member a model.cyanBricks == True then True else False
        Red -> if List.member a model.redBricks == True then True else False
        Pink ->  if List.member a model.pinkBricks == True then True else False-}




cGameOver: Model -> Bool  -- 判断是否失去生命值
cGameOver model =
    if ( model.ball_x + r <= 90 && model.ball_x - r >= 10 ) && model.ball_y + r >= 45
    then True
    else False

cWin: Model -> Bool    -- 判断是否胜利
cWin model =
    if ( List.member (0, 0) model.emptyBricks &&
    List.member (0, 1) model.emptyBricks &&
    List.member (0, 2) model.emptyBricks &&
    List.member (0, 3) model.emptyBricks &&
    List.member (0, 4) model.emptyBricks &&
    List.member (0, 5) model.emptyBricks &&
    List.member (0, 6) model.emptyBricks &&
    List.member (0, 7) model.emptyBricks &&
    List.member (0, 8) model.emptyBricks &&
    List.member (0, 9) model.emptyBricks &&
    List.member (0, 10) model.emptyBricks &&
    List.member (0, 11) model.emptyBricks &&
    List.member (1, 0) model.emptyBricks &&
    List.member (1, 1) model.emptyBricks &&
    List.member (1, 2) model.emptyBricks &&
    List.member (1, 3) model.emptyBricks &&
    List.member (1, 4) model.emptyBricks &&
    List.member (1, 5) model.emptyBricks &&
    List.member (1, 6) model.emptyBricks &&
    List.member (1, 7) model.emptyBricks &&
    List.member (1, 8) model.emptyBricks &&
    List.member (1, 9) model.emptyBricks &&
    List.member (1, 10) model.emptyBricks &&
    List.member (1, 11) model.emptyBricks &&
    List.member (2, 0) model.emptyBricks &&
    List.member (2, 0) model.emptyBricks &&
    List.member (2, 1) model.emptyBricks &&
    List.member (2, 2) model.emptyBricks &&
    List.member (2, 3) model.emptyBricks &&
    List.member (2, 4) model.emptyBricks &&
    List.member (2, 5) model.emptyBricks &&
    List.member (2, 6) model.emptyBricks &&
    List.member (2, 7) model.emptyBricks &&
    List.member (2, 8) model.emptyBricks &&
    List.member (2, 9) model.emptyBricks &&
    List.member (2, 10) model.emptyBricks &&
    List.member (2, 11) model.emptyBricks &&
    List.member (3, 0) model.emptyBricks &&
    List.member (3, 1) model.emptyBricks &&
    List.member (3, 2) model.emptyBricks &&
    List.member (3, 3) model.emptyBricks &&
    List.member (3, 4) model.emptyBricks &&
    List.member (3, 5) model.emptyBricks &&
    List.member (3, 6) model.emptyBricks &&
    List.member (3, 7) model.emptyBricks &&
    List.member (3, 8) model.emptyBricks &&
    List.member (3, 9) model.emptyBricks &&
    List.member (3, 10) model.emptyBricks &&
    List.member (3, 11) model.emptyBricks &&
    List.member (4, 0) model.emptyBricks &&
    List.member (4, 1) model.emptyBricks &&
    List.member (4, 2) model.emptyBricks &&
    List.member (4, 3) model.emptyBricks &&
    List.member (4, 4) model.emptyBricks &&
    List.member (4, 5) model.emptyBricks &&
    List.member (4, 6) model.emptyBricks &&
    List.member (4, 7) model.emptyBricks &&
    List.member (4, 8) model.emptyBricks &&
    List.member (4, 9) model.emptyBricks &&
    List.member (4, 10) model.emptyBricks &&
    List.member (4, 11) model.emptyBricks
    )
    then True
    else False
