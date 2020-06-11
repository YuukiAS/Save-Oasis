module Update exposing (..)

import Model exposing (..)
import Message exposing (..)
import Check exposing (..)
import Calculate exposing (..)
import Object exposing (r)
import Model exposing (Model, State(..))
import Time
import Random
import Task
import Outlooks exposing (..)

brickGenerator: Random.Generator Brick
brickGenerator =
    Random.weighted
    (50, Cyan)
    [ (25, Red)
    , (25, Pink)
    ]

update: Message.Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        KeyChanged isDown key ->
            ({ model | keys = updateKeys isDown key model.keys }, Cmd.none)

        TimeDelta dt ->                          --* 参数无用,改变此处数值以改变游戏速度
            (updateTime model 0.06, Cmd.none ) --* 这里将Msg转化为Cmd Msg

        Draw time-> (model, Random.generate NewBrick brickGenerator)   --* 注意传递了一个cmd命令!

        NewBrick newBrick-> ({model|nextBrick = newBrick},Cmd.none)

        Resume ->
                     ( { model
                         | state = Playing
                         , blueBricks =
                         [ (0, 0), (0, 1), (0, 2), (0, 3), (0, 4), (0, 5), (0, 6), (0, 7), (0, 8), (0, 9), (0, 10), (0, 11)
                         , (1, 0), (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10), (1, 11)
                         , (2, 0), (2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6), (2, 7), (2, 8), (2, 9), (2, 10), (2, 11)
                         , (3, 0), (3, 1), (3, 2), (3, 3), (3, 4), (3, 5), (3, 6), (3, 7), (3, 8), (3, 9), (3, 10), (3, 11)
                         , (4, 0), (4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6), (4, 7), (4, 8), (4, 9), (4, 10), (4, 11)
                         ]
                         , cyanBricks = []
                         , redBricks = []
                         , pinkBricks = []
                         , emptyBricks = []
                         , ball_vx = 1
                         , ball_vy = -1
                         , ball_x = 50
                         , ball_y = 37.5
                       }
                     , Cmd.none
                     )

        Pause ->
                    ({ model | state = Paused
                    , ball_x = 50
                    , pad_x = 44
                    , pad_vx = 0  -- 加速度
                    , ball_y = 37.5
                    , life = 3}, Cmd.none)

        Start ->
                    ({ model |
                     state = Playing
                     , ball_y = 37.5
                     , ball_x = 50
                     , ball_vx = 3
                     , ball_vy = -3
                     }, Cmd.none
                     )

        Keep ->
           ({ model | state = Playing }, Cmd.none )

        Tick newTime ->
          ( { model | now = newTime }
          , Task.perform Draw Time.now
          )
        AdjustTimeZone newZone ->
          ( { model | zone = newZone }
          , Cmd.none
          )

        --* 改成Cmd Msg后不需要这个
        {-_ ->
            (model, Cmd.none)-}

updateKeys : Bool -> String -> Keys -> Keys
updateKeys isDown key keys =
    case key of
        "ArrowLeft" -> { keys | left  = isDown }
        "ArrowRight" -> { keys | right = isDown }
        "Enter" -> { keys | enter = isDown }  -- 启动游戏
        _ -> keys






updateTime: Model -> Float -> Model
updateTime model dt =
    let
        isCyan =
            if (cUpBricks model && (List.member (upCoordinate model) model.cyanBricks))
            || (cLeftBricks model && (List.member (leftCoordinate model) model.cyanBricks))
            || (cRightBricks model && (List.member (rightCoordinate model) model.cyanBricks)) then True
            else False
        isRed =
                    if (cUpBricks model && (List.member (upCoordinate model) model.redBricks))
                    || (cLeftBricks model && (List.member (leftCoordinate model) model.redBricks))
                    || (cRightBricks model && (List.member (rightCoordinate model) model.redBricks)) then True
                    else False
        isPink =
                    if (cUpBricks model && (List.member (upCoordinate model) model.pinkBricks))
                    || (cLeftBricks model && (List.member (leftCoordinate model) model.pinkBricks))
                    || (cRightBricks model && (List.member (rightCoordinate model) model.pinkBricks)) then True
                    else False

        empty =
            if cGameOver model then model.emptyBricks
            else if cUpBricks model then
                if (List.member (upCoordinate model) model.cyanBricks) || (List.member (upCoordinate model) model.pinkBricks) || (List.member (upCoordinate model) model.redBricks)
                    then List.append model.emptyBricks [upCoordinate model]
                else model.emptyBricks
            else if cLeftBricks model then
                if List.member (leftCoordinate model) model.cyanBricks || (List.member (leftCoordinate model) model.pinkBricks) || (List.member (leftCoordinate model) model.redBricks)
                    then List.append model.emptyBricks [leftCoordinate model]
                else model.emptyBricks
            else if cRightBricks model then
                if List.member (rightCoordinate model) model.cyanBricks || (List.member (rightCoordinate model) model.pinkBricks) || (List.member (rightCoordinate model) model.redBricks)
                    then List.append model.emptyBricks [rightCoordinate model]
                else model.emptyBricks
            else model.emptyBricks

        cyan =           -- 生成cyan
            if cGameOver model then model.cyanBricks
            else if model.nextBrick /= Cyan then model.cyanBricks  --* 区分大小写!
            else if cUpBricks model == True then
                if List.member (upCoordinate model) model.blueBricks
                    then List.append model.cyanBricks [upCoordinate model]
                else model.cyanBricks
            else if cLeftBricks model then
                if List.member (leftCoordinate model) model.blueBricks
                    then List.append model.cyanBricks [leftCoordinate model]
                else model.cyanBricks
            else if cRightBricks model then
                if List.member (rightCoordinate model) model.blueBricks
                    then List.append model.cyanBricks [rightCoordinate model]
                else model.cyanBricks
            else model.cyanBricks

        pink =           -- 生成pink
             if cGameOver model then model.pinkBricks
             else if model.nextBrick /= Pink then model.pinkBricks
             else if cUpBricks model then
                 if List.member (upCoordinate model) model.blueBricks
                     then List.append model.pinkBricks [upCoordinate model]
                 else model.pinkBricks
             else if cLeftBricks model then
                 if List.member (leftCoordinate model) model.blueBricks
                     then List.append model.pinkBricks [leftCoordinate model]
                 else model.pinkBricks
             else if cRightBricks model then
                 if List.member (rightCoordinate model) model.blueBricks
                     then List.append model.pinkBricks [rightCoordinate model]
                 else model.pinkBricks
             else model.pinkBricks

        red =           -- 生成pink
             if cGameOver model then model.redBricks
             else if model.nextBrick /= Red then model.redBricks
             else if cUpBricks model then
                 if List.member (upCoordinate model) model.blueBricks
                     then List.append model.redBricks [upCoordinate model]
                 else model.redBricks
             else if cLeftBricks model then
                 if List.member (leftCoordinate model) model.blueBricks
                     then List.append model.redBricks [leftCoordinate model]
                 else model.redBricks
             else if cRightBricks model then
                 if List.member (rightCoordinate model) model.blueBricks
                     then List.append model.redBricks [rightCoordinate model]
                 else model.redBricks
             else model.redBricks


        life =
              if cGameOver model && model.life > 0 then
                    if isRed == True then model.life - 2
                    else if isPink == True then model.life
                    else  model.life - 1
              else
                   if isRed == True then model.life - 1
                   else if isPink == True then model.life +1
                   else model.life

        combo =
                if ((cUpBricks model || cLeftBricks model || cRightBricks model)  && cDownPaddle model == False)
                then model.combo + 1
                else if (cDownPaddle model) then 0
                else model.combo

        state =
             if cWin model then
                Stopped
             else if cGameOver model && life > 0 then
                 Paused
             else if life <= 0 then
                 Stopped
             else Playing

        dxp =
            if cGameOver model then 0
            else if model.keys.left then -7.0
            else if model.keys.right then 7.0
            else
                0.0
        xp =
            if cGameOver model then 44
            else if model.pad_x + dt*dxp > 78 then 78  -- 90-12
            else if model.pad_x + dt*dxp < 10 then 10
            else model.pad_x + dt*dxp
-----------* 开始计算碰撞
        --ball
        dxb =
            if cGameOver model then 0

            else if (cLeftBricks model || cLeftPillar model || cRightBricks model || cRightPillar model)
            then
                if isCyan == True then -1.2 * model.ball_vx
                else if isRed == True then -0.8 * model.ball_vx
                else if isPink == True then -1.5 * model.ball_vx
                else -1 * model.ball_vx

            else if cDownPaddle model
            then model.ball_vx + 0.05 * model.pad_vx

            else model.ball_vx

        dyb =
            if cGameOver model then 0

            else if ( cUpBricks model || cUpPillar model || cDownPaddle model )
            then
                 if isCyan == True then -1.2 * model.ball_vy
                 else if isRed == True then -0.8 * model.ball_vy
                 else if isPink == True then -1.5 * model.ball_vy
                 else -1 * model.ball_vy

            else model.ball_vy

        xb =
            if cGameOver model then 50
            else if model.ball_x + dt*dxb > (90 - r) then (90 - r)
            else if model.ball_x + dt*dxb < (10 + r) then (10 + r)
            else model.ball_x + dt*dxb

        yb =
            if cGameOver model then 37.5
            else if model.ball_y + dt*dyb < (8 + r) then (8 + r)
            else if model.ball_y + dt*dyb > (45 - r) then (45 - r)
            else model.ball_y + dt*dyb


    in
        { model | pad_x = xp, pad_vx = dxp
                , ball_x = xb, ball_y = yb
                , ball_vx = dxb, ball_vy = dyb
                , emptyBricks = empty
                , cyanBricks = cyan
                , pinkBricks = pink
                , redBricks = red
                , life = life
                , state = state
                , combo = combo
        }
