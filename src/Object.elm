module Object exposing (..)

import Playground exposing (..)

cus_red = rgb 255 107 107
cus_orange = rgb 255 159 67
cus_yellow = rgb 254 202 87
cus_blue = rgb 84 160 255
cus_cyan  = rgb 0 210 211
cus_pink = rgb 255 159 243



ball ball_height = circle cus_yellow ball_height
paddle pad_width pad_height= rectangle cus_orange pad_width pad_height
brick1 brick_width brick_height= rectangle cus_blue brick_width brick_height
brick2 brick_width brick_height = rectangle cus_cyan brick_width brick_height  --加速*1.1
brick3 brick_width brick_height = rectangle cus_pink brick_width brick_height  -- 加血,但是加速*1.5
brick4 brick_width brick_height = rectangle cus_red brick_width brick_height   -- 掉血,但是减速*0.8

grid brick_width brick_height move=
    group
    [
        brick1 brick_width brick_height
        ,brick1 brick_width brick_height
            |> moveRight (move*1)
        ,brick1 brick_width brick_height
            |> moveRight (move*2)
        ,brick1 brick_width brick_height
            |> moveRight (move*3)
        ,brick1 brick_width brick_height
            |> moveRight (move*4)
        ,brick1 brick_width brick_height
            |> moveRight (move*5)
        ,brick1 brick_width brick_height
            |> moveRight (move*6)
        ,brick1 brick_width brick_height
            |> moveRight (move*7)
        ,brick1 brick_width brick_height
            |> moveRight (move*8)
        ,brick1 brick_width brick_height
            |> moveRight (move*9)
        ,brick1 brick_width brick_height
            |> moveRight (move*10)
        ,brick1 brick_width brick_height
            |> moveRight (move*11)
    ]