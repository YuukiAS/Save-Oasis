module Update exposing (..)
import Model exposing (Model)
import Message
import Playground exposing (..)


update: Message.Msg -> Model -> (Model, Cmd msg)
update msg model =
    (model, Cmd.none)
