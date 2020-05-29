module Object exposing (..)

import Playground exposing (..)

cus_red = rgb 255 107 107
cus_orange = rgb 255 159 67
cus_yellow = rgb 254 202 87
cus_blue = rgb 84 160 255
cus_cyan  = rgb 0 210 211
cus_pink = rgb 255 159 243

main = game view update { x = 0, y = 0, angle = 0 }

ball = circle cus_yellow 3
paddle = rectangle cus_orange 55 3
brick1 = rectangle cus_blue 35 10
brick2 = rectangle cus_cyan 35 10  --加速*1.1
brick3 = rectangle cus_pink 35 10  -- 加血,但是加速*1.5
brick4 = rectangle cus_red 35 10   -- 掉血,但是减速*0.8

lshape =      -- 全部相对于brick1
    group
    [
         brick1
            |> moveLeft 75
        ,brick2
            |> moveRight 75
        ,brick3
            |> moveRight 150
        ,brick4
            |> moveRight 225
        ,ball
            |> moveLeft 150
        ,paddle
            |> moveLeft 225
    ]

view computer shapes =
    [ lshape
        |> move shapes.x shapes.y
        |> rotate shapes.angle
        |> scale 3
    ]

update computer shapes =
    let
        x =
            shapes.x + toX computer.keyboard
        y =
            if shapes.y <= -100 then
                shapes.y
            else if computer.keyboard.down then
                shapes.y + 2 * toY computer.keyboard
            else
                shapes.y - 0.5
        angle =
            if computer.keyboard.up then
                shapes.angle + pi
            else
                shapes.angle
    in
    { x = x
    , y = y
    , angle = angle
    }