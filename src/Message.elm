module Message exposing (Msg(..))


type Msg
    = Start
    | Restart  -- 复活,在milestone3中使用
    | MoveLeft Bool -- 向左移动
    | MoveRight Bool  -- 向右移动
