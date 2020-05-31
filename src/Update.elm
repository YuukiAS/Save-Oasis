module Update exposing (..)
import Playground exposing (..)

update computer pb =            --* 传入的是pb,不能直接用
    let                         -- let的语法好怪..有的要逗号有的不要
         pad_x = pb.pad_x
         pad_y = pb.pad_y
         pad_vx = pb.pad_vx
         ball_x = pb.ball_x
         ball_y = pb.ball_y
         ball_vx = pb.ball_vx
         ball_vy = pb.ball_vy
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
