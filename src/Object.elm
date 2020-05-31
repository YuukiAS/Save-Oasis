module Object exposing (..)

import Playground exposing (..)

cus_red = rgb 255 107 107
cus_orange = rgb 255 159 67
cus_yellow = rgb 254 202 87
cus_blue = rgb 84 160 255
cus_cyan  = rgb 0 210 211
cus_pink = rgb 255 159 243

ball = circle cus_yellow 15
paddle = rectangle cus_orange 210 15
brick1 = rectangle cus_blue 100 40
brick2 = rectangle cus_cyan 100 40  --加速*1.1
brick3 = rectangle cus_pink 100 40  -- 加血,但是加速*1.5
brick4 = rectangle cus_red 100 40   -- 掉血,但是减速*0.8

grid =
    group
    [
        brick1
        ,brick1
            |> moveRight 102
        ,brick1
            |> moveRight 204
        ,brick1
            |> moveRight 306
        ,brick1
            |> moveRight 408
        ,brick1
            |> moveRight 510
        ,brick1
            |> moveRight 612
        ,brick1
            |> moveRight 714
        ,brick1
            |> moveRight 816
        ,brick1
            |> moveRight 918
        ,brick1
            |> moveRight 1020
        ,brick1
            |> moveRight 1122
    ]