module View exposing (..)
import Playground exposing (..)
import Object
view computer pb =
    let
        top = computer.screen.top
        bot = computer.screen.bottom
        lef = computer.screen.left
        rig = computer.screen.right
    in

        [
            rectangle (rgb 255 255 255) (rig-lef-300) (top-bot-300)  -- the area
        ,   rectangle (rgb 95 39 205) (rig-lef-310) 10
            |> moveUp (bot+10)
        ,   rectangle (rgb 95 39 205) (rig-lef-310) 10
            |> moveUp (top-80)
        ,   rectangle (rgb 95 39 205)  10 (top-bot-80)
            |> moveLeft ((rig-lef-314)/2)
            |> moveUp ((bot+top-70)/2)
        ,   rectangle (rgb 95 39 205)  10 (top-bot-80)
            |> moveRight ((rig-lef-314)/2)
            |> moveUp ((bot+top-70)/2)
        ,   Object.paddle
            |> moveUp (bot+50)
        ,   Object.ball
            |> moveUp (bot+75)
        ,   circle red 5      -- 原点,参考用
        ,   words yellow "620,300"
            |> moveRight 620
            |> moveUp 300
        ,   words yellow "-615,-370"
            |> moveLeft 615
            |> moveDown 370
            ------------------------------ Bricks
        ,   Object.grid
            |> moveLeft 561
            |> moveUp 276
        ,   Object.grid
            |> moveLeft 561
            |> moveUp 234
        ,   Object.grid
            |> moveLeft 561
            |> moveUp 192
        ,   Object.grid
            |> moveLeft 561
            |> moveUp 150
        ,   Object.grid
            |> moveLeft 561
            |> moveUp 108
        ]