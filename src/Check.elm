module Check exposing (..)


import Object exposing (..)
import Model exposing (..)
import Calculate exposing (..)
import Message exposing (..)
import Html exposing (..)
import List.Extra exposing (interweave)
import Svg exposing (svg,rect,circle,line)
import Svg.Attributes exposing (..)
import Array exposing (..)


r = 1 --temporary

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


cGameOver: Model -> Bool
cGameOver model =
    if ( model.ball_x + r <= 90 && model.ball_x - r >= 10 ) && model.ball_y + r >= 45
    then True
    else False


