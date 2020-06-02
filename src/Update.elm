module Update exposing (..)
import Model exposing (Model,Keys)
import Message exposing (..)
import Playground exposing (..)


update: Message.Msg -> Model -> (Model, Cmd msg)
update msg model =
    case msg of
        KeyChanged isDown key ->
            ({model| keys = updateKeys isDown key model.keys }  ,Cmd.none)
        TimeDelta dt ->                          --* 暂时假设dt为0.1
            (updateVelocity model 0.1,Cmd.none)
        _ ->
            (model, Cmd.none)

updateKeys : Bool->String->Keys->Keys
updateKeys isDown key keys=
    case key of
        "ArrowLeft" -> { keys | left  = isDown }
        "ArrowRight" -> { keys | right = isDown }
        _ -> keys

updateVelocity: Model->Float->Model
updateVelocity model dt=
    let
        dx =
            if model.keys.left then
                -5.0
            else if model.keys.right then
                5.0
            else
                0.0
        x =
            if model.pad_x + dt*dx > 78 then 78  -- 90-12
            else if model.pad_x + dt*dx < 10 then 10
            else model.pad_x + dt*dx

    in
        {model | pad_x = x, pad_vx = dx}      --todo pad_vx有用吗



