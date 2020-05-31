module Model exposing (..)

type alias Model =
    { pad_x : Int
    , pad_y : Int
    , pad_vx : Int  -- 加速度
    , ball_x : Int
    , ball_y : Int
    , ball_vx : Int
    , ball_vy :Int
    }

initial : Model
initial =
    {
        pad_x = 0
      , pad_y = 0
      , pad_vx = 0  -- 加速度
      , ball_x = 0
      , ball_y = 0
      , ball_vx = 0
      , ball_vy = 0
    }