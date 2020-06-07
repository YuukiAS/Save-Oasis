module Update exposing (..)
import Model exposing (..)
import Message exposing (..)
import Check exposing (..)
import Calculate exposing (..)


r = 1


update: Message.Msg -> Model -> (Model, Cmd msg)
update msg model =
    case msg of
        KeyChanged isDown key ->
            ({ model | keys = updateKeys isDown key model.keys }, Cmd.none)

        TimeDelta dt ->                          --* 暂时假设dt为0.1
            (updateTime model 0.1, Cmd.none)

        _ ->
            (model, Cmd.none)

updateKeys : Bool -> String -> Keys -> Keys
updateKeys isDown key keys =
    case key of
        "ArrowLeft" -> { keys | left  = isDown }
        "ArrowRight" -> { keys | right = isDown }
        "Enter" -> { keys | enter = isDown }
        _ -> keys

updateTime: Model -> Float -> Model
updateTime model dt =

    let
        empty =
            if cGameOver model then []
            else if cUpBricks model then
                if List.member (upCoordinate model) model.cyanBricks
                    then List.append model.emptyBricks [upCoordinate model]
                else model.emptyBricks
            else if cLeftBricks model then
                if List.member (leftCoordinate model) model.cyanBricks
                    then List.append model.emptyBricks [leftCoordinate model]
                else model.emptyBricks
            else if cRightBricks model then
                if List.member (rightCoordinate model) model.cyanBricks
                    then List.append model.emptyBricks [rightCoordinate model]
                else model.emptyBricks
            else model.emptyBricks



        cyan =
            if cGameOver model then []
            else if cUpBricks model then
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

        --ball
        dxb =
            if cGameOver model then 0

            else if (cLeftBricks model || cLeftPillar model || cRightBricks model || cRightPillar model)
            then -1 * model.ball_vx

            else if cDownPaddle model
            then model.ball_vx + 0.1 * model.pad_vx

            else model.ball_vx

        dyb =
            if cGameOver model then 0

            else if ( cUpBricks model || cUpPillar model || cDownPaddle model )
            then (-1 * model.ball_vy)

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
        }
