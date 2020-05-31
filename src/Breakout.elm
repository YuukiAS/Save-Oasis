module Breakout exposing (main)
----------------------- From Internet
import Html exposing (..)
import Playground exposing (..)
import Ionicon exposing (..) -- some svg icons, may be helpful later
----------------------- From src
import Object
import View
import Update
import Model

-- pb -> paddle + ball
main =
  game View.view Update.update Model.initial
  {--
        pad_x = 0
      , pad_y = 0
      , pad_vx = 0  -- 加速度
      , ball_x = 0
      , ball_y = 0
      , ball_vx = 0
      , ball_vy = 0
  --}




