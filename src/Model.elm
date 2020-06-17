module Model exposing (..)
import Message exposing (Msg)
import Outlooks exposing (Music(..),Difficulty(..))
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
    Keys False False False False False False False False False False False False False

type Page
    = Home
    | Help
    | Game

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
    , nextPoint : (Int,Int)
    , life: Int
    , max_life : Int
    , exp : Int
    , leaf : Int
    , state : State
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
    }

initial : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
initial flags url key =
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
      , nextPoint = (0, 0)
      , life = 5
      , max_life = 5
      , exp = 0
      , leaf = 0
      , skills_ok = [False,False,False,False,False,False,False,False,False,False]
      , skills_cost = [25,27,29,31,33,35,40,45,50,100]
      , combo = 0
      , state = Stopped
      , minute = 0
      , second =  0
      , key = key
      , url = url
      , page = Home
      , music = ReturnOfAncients
      , difficulty = Normal
    }, Cmd.none)

