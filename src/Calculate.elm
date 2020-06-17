module Calculate exposing (..)


import Model exposing (Model,Keys)
import Object exposing (r)

-- 计算坐标,与碰撞无关

--upCoordinate: Model -> (Int, Int)
--upCoordinate model = ( floor((model.ball_y - r - 8)/2.675), floor((model.ball_x - 10)/6.675) )

leftCoordinate: Model -> (Int, Int)
leftCoordinate model = (floor ((model.ball_y - 8) / 2.675), floor((model.ball_x - r - 8)/6.675))

rightCoordinate: Model -> (Int, Int)
rightCoordinate model = (floor ((model.ball_y - 8) / 2.675), floor((model.ball_x + r - 8)/6.675))

