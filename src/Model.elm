module Model exposing (..)
import Message exposing (Msg)
import Outlooks exposing (Music(..),Difficulty(..),SE(..))
import Url
import Browser.Navigation as Nav


type alias Point =  --*这个不是给方块用的
    {
        x : Float
    ,   y: Float
    }

type alias Keys =
    {
        enter: Bool
    ,   left: Bool
    ,   right: Bool
    ,   a: Bool
    ,   d: Bool
    ,   one : Bool
    ,   two : Bool
    ,   three : Bool
    ,   four : Bool
    ,   five : Bool
    ,   six : Bool
    ,   seven : Bool
    ,   eight : Bool
    ,   nine : Bool
    ,   ten : Bool
    }

nokeys: Keys
nokeys =
    Keys False False False False False False False False False False False False False False False

type Page
    = Home
    | Help
    | Game

type State
    = Paused
    | Playing
    | Stopped


type alias AttackState =
    {
        ongoing: Bool
    ,   success: Bool
    }

type alias Clover =
  {
      leftClover : Bool  -- 判断是否打到
    , rightClover : Bool
    , upClover : Bool
  }

ongoingAttack: AttackState
ongoingAttack =
    AttackState True False

successfulAttack: AttackState
successfulAttack =
    AttackState True True

failedAttack: AttackState
failedAttack =
    AttackState True False

overAttack: AttackState
overAttack =
    AttackState False False

type alias Model =
    { keys : Keys
    , state : State
    , pad_x : Float
    , pad_y : Float
    , pad_angle : Float
    , pad_w : Float

    , gold_x : Float
    , gold_y : Float
    , gold_angle : Float
    , gold_w : Float

    , ball_x : Float
    , ball_y : Float
    , ball_vx : Float
    , ball_vy : Float

    , block_vx : Float
    , block_vy : Float
    , block_x : Float
    , block_y : Float

    , wshell_left : Float
    , wshell_up : Float
    , wshell_right : Float
    , wshell_down : Float


    , clover : Clover
    , emptyLeaves : List (Int, Int)
    , blueLeaves: List (Int, Int)
    , cyanLeaves: List (Int, Int)
    , pinkLeaves: List (Int, Int)
    , redLeaves: List (Int, Int)
    , attack : AttackState

    {-, blueBricks: List (Int, Int)
    , cyanBricks: List (Int, Int)
    , pinkBricks: List (Int, Int)
    , redBricks: List (Int, Int)
    , emptyBricks: List (Int, Int)-}

    , nextBrick : Outlooks.Brick
    , nextPoint : (Int,Int)

    , life: Int
    , max_life : Int
    , exp : Int
    , leaf : Int
    , combo : Int
    , minute : Int
    , second : Int
    , skills_ok : List(Bool)
    , skills_cost : List(Int)

    , key : Nav.Key
    , url : Url.Url
    , page : Page
    , music : Outlooks.Music
    , difficulty: Outlooks.Difficulty
    , se : Outlooks.SE
    }

initial : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
initial flags url key =
    ({
        keys = nokeys
      , state = Paused
      , pad_x = 37
      , pad_y = 25
      , pad_angle = 0 -- 加速度
      , pad_w = 0

      , gold_x = 37
      , gold_y = 25
      , gold_angle = 180
      , gold_w = 0

      , ball_x = 47
      , ball_y = 35
      , ball_vx = -3.0
      , ball_vy = -3.0

      , block_vx = 3
      , block_vy = 1.5
      , block_x = 10
      , block_y = 10

      , wshell_left = 0
      , wshell_up = 120
      , wshell_right = 240
      , wshell_down = 0

      , clover = Clover False False False

      , emptyLeaves = []
      , blueLeaves =
      [
       (0, 4), (1, 4), (2, 4), (3, 4), (4, 4), (5, 4), (6, 4), (7, 4), (8, 4), (9, 4), (10, 4),
       (0, 6), (1, 6), (2, 6), (3, 6), (4, 6), (5, 6), (6, 6), (7, 6), (8, 6), (9, 6), (10, 6),
       (0, 13), (1, 13), (2, 13), (3, 13), (4, 13), (5, 13), (6, 13), (7, 13), (8, 13), (9, 13), (10, 13),
       (0, 15), (1, 15), (2, 15), (3, 15), (4, 15), (5, 15), (6, 15), (7, 15), (8, 15), (9, 15), (10, 15)
       ]
       , cyanLeaves = []
       , pinkLeaves = []
       , redLeaves = []
       , attack = ongoingAttack
      {-, blueBricks =
        [ (0, 0), (0, 1), (0, 2), (0, 3), (0, 4), (0, 5), (0, 6), (0, 7), (0, 8), (0, 9), (0, 10), (0, 11)
        , (1, 0), (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10), (1, 11)
        , (2, 0), (2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6), (2, 7), (2, 8), (2, 9), (2, 10), (2, 11)
        , (3, 0), (3, 1), (3, 2), (3, 3), (3, 4), (3, 5), (3, 6), (3, 7), (3, 8), (3, 9), (3, 10), (3, 11)
        , (4, 0), (4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6), (4, 7), (4, 8), (4, 9), (4, 10), (4, 11)
        ]
      , cyanBricks = []
      , pinkBricks = []
      , redBricks = []
      , emptyBricks = []-}

      , nextBrick = Outlooks.Red
      , nextPoint = (0, 0)

      , life = 5
      , max_life = 5
      , exp = 0
      , leaf = 0
      , combo = 0
      , minute = 0
      , second =  0
      , skills_ok = [False,False,False,False,False,False,False,False,False,False]
      , skills_cost = [25,27,29,31,33,35,40,45,50,100]

      , key = key
      , url = url
      , page = Home
      , music = ReturnOfAncients
      , difficulty = Normal
      , se = Quite
    }, Cmd.none)

