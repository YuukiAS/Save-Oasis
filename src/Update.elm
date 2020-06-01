module Update exposing (..)
import Playground exposing (..)

update computer memory =            --* 传入的是pb,不能直接用
    let                         -- let的语法好怪..有的要逗号有的不要
         pad_x = memory.pad_x
         pad_y = memory.pad_y
         pad_vx = memory.pad_vx
         ball_x = memory.ball_x
         ball_y = memory.ball_y
         ball_vx = memory.ball_vx
         ball_vy = memory.ball_vy
    in
    {
         pad_x = pad_x
    ,    pad_y = pad_y
    ,    pad_vx = pad_vx
    ,    ball_x = ball_x
    ,    ball_y = ball_y
    ,    ball_vx = ball_vx
    ,    ball_vy = ball_vy
    }
