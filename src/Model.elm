module Model exposing (..)
import Message exposing (Msg)
import Outlooks
import Time
import Task
import Message
import Json.Decode as Decode
import Json.Encode as Encode


type alias Point =
    {
        x : Float
    ,   y: Float
    }

type alias Keys =
    {
        left: Bool
    ,   right: Bool
    ,   enter: Bool
    }

nokeys: Keys
nokeys =
    Keys False False False


type State
    = Paused
    | Playing
    | Stopped


type alias AnimationState =       --? 用过吗?
    Maybe
        { active : Bool
        , elapsed : Float
        }


type alias Model =
    { keys : Keys
    , pad_x : Float
    , pad_vx : Float  -- 加速度
    , ball_x : Float
    , ball_y : Float
    , ball_vx : Float
    , ball_vy : Float
    , blueBricks: List (Int, Int)
    , cyanBricks: List (Int, Int)
    , pinkBricks: List (Int, Int)
    , redBricks: List (Int, Int)
    , emptyBricks: List (Int, Int)
    , nextBrick : Outlooks.Brick
    , life: Int
    , max_life : Int
    , exp : Int --todo 经验值
    , leaf : Int  --todo 打掉的行数
    , state : State
    , combo : Int --todo 获得更多经验值
    , minute : Int
    , second : Int
    , skills : List(Bool) -- todo 拥有的技能
    }

initial : () -> (Model, Cmd Msg)
initial _ =
    ({
        keys = nokeys
      , pad_x = 44
      , pad_vx = 0  -- 加速度
      , ball_x = 50
      , ball_y = 37.5
      , ball_vx = 0.5
      , ball_vy = -0.5
      , blueBricks =
        [ (0, 0), (0, 1), (0, 2), (0, 3), (0, 4), (0, 5), (0, 6), (0, 7), (0, 8), (0, 9), (0, 10), (0, 11)
        , (1, 0), (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10), (1, 11)
        , (2, 0), (2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6), (2, 7), (2, 8), (2, 9), (2, 10), (2, 11)
        , (3, 0), (3, 1), (3, 2), (3, 3), (3, 4), (3, 5), (3, 6), (3, 7), (3, 8), (3, 9), (3, 10), (3, 11)
        , (4, 0), (4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6), (4, 7), (4, 8), (4, 9), (4, 10), (4, 11)
        ]
      , cyanBricks = []
      , pinkBricks = []
      , redBricks = []
      , emptyBricks = []
      , nextBrick = Outlooks.Red
      , life = 3
      , max_life = 3
      , exp = 0
      , leaf = 0
      , skills = [False,False,False,False,False,False,False,False,False,False,False]
      , combo = 0
      , state = Stopped
      , minute = 0
      , second =  0
    }, Cmd.none)

