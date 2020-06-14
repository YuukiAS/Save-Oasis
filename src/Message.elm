module Message exposing (Msg(..))
import Outlooks
import Time

type Msg
    = Start
    | Pause
    | Resume
    | Keep
    | KeyChanged Bool String
    | TimeDelta Float -- 时间
    | DrawBrick Time.Posix  -- 该参数无实际效果
    | NewBrick Outlooks.Brick
    | DrawPoint Time.Posix
    | NewPoint (Int,Int)
    | Tick Time.Posix
    | GoHome
    | GoHelp