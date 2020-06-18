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
import Browser
import Url
--* 随机
pointGenerator: Random.Generator (Int, Int)   -- 用于四个发射的
pointGenerator =
    Random.map2 Tuple.pair
        (Random.int 0 1)
        (Random.int 0 1)

{-eraseGenerator: Random.Generator (Int,Int)   --废弃技能
eraseGenerator =
    Random.map2 Tuple.pair
       (Random.int 0 10)
       (Random.uniform 4 [6,13,15])-}

brickGenerator: Random.Generator Brick
brickGenerator =
    Random.weighted
    (60, Cyan)
    [ (20, Red)
    , (20, Pink)
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

       {-} Resume ->
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
            let
                life = case model.difficulty of
                        Normal -> 5
                        Hard -> 3
                        Nightmare -> 1
                max_life = case model.difficulty of
                        Normal -> 5
                        Hard -> 3
                        Nightmare -> 1
                expN = case model.difficulty of
                       Normal -> 1
                       Hard -> 2
                       Nightmare -> 3
            in
                ({ model | state = Paused
                , cyanBricks = []
                 , redBricks = []
                 , pinkBricks = []
                 , emptyBricks = []
                , ball_x = 50
                , pad_x = 44
                , pad_vx = 0
                , ball_y = 37.5
                , life = life
                , exp = 0
                , max_life = max_life
                , skills_ok = [False,False,False,False,False,False,False,False,False,False]
                , skills_cost = [25*expN,27*expN,29*expN,31*expN,33*expN,35*expN,40*expN,45*expN,50*expN,100*expN]
                }, Cmd.none)

        Start ->
                    ({ model |
                     state = Playing
                     , ball_y = 37.5
                     , ball_x = 50
                     , ball_vx = 3
                     , ball_vy = -3
                     , se = Quite
                     }, Cmd.none
                     )

        Keep ->
           ({ model | state = Playing }, Cmd.none )-}

        Tick newTime ->
            let
                nextMinute = if model.second == 59 then True else False
                second = if nextMinute then 0 else model.second+1
                minute = if nextMinute then model.minute+1 else model.minute
            in
              ( { model | minute = minute, second = second  }
              , Cmd.batch[Task.perform DrawBrick Time.now,Task.perform DrawPoint Time.now]
              )

        LinkClicked urlRequest ->
              case urlRequest of   -- 内部和外部网页的不同应对
                Browser.Internal url ->
                  ( model, Nav.pushUrl model.key (Url.toString url) )  -- 只加载不跳转
                  --( model, Nav.load (Url.toString url) )

                Browser.External href ->
                  ( model, Nav.load href )

        UrlChanged url ->
          ( { model | url = url }
          , Cmd.none
          )

        GoHelp -> ({model| page = Help},Cmd.none)

        GoHome -> ({model| page = Home},Cmd.none)

        GoGame -> ({model| page = Game},Cmd.none)

        ChangeMusic music -> ({model|music = music},Cmd.none)

        ChangeDifficulty difficulty ->
            let
                life = case model.difficulty of
                        Normal -> 5
                        Hard -> 3
                        Nightmare -> 1
                max_life = case model.difficulty of
                        Normal -> 5
                        Hard -> 3
                        Nightmare -> 1
                expN = case model.difficulty of
                       Normal -> 1
                       Hard -> 2
                       Nightmare -> 3
            in
                ({model|
                      difficulty = difficulty
                    , life = life
                    , max_life = max_life
                    , skills_cost = [25*expN,27*expN,29*expN,31*expN,33*expN,35*expN,40*expN,45*expN,50*expN,100*expN]
                },Cmd.none)


updateKeys : Bool -> String -> Keys -> Keys
updateKeys isDown key keys =
    case key of
        "ArrowLeft" -> { keys | left  = isDown }
        "ArrowRight" -> { keys | right = isDown }
        "Enter" -> { keys | enter = isDown }  -- 启动游戏
        "a" -> { keys | a  = isDown}
        "d" -> { keys | d = isDown }
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
       ---* 技能及经验
        ski_3_eff = if getAt 2 model.skills_ok == Just True then True else False
        ski_4_eff = if getAt 3 model.skills_ok == Just True then True else False
        ski_5_eff = if getAt 4 model.skills_ok == Just True then True else False
        ski_6_eff = if getAt 5 model.skills_ok == Just True then True else False
        ski_7_eff = if getAt 6 model.skills_ok == Just True then True else False
        ski_8_eff = if getAt 7 model.skills_ok == Just True then True else False
        ski_9_eff = if getAt 8 model.skills_ok == Just True then True else False
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



        exp0 =  if cIsCoordinate model /= (0,0) then  -- skill 技能5
                    if ski_5_eff then if model.combo > 0 then model.exp+ 2 + (model.combo - 1)*3 + model.leaf + 1  else model.exp + 2 + model.leaf + 1
                    else if model.combo > 0 then model.exp+ 2 + (model.combo - 1)*3 + model.leaf  else model.exp + 2 + model.leaf
                else model.exp


        exp = if(skills_ok /= model.skills_ok) then
                if getAt 0 skills_ok /= (getAt 0 model.skills_ok) then exp0 - Dashboard.fromJust(getAt 0 skills_cost)
                else if  getAt 1 skills_ok /= (getAt 1 model.skills_ok) then exp0 - Dashboard.fromJust(getAt 1 skills_cost)
                else if  getAt 2 skills_ok /= (getAt 2 model.skills_ok) then exp0 - Dashboard.fromJust(getAt 2 skills_cost)
                else if  getAt 3 skills_ok /= (getAt 3 model.skills_ok) then exp0 - Dashboard.fromJust(getAt 3 skills_cost)
                else if  getAt 4 skills_ok /= (getAt 4 model.skills_ok) then exp0 - Dashboard.fromJust(getAt 4 skills_cost)
                else if  getAt 5 skills_ok /= (getAt 5 model.skills_ok) then exp0 - Dashboard.fromJust(getAt 5 skills_cost)
                else if  getAt 6 skills_ok /= (getAt 6 model.skills_ok) then exp0 - Dashboard.fromJust(getAt 6 skills_cost)
                else if  getAt 7 skills_ok /= (getAt 7 model.skills_ok) then exp0 - Dashboard.fromJust(getAt 7 skills_cost)
                else if  getAt 8 skills_ok /= (getAt 8 model.skills_ok) then exp0 - Dashboard.fromJust(getAt 8 skills_cost)
                else if  getAt 9 skills_ok /= (getAt 9 model.skills_ok) then exp0 - Dashboard.fromJust(getAt 9 skills_cost)
                else exp0
              else exp0

        skills_cost0 =
            if(skills_ok /= model.skills_ok) then
                let
                    tot_skill = count ((==) True) skills_ok
                in
                    List.map (\a->a+tot_skill*4+2) model.skills_cost
            else model.skills_cost

        skills_cost = if ski_2_get == True then (List.map(\a->a- 10) skills_cost0) else skills_cost0

        ----* 砖块

        isCyan =
                    if cIsCoordinate model /= (0, 0) && (List.member (cIsCoordinate model) model.cyanLeaves)then True
                    else False
        isRed =
                   if cIsCoordinate model /= (0, 0) && (List.member (cIsCoordinate model) model.redLeaves)then True
                   else False
        isPink =
                    if cIsCoordinate model /= (0, 0) && (List.member (cIsCoordinate model) model.pinkLeaves)then True
                    else False


        empty =
            if cIsCoordinate model /= (0, 0) then
                if  List.member (cIsCoordinate model) model.cyanLeaves || List.member (cIsCoordinate model) model.pinkLeaves || List.member (cIsCoordinate model) model.redLeaves  || (List.member (cIsCoordinate model) model.blueLeaves &&ski_9_eff)
                then List.append   model.emptyLeaves [cIsCoordinate model] else model.emptyLeaves
            else model.emptyLeaves


        cyan =
            if model.nextBrick /= Cyan then model.cyanLeaves
            else if cIsCoordinate model /= (0,0) then
                if List.member (cIsCoordinate model) model.blueLeaves then List.append model.cyanLeaves [cIsCoordinate model]
                else model.cyanLeaves
            else model.cyanLeaves

        pink =
             if model.nextBrick /= Pink then model.pinkLeaves
             else if cIsCoordinate model /= (0,0) then
                if List.member (cIsCoordinate model) model.blueLeaves then List.append model.pinkLeaves [cIsCoordinate model]
                else model.pinkLeaves
             else model.pinkLeaves

        red =
             if model.nextBrick /= Red then model.redLeaves
             else if cIsCoordinate model /= (0,0) then
                if List.member (cIsCoordinate model) model.blueLeaves then List.append model.redLeaves [cIsCoordinate model]
                else model.redLeaves
             else model.redLeaves

        state =
             if cIsWin model || cIsLose model then
                 Stopped
                 --todo 增加暂停
             --  else if cGameOver model && life > 0 then
             --    Paused
             else model.state

        attackState =
            if (cLeftPillar model model.block_x || cRightPillar model model.block_x || cUpPillar model model.block_y || cDownPillar model model.block_y) then overAttack
            else ongoingAttack


       ------  *黄球
        dxb0 =
            if cHit model.ball_x model.ball_y && cValidB model.gold_angle model.ball_x model.ball_y 42 30 && model.keys.enter  then 4 * (model.ball_x - 42) / ((42 - model.ball_x)^2 + (30 - model.ball_y)^2) ^ 0.5
            else if cHit model.ball_x model.ball_y then
            (-1 * (model.ball_x - 42)^2 * model.ball_vx + (model.ball_y - 30)^2 * model.ball_vx - 2 * (model.ball_x - 42) * (model.ball_y - 30) * model.ball_vy) / ((model.ball_x - 42)^2 + (model.ball_y - 30)^2)
            else if cHitB model.ball_x model.ball_y 10 30 && cValidB  model.wShell_left model.ball_x model.ball_y 10 30  == False then
            (-1 * (model.ball_x - 10)^2 * model.ball_vx + (model.ball_y - 30)^2 * model.ball_vx - 2 * (model.ball_x - 10) * (model.ball_y - 30) * model.ball_vy) / ((model.ball_x - 10)^2 + (model.ball_y - 30)^2)
            else if cHitB model.ball_x model.ball_y 74 30 && cValidB  model.wShell_right model.ball_x model.ball_y 74 30  == False then
            (-1 * (model.ball_x - 74)^2 * model.ball_vx + (model.ball_y - 30)^2 * model.ball_vx - 2 * (model.ball_x - 74) * (model.ball_y - 30) * model.ball_vy) / ((model.ball_x - 74)^2 + (model.ball_y - 30)^2)
            else if cHitB model.ball_x model.ball_y 42 14 && cValidB  model.wShell_up model.ball_x model.ball_y 42 14 == False then
            (-1 * (model.ball_x - 42)^2 * model.ball_vx + (model.ball_y - 14)^2 * model.ball_vx - 2 * (model.ball_x - 42) * (model.ball_y - 14) * model.ball_vy) / ((model.ball_x - 42)^2 + (model.ball_y - 14)^2)
            else if cHitB model.ball_x model.ball_y 42 46 then
            (-1 * (model.ball_x - 42)^2 * model.ball_vx + (model.ball_y - 46)^2 * model.ball_vx - 2 * (model.ball_x - 42) * (model.ball_y - 46) * model.ball_vy) / ((model.ball_x - 42)^2 + (model.ball_y - 46)^2)
            else if cLeftPillar model model.ball_x || cRightPillar model model.ball_x || cUpPillar model model.ball_y || cDownPillar model model.ball_y then 4 * (42 - model.ball_x) / ((42 - model.ball_x)^2 + (30 - model.ball_y)^2) ^ 0.5
            else if cRightLeaf model || cLeftLeaf model then model.ball_vx * (-1)
            else model.ball_vx

        dyb0 =
            if cHit model.ball_x model.ball_y && cValidB model.gold_angle model.ball_x model.ball_y 42 30 && model.keys.enter then 4 * (model.ball_y - 30) / ((42 - model.ball_x)^2 + (30 - model.ball_y)^2) ^ 0.5
            else if cHit model.ball_x model.ball_y then
            (-2 * (model.ball_x - 42) * (model.ball_y - 30) * model.ball_vx + (model.ball_x - 42)^2 * model.ball_vy - (model.ball_y - 30)^2 * model.ball_vy) / ((model.ball_x - 42)^2 + (model.ball_y - 30)^2)
            else if cHitB model.ball_x model.ball_y 10 30  && cValidB  model.wShell_left model.ball_x model.ball_y 10 30 == False then
            (-2 * (model.ball_x - 10) * (model.ball_y - 30) * model.ball_vx + (model.ball_x - 10)^2 * model.ball_vy - (model.ball_y - 30)^2 * model.ball_vy) / ((model.ball_x - 10)^2 + (model.ball_y - 30)^2)
            else if cHitB model.ball_x model.ball_y 74 30 && cValidB  model.wShell_right model.ball_x model.ball_y 74 30 == False then
            (-2 * (model.ball_x - 74) * (model.ball_y - 30) * model.ball_vx + (model.ball_x - 74)^2 * model.ball_vy - (model.ball_y - 30)^2 * model.ball_vy) / ((model.ball_x - 74)^2 + (model.ball_y - 30)^2)
            else if cHitB model.ball_x model.ball_y 42 14 && cValidB  model.wShell_up model.ball_x model.ball_y 42 14 == False then
            (-2 * (model.ball_x - 42) * (model.ball_y - 14) * model.ball_vx + (model.ball_x - 42)^2 * model.ball_vy - (model.ball_y - 14)^2 * model.ball_vy) / ((model.ball_x - 42)^2 + (model.ball_y - 14)^2)
            else if cHitB model.ball_x model.ball_y 42 46 then
            (-2 * (model.ball_x - 42) * (model.ball_y - 46) * model.ball_vx + (model.ball_x - 42)^2 * model.ball_vy - (model.ball_y - 46)^2 * model.ball_vy) / ((model.ball_x - 42)^2 + (model.ball_y - 46)^2)
            else if cLeftPillar model model.ball_x || cRightPillar model model.ball_x || cUpPillar model model.ball_y || cDownPillar model model.ball_y then 4 * (30 - model.ball_y) / ((42 - model.ball_x)^2 + (30 - model.ball_y)^2) ^ 0.5
            else if cUpLeaf model || cDownLeaf model then model.ball_vy * (-1)
            else model.ball_vy

        dxb = if isRed then dxb0 * 1.1
              else if isPink then dxb0 * 0.9
              else dxb0

        dyb = if isRed then dyb0 * 1.1
              else if isPink then dyb0 * 0.9
              else dyb0


        xb =
            if cIsHitGold model  && model.keys.enter == False then 42 + 5.5 * cos(degrees (model.gold_angle + 135))
            else model.ball_x + dt * dxb

        yb =
            if cIsHitGold model && model.keys.enter == False then 30 - 5.5 * sin(degrees (model.gold_angle + 135))
            else model.ball_y + dt * dyb

        -----  *踏板
        wp =  -- 蓝色,角速度
            if model.keys.left then if ski_3_eff then 3.0 else 2.0
            else if model.keys.right then if ski_3_eff then -3.0 else -2.0
            else 0

        ap = if (model.gold_angle - model.pad_angle - 2 * wp > 90 && model.gold_angle - model.pad_angle - 2 * wp < 270) || (model.gold_angle - model.pad_angle - 2 * wp < -90 && model.gold_angle - model.pad_angle - 2 * wp > -270) then model.pad_angle + wp
             else model.pad_angle

        wg =   -- 金色,角速度
            if model.keys.a then if ski_3_eff then 3.0 else 2.0
            else if model.keys.d then if ski_3_eff then -3.0 else -2.0
            else 0

        ag =   -- 金色,加速度
             if (model.gold_angle + 2 * wg - model.pad_angle > 90 && model.gold_angle + 2 * wg - model.pad_angle < 270) || (model.gold_angle + 2 * wg - model.pad_angle < -90 && model.gold_angle + 2 * wg - model.pad_angle > -270) then model.gold_angle + wg
             else model.gold_angle

        -----* 蓝球
        next_point = if ski_4_eff && model.nextPoint == (0,0) then (1,0) else model.nextPoint

        vxb =
            if (model.attack == overAttack) then
                if (next_point == (0, 0)) || (next_point == (0, 1)) then if ski_6_eff then 2.5 else 3.5
                else if (next_point == (1, 0)) || (next_point == (1, 1))then if ski_6_eff then -2.5 else -3.5
                else model.block_vx
            else if (cHit (model.block_x + 1) (model.block_y + 1)) then
               (-1 * (model.block_x - 42)^2 * model.block_vx + (model.block_y - 30)^2 * model.block_vx - 2 * (model.block_x - 42) * (model.block_y - 30) * model.block_vy) / ((model.block_x - 42)^2 + (model.block_y - 30)^2)
            else model.block_vx

        vyb =
            if (model.attack == overAttack) then
                if (next_point == (0, 0)) || (next_point == (1, 0)) then if ski_6_eff then 1.5 else 2
                else if (next_point == (0, 1)) || (next_point == (1, 1)) then if ski_6_eff then -1.5 else -2
                else model.block_vy
            else if (cHit (model.block_x + 1) (model.block_y + 1)) then
                    (-2 * (model.block_x - 42) * (model.block_y - 30) * model.block_vx + (model.block_x - 42)^2 * model.block_vy - (model.block_y - 30)^2 * model.block_vy) / ((model.block_x - 42)^2 + (model.block_y - 30)^2)
            else model.block_vy

        xBlock =
            if (model.attack == overAttack) then
                    if (next_point == (0, 0)) || (next_point == (0, 1)) then 5 + dt * vxb
                    else if (next_point == (1, 0)) || (next_point == (1, 1)) then 80 + dt * vxb
                    else model.block_x + dt * vxb
            else model.block_x + dt * vxb

        yBlock =
            if (model.attack == overAttack) then
                    if (next_point == (0, 0)) || (next_point == (1, 0)) then 10 + dt * vyb
                    else if (next_point == (0, 1)) || (next_point == (1, 1)) then 50 + dt * vyb
                    else model.block_y + dt * vyb
            else model.block_y + dt * vyb

        ----    *那几个壳子转的速度
        wLeft =
            if model.wShell_left == 360 then if ski_8_eff then dt * 8.5 else dt * 10.0
            else  if ski_8_eff then model.wShell_left + dt * 8.5 else model.wShell_left + dt * 10.0

        wRight =
            if model.wShell_right == 360 then  if ski_8_eff then dt * 8.5 else dt * 10.0
            else if ski_8_eff then model.wShell_right + dt * 8.5 else model.wShell_right + dt * 10.0

        wUp =
            if model.wShell_up == 360 then  if ski_8_eff then dt * -(8.5) else dt * (-10.0)
            else if ski_8_eff then model.wShell_up + dt * (-8.5) else model.wShell_up + dt * (-10.0)

        wDown =
            if model.wShell_down == 360 then  if ski_8_eff then dt *(-40.0) else dt * (-50.0)
            else  if ski_8_eff then model.wShell_down + dt * (-40.0) else model.wShell_down + dt * (-50.0)


        ----- * 其他

        combo =
                if (cIsCoordinate model /= (0,0)  && (cIsHitGold model == False && cIsHitBlue model == False && cIsHitShell model == False)) then model.combo + 1
                else if (cIsHitGold model == True || cIsHitBlue model ||  cIsHitShell model == False) then 0
                else model.combo

        leaf =   --! 先把leaf变成combo
           combo

        life0 =
            if cIsHitKernel model  && cIsHitBlue model == False then if ski_10_eff && cIsHitGold model == True then model.life else model.life - 1
            else if cHitB model.ball_x model.ball_y 42 46 && cValidB model.wShell_down model.ball_x model.ball_y 42 46 == True &&  model.life < 5  then if ski_7_eff then model.life + 2 else  model.life + 1   -- 击中下面的亮球
            else model.life

        life = if ski_1_get then life0 + 1 else life0

        max_life =
            if ski_1_get then model.max_life + 1
            else model.max_life

        clover =
            let
                leftC =
                    if (model.ball_x - 10)^2 + (model.ball_y - 30)^2 <= 5^2 then True
                    else model.clover.leftClover

                rightC =
                     if (model.ball_x - 74)^2 + (model.ball_y - 30)^2 <= 5^2 then True
                     else model.clover.rightClover

                upC =
                     if (model.ball_x - 42)^2 + (model.ball_y - 14)^2 <= 5^2 then True
                     else model.clover.upClover
            in
                Clover leftC rightC upC

        se =
            if isPink == True then Fire
             else if isRed == True then Frozen
             else if isCyan == True then Ordinary
             else if cIsHitBlue model || cIsHitGold model || cIsHitShell model then Quite
             else model.se

    in
        { model |
                ball_x = xb, ball_y = yb
              , ball_vx = dxb, ball_vy = dyb
              , pad_angle = ap, pad_w = wp
              , block_vx = vxb, block_vy = vyb
              , block_x = xBlock, block_y = yBlock
              , attack = attackState
              , gold_angle = ag, gold_w = wg
              , wShell_left = wLeft
              , wShell_right = wRight
              , wShell_up = wUp
              , wShell_down = wDown
              , clover = clover
              , emptyLeaves = empty
              , cyanLeaves = cyan
              , pinkLeaves = pink
              , redLeaves = red
              , life = life
              , max_life = max_life
              , state = state
              , combo = combo
              , exp = exp
              , leaf = leaf
              , skills_ok = skills_ok
              , skills_cost = skills_cost
              , se = se
        }
