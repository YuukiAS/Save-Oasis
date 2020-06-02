module Model exposing (..)
import Message exposing (Msg)


type alias Point =
    {
        x : Float
    ,   y: Float
    }

type alias Keys =
    {
        left: Bool
    ,   right: Bool
    }
nokeys: Keys
nokeys =
    Keys False False

type alias Model =
    { keys : Keys
    , pad_x : Float
    , pad_vx : Float  -- 加速度
    , ball_x : Float
    , ball_y : Float
    , ball_vx : Float
    , ball_vy :Float
    }

initial : () -> (Model, Cmd Msg)
initial _ =
    ({
        keys = nokeys
      , pad_x = 44
      , pad_vx = 0  -- 加速度
      , ball_x = 0
      , ball_y = 0
      , ball_vx = 0
      , ball_vy = 0
    }, Cmd.none)

type State     -- 正在进行或停止,milestone3用
    = Paused
    | Playing
    | Stopped