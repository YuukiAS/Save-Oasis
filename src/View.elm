module View exposing (..)
import Playground exposing (..)
import Object

type alias Axis =
    {
        top : Float
        ,bot : Float
        ,lef : Float
        ,rig : Float
    }


view computer memory =
    let
        axis: Axis         --* 对type alias的赋值方法
        axis = Axis computer.screen.top computer.screen.bottom computer.screen.left computer.screen.right
    in
    [
        draw axis
    ]


draw: Axis -> Shape
draw axis=
     let
        top = axis.top
        bot = axis.bot
        rig = axis.rig
        lef = axis.lef
        back_width = rig - lef
        back_height = top - bot

        pillar  = 3 -- 边框粗度
        ratio = 1.85
        pillar_width = 0.001*back_width*back_height    -- 边框宽度
        pillar_height = pillar_width/ratio   -- 边框长度
        brick_width = pillar_width*0.082
        brick_height = pillar_width*0.035
     in
        group
        [
         ------------------------------ Bricks
            rectangle (rgb 255 255 255) back_width back_height
        ,   rectangle (rgb 95 39 205) pillar_width pillar
            |> moveDown (pillar_height*0.55)
        ,   rectangle (rgb 95 39 205) pillar_width pillar
            |> moveUp (pillar_height*0.45)
        ,   rectangle (rgb 95 39 205)  pillar  (pillar_height*1.002)  -- 微调,影响不大
            |> moveDown (pillar_height*0.05)
            |> moveLeft (pillar_width/2)
        ,   rectangle (rgb 95 39 205)  pillar  (pillar_height*1.002)
            |> moveDown (pillar_height*0.05)
            |> moveRight (pillar_width/2)
        ,   words blue "Origin"    -- 原点
        ------------------------------ Others
        ,   Object.ball (pillar_width*0.01)
            |> moveDown (pillar_height*0.45)
        ,   Object.paddle (pillar_width*0.12) (pillar_width*0.01)
            |> moveDown (pillar_height*0.5)
        ,   Object.grid brick_width brick_height (pillar_width*0.0832)
            |> moveLeft (pillar_width*0.4575)
            |> moveUp (pillar_height*0.415)
        ,   Object.grid brick_width brick_height (pillar_width*0.0832)
            |> moveLeft (pillar_width*0.4575)
            |> moveUp (pillar_height*0.415- brick_height*1.02)
        ,   Object.grid brick_width brick_height (pillar_width*0.0832)
            |> moveLeft (pillar_width*0.4575)
            |> moveUp (pillar_height*0.415- brick_height*2.04)
        ,   Object.grid brick_width brick_height (pillar_width*0.0832)
            |> moveLeft (pillar_width*0.4575)
            |> moveUp (pillar_height*0.415- brick_height*3.06)
         ,   Object.grid brick_width brick_height (pillar_width*0.0832)
            |> moveLeft (pillar_width*0.4575)
            |> moveUp (pillar_height*0.415- brick_height*4.08)
        ]


