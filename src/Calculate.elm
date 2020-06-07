module Calculate exposing (..)


import Model exposing (Model,Keys)
import Message exposing (..)
import Playground exposing (..)


r = 1

upCoordinate: Model -> (Int, Int)
upCoordinate model = ( floor((model.ball_y - r - 8)/2.675), floor((model.ball_x - 10)/6.675) )

leftCoordinate: Model -> (Int, Int)
leftCoordinate model = (floor ((model.ball_y - 8) / 2.675), floor((model.ball_x - r - 8)/6.675))

rightCoordinate: Model -> (Int, Int)
rightCoordinate model = (floor ((model.ball_y - 8) / 2.675), floor((model.ball_x + r - 8)/6.675))

