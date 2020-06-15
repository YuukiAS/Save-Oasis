module Update exposing (..)

import Model exposing (..)
import Message exposing (..)
import Check exposing (..)
import Calculate exposing (..)
import Object exposing (r)
import Model exposing (Model, State(..))
import Browser.Navigation as Nav
import Time
import Random
import Task
import Outlooks exposing (..)
import List.Extra exposing (getAt,count,setAt)
import Dashboard

pointGenerator: Random.Generator (Int,Int)
pointGenerator =
    Random.map2 Tuple.pair
       (Random.int 0 4)
       (Random.int 0 11)


brickGenerator: Random.Generator Brick
brickGenerator =
    Random.weighted
    (85, Cyan)
    [ (5, Red)
    , (10, Pink)
    ]

update: Message.Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        KeyChanged isDown key ->
            ({ model | keys = updateKeys isDown key model.keys }, Cmd.none)

        TimeDelta dt ->                          --* 参数无用,改变此处数值以改变游戏速度
            (updateTime model 0.06, Cmd.none ) --* 这里将Msg转化为Cmd Msg

        DrawBrick time-> (model, Random.generate NewBrick brickGenerator)   --* 注意传递了一个cmd命令!

        NewBrick newBrick-> ({model|nextBrick = newBrick},Cmd.none)

        DrawPoint time -> (model, Random.generate NewPoint pointGenerator)

        NewPoint newPoint ->({model|nextPoint = newPoint},Cmd.none)

        Resume ->
                     ( { model
                         | state = Paused
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
                         , pad_x = 44
                         , pad_vx = 0
                       }
                     , Cmd.none
                     )

        Pause ->    -- 开始时是Pause
                    ({ model | state = Paused
                    , cyanBricks = []
                     , redBricks = []
                     , pinkBricks = []
                     , emptyBricks = []
                    , ball_x = 50
                    , pad_x = 44
                    , pad_vx = 0
                    , ball_y = 37.5
                    , life = 5
                    , exp = 0
                    , max_life = 5
                    , skills_ok = [False,False,False,False,False,False,False,False,False,False]
                    , skills_cost = [25,27,29,31,33,35,40,45,50,100]
                    }, Cmd.none)

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
            let
                nextMinute = if model.second == 59 then True else False
                second = if nextMinute then 0 else model.second+1
                minute = if nextMinute then model.minute+1 else model.minute
            in
              ( { model | minute = minute, second = second  }
              , Cmd.batch[Task.perform DrawBrick Time.now,Task.perform DrawPoint Time.now]
              )

        GoHome -> ( model, Nav.load "/VG100_Project1/home.html" )

        GoHelp -> ( model, Nav.load "/VG100_Project1/help.html" )



updateKeys : Bool -> String -> Keys -> Keys
updateKeys isDown key keys =
    case key of
        "ArrowLeft" -> { keys | left  = isDown }
        "ArrowRight" -> { keys | right = isDown }
        "Enter" -> { keys | enter = isDown }  -- 启动游戏
        "a" -> { keys | left  = isDown}
        "d" -> { keys | right = isDown }
        "1" -> { keys | one = isDown }
        "2" -> { keys | two = isDown }
        "3" -> { keys | three = isDown }
        "4" -> { keys | four = isDown }
        "5" -> { keys | five = isDown }
        "6" -> { keys | six = isDown }
        "7" -> { keys | seven = isDown }
        "8" -> { keys | eight = isDown }
        "9" -> { keys | nine = isDown }
        "0" -> { keys | ten = isDown }
        _ -> keys


updateTime: Model -> Float -> Model
updateTime model dt =
    let
        ski_3_eff = if getAt 2 model.skills_ok == Just True then True else False
        ski_5_eff = if getAt 4 model.skills_ok == Just True then True else False
        ski_6_eff = if getAt 5 model.skills_ok == Just True && (model.second > 40 && model.second == 50)then True else False
        ski_7_eff = if getAt 6 model.skills_ok == Just True && (model.second == 0 || model.second == 30)then True else False
        ski_8_eff = if getAt 7 model.skills_ok == Just True then True else False
        ski_9_eff = if getAt 8 model.skills_ok == Just True  && (model.second == 10 || model.second == 20 ||model.second == 40) then True else False
        ski_10_eff = if getAt 9 model.skills_ok == Just True then True else False



        skills_ok =
            if model.keys.one then if (Dashboard.fromJust (getAt 0 model.skills_cost) < model.exp) && (getAt 0 model.skills_ok /= Just True) then (setAt 0 True model.skills_ok) else model.skills_ok
            else if model.keys.two then if (Dashboard.fromJust (getAt 1 model.skills_cost) < model.exp) && (getAt 1 model.skills_ok /= Just True) then (setAt 1 True model.skills_ok) else model.skills_ok
            else if model.keys.three then if (Dashboard.fromJust (getAt 2 model.skills_cost) < model.exp) && (getAt 2 model.skills_ok /= Just True) then (setAt 2 True model.skills_ok) else model.skills_ok
            else if model.keys.four then if (Dashboard.fromJust (getAt 3 model.skills_cost) < model.exp) && (getAt 3 model.skills_ok /= Just True) then (setAt 3 True model.skills_ok) else model.skills_ok
            else if model.keys.five then if (Dashboard.fromJust (getAt 4 model.skills_cost) < model.exp) && (getAt 4 model.skills_ok /= Just True) then (setAt 4 True model.skills_ok) else model.skills_ok
            else if model.keys.six then if (Dashboard.fromJust (getAt 5 model.skills_cost) < model.exp) && (getAt 5 model.skills_ok /= Just True) then (setAt 5 True model.skills_ok) else model.skills_ok
            else if model.keys.seven then if (Dashboard.fromJust (getAt 6 model.skills_cost) < model.exp) && (getAt 6 model.skills_ok /= Just True) then (setAt 6 True model.skills_ok) else model.skills_ok
            else if model.keys.eight then if (Dashboard.fromJust (getAt 7 model.skills_cost) < model.exp) && (getAt 7 model.skills_ok /= Just True) then (setAt 7 True model.skills_ok) else model.skills_ok
            else if model.keys.nine then if (Dashboard.fromJust (getAt 8 model.skills_cost) < model.exp) && (getAt 8 model.skills_ok /= Just True) then (setAt 8 True model.skills_ok) else model.skills_ok
            else if model.keys.ten then if (Dashboard.fromJust (getAt 9 model.skills_cost) < model.exp) && (getAt 9 model.skills_ok /= Just True) then (setAt 9 True model.skills_ok) else model.skills_ok
            else model.skills_ok

        ski_1_get = if getAt 0 skills_ok /= (getAt 0 model.skills_ok) then True else False
        ski_2_get = if getAt 1 skills_ok /= (getAt 1 model.skills_ok) then True else False
        ski_4_get = if getAt 3 skills_ok /= (getAt 3 model.skills_ok) then True else False


        exp0 =  if ((cUpBricks model || cLeftBricks model || cRightBricks model)  && cDownPaddle model == False) then  -- skill 技能5
                    if ski_5_eff then if model.combo > 0 then model.exp+ 2 + (model.combo - 1)*3 + model.leaf+1  else model.exp + 2 + model.leaf+1
                    else if model.combo > 0 then model.exp+ 2 + (model.combo - 1)*3 + model.leaf  else model.exp + 2 + model.leaf
                else model.exp


        exp = if(skills_ok /= model.skills_ok) then
                if getAt 0 skills_ok /= (getAt 0 model.skills_ok) then exp0 -   Dashboard.fromJust(getAt 0 skills_cost)
                else if  getAt 1 skills_ok /= (getAt 1 model.skills_ok) then exp0 -   Dashboard.fromJust(getAt 1 skills_cost)
                else if  getAt 2 skills_ok /= (getAt 2 model.skills_ok) then exp0 -   Dashboard.fromJust(getAt 2 skills_cost)
                else if  getAt 3 skills_ok /= (getAt 3 model.skills_ok) then exp0 -   Dashboard.fromJust(getAt 3 skills_cost)
                else if  getAt 4 skills_ok /= (getAt 4 model.skills_ok) then exp0 -   Dashboard.fromJust(getAt 4 skills_cost)
                else if  getAt 5 skills_ok /= (getAt 5 model.skills_ok) then exp0 -   Dashboard.fromJust(getAt 5 skills_cost)
                else if  getAt 6 skills_ok /= (getAt 6 model.skills_ok) then exp0 -   Dashboard.fromJust(getAt 6 skills_cost)
                else if  getAt 7 skills_ok /= (getAt 7 model.skills_ok) then exp0 -   Dashboard.fromJust(getAt 7 skills_cost)
                else if  getAt 8 skills_ok /= (getAt 8 model.skills_ok) then exp0 -   Dashboard.fromJust(getAt 8 skills_cost)
                else if  getAt 9 skills_ok /= (getAt 9 model.skills_ok) then exp0 -   Dashboard.fromJust(getAt 9 skills_cost)
                else exp0
              else exp0


        skills_cost0 =
            if(skills_ok /= model.skills_ok) then
                let
                    tot_skill = count ((==) True) skills_ok
                in
                    List.map (\a->a+tot_skill*4+2) model.skills_cost
            else model.skills_cost

        skills_cost = if ski_4_get == True then (List.map(\a->a- 10) skills_cost0) else skills_cost0  -- skill 技能4

        ---- 前置

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

        empty0 =  -- skill 技能10一击致命
            if cGameOver model then model.emptyBricks
            else if cUpBricks model then
                if (List.member (upCoordinate model) model.cyanBricks) || (List.member (upCoordinate model) model.pinkBricks) || (List.member (upCoordinate model) model.redBricks) || ((List.member (upCoordinate model) model.blueBricks)&&ski_10_eff)
                    then List.append model.emptyBricks [upCoordinate model]
                else model.emptyBricks
            else if cLeftBricks model then
                if List.member (leftCoordinate model) model.cyanBricks || (List.member (leftCoordinate model) model.pinkBricks) || (List.member (leftCoordinate model) model.redBricks)  || ((List.member (leftCoordinate model) model.blueBricks)&&ski_10_eff)
                    then List.append model.emptyBricks [leftCoordinate model]
                else model.emptyBricks
            else if cRightBricks model then
                if List.member (rightCoordinate model) model.cyanBricks || (List.member (rightCoordinate model) model.pinkBricks) || (List.member (rightCoordinate model) model.redBricks)  || ((List.member (rightCoordinate model) model.blueBricks)&&ski_10_eff)
                    then List.append model.emptyBricks [rightCoordinate model]
                else model.emptyBricks
            else model.emptyBricks

        -- skill 技能9定期消失
        empty =
            if ski_9_eff then if (List.member (model.nextPoint) model.cyanBricks == False) then List.append empty0 [model.nextPoint]else empty0
            else empty0



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


        life0 =
              if cGameOver model && model.life > 0 then
                    if isRed == True then model.life - 2
                    else if isPink == True then model.life
                    else  model.life - 1
              else
                   if isRed == True then model.life - 1
                   else if isPink == True then if model.life +1 <= model.max_life then model.life+1 else model.life
                   else model.life

        life = if ski_6_eff && (life0 < model.life) then if ski_7_eff then min (life0+2) (max model.life model.max_life - 2) else model.life -- skill 技能6
               else
                    if ski_7_eff then min (life0+1) (max model.life model.max_life - 2) else life0  -- skill技能7


        max_life = if ski_1_get == True then 7   --skill 技能1
                    else model.max_life

        state =
             if cWin model then
                Stopped
             else if cGameOver model && life > 0 then
                 Paused
             else if life <= 0 then
                 Stopped
             else Playing


        combo =
                if ((cUpBricks model || cLeftBricks model || cRightBricks model)  && cDownPaddle model == False)
                then model.combo + 1
                else if (cDownPaddle model) then 0
                else model.combo


        leaf = if((cUpBricks model || cLeftBricks model || cRightBricks model)  && cDownPaddle model == False)
                then if cClearLine model (4- model.leaf) == True then model.leaf+1 else model.leaf
                else model.leaf

        dxp =
            if cGameOver model then 0       -- skill 技能4
            else if model.keys.left then if ski_3_eff then -10.0 else -7.0
            else if model.keys.right then if ski_3_eff then 10.0 else 7.0
            else
                0.0
        xp =
            if cGameOver model then 44
            else if model.pad_x + dt*dxp > 78 then 78  -- 90-12
            else if model.pad_x + dt*dxp < 10 then 10
            else model.pad_x + dt*dxp
-----------* 开始计算碰撞
        --ball
        dxb0 =
            if cGameOver model then 0

            else if (cLeftBricks model || cLeftPillar model || cRightBricks model || cRightPillar model)
            then
                if isCyan == True then -1.05 * model.ball_vx
                else if isRed == True then -0.8 * model.ball_vx
                else if isPink == True then -1.2 * model.ball_vx
                else -1 * model.ball_vx

            else if cDownPaddle model
            then model.ball_vx + 0.05 * model.pad_vx

            else model.ball_vx

        dyb0 =
            if cGameOver model then 0

            else if ( cUpBricks model || cUpPillar model || cDownPaddle model )
            then
                 if isCyan == True then -1.05 * model.ball_vy
                 else if isRed == True then -0.8 * model.ball_vy
                 else if isPink == True then -1.2 * model.ball_vy
                 else -1 * model.ball_vy

            else model.ball_vy

        dxb = if ski_2_get then dxb0 * 0.5 else dxb0  -- skill 技能2
        dyb = if ski_2_get then dyb0 *0.5 else dyb0

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
                , max_life = max_life
                , state = state
                , combo = combo
                , exp = exp
                , leaf = leaf
                , skills_ok = skills_ok
                , skills_cost = skills_cost
        }
