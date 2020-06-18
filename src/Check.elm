module Check exposing (..)


import Object exposing (..)
import Model exposing (..)
import Calculate exposing (..)
import Outlooks exposing (Brick(..))
import Message exposing (..)
import Html exposing (..)
import List.Extra exposing (interweave)
import Svg exposing (svg,rect,circle,line)


cHit: Float -> Float -> Bool -- 别人打你
cHit x y =
    if (x - 42) ^ 2 + (y - 30) ^ 2 <= 6 ^ 2 then True
    else False

cHitB: Float -> Float -> Float -> Float -> Bool   -- 打到旋转的
cHitB x y a b =
    if (x - a) ^ 2 + (y - b) ^ 2 <= 6 ^ 2 && (x - a) ^ 2 + (y - b) ^ 2 >= 4 ^ 2 then True
    else False

cValidB: Float -> Float -> Float -> Float -> Float -> Bool    -- 和hitB搭配
cValidB angle x y a b =
    if
    ( sin (degrees (angle + 180)) > 0 && cos (degrees (angle + 180 )) > 0
    && y - b > (-1 * tan (degrees (angle + 180))) * (x - a) && y - b < (-1 * tan (degrees (angle + 90 ))) * (x - a) )
    || (sin (degrees (angle + 180)) > 0 && cos (degrees (angle + 180 )) < 0
    && y - b < (-1 * tan (degrees (angle + 180))) * (x - a) && y - b < (-1 * tan (degrees (angle + 90 ))) * (x - a) )
    || (sin (degrees (angle + 180)) < 0 && cos (degrees (angle + 180 )) < 0
    && y - b < (-1 * tan (degrees (angle + 180))) * (x - a) && y - b > (-1 * tan (degrees (angle + 90 ))) * (x - a))
    || (sin (degrees (angle + 180)) < 0 && cos (degrees (angle + 180 )) > 0
    && y - b > (-1 * tan (degrees (angle + 180))) * (x - a) && y - b > (-1 * tan (degrees (angle + 90 ))) * (x - a))
    || (sin (degrees (angle + 180)) == 1 && cos (degrees (angle + 180)) < 0.000001 && y - b < 0 && x - a > 0)
    || (sin (degrees (angle + 180)) == -1 && cos (degrees (angle + 180)) < 0.000001 && y - b > 0 && x - a < 0)
    || (sin (degrees (angle + 180)) < 0.000001 && cos (degrees (angle + 180)) == 1 && y - b > 0 && x - a > 0)
    || (sin (degrees (angle + 180)) < 0.000001 && cos (degrees (angle + 180)) == -1 && y - b < 0 && x - a < 0)

    then True
    else False

cLeftPillar: Model -> Float -> Bool
cLeftPillar model t =
    if t <= 3
    then True
    else False

cRightPillar: Model -> Float -> Bool
cRightPillar model t =
    if t >= 81
    then True
    else False

cUpPillar: Model -> Float -> Bool
cUpPillar model t =
    if t <= 9
    then True
    else False

cDownPillar: Model -> Float -> Bool
cDownPillar model t =
    if t >= 51
    then True
    else False

cisCoordinate : Model -> (Int, Int)
cisCoordinate model =
    if cLeftLeaf model == True then ballLeftCoordinate model
    else if cDownLeaf model == True then ballDownCoordinate model
    else if cUpLeaf model == True then ballUpCoordinate model
    else if cRightLeaf model == True then ballRightCoordinate model
    else (0, 0)

cLeftLeaf : Model -> Bool   -- 这四个都是打到砖块
cLeftLeaf model =
    if (List.member (ballLeftCoordinate model) model.blueLeaves) && (List.member (ballLeftCoordinate model) model.emptyLeaves == False)
    then True
    else False

cRightLeaf : Model -> Bool
cRightLeaf model =
    if (List.member (ballRightCoordinate model) model.blueLeaves) && (List.member (ballRightCoordinate model) model.emptyLeaves == False)
    then True
    else False

cUpLeaf : Model -> Bool
cUpLeaf model =
    if (List.member (ballUpCoordinate model) model.blueLeaves) && (List.member (ballUpCoordinate model) model.emptyLeaves == False)
    then True
    else False

cDownLeaf : Model -> Bool
cDownLeaf model =
    if (List.member (ballDownCoordinate model) model.blueLeaves) && (List.member (ballDownCoordinate model) model.emptyLeaves == False)
    then True
    else False
