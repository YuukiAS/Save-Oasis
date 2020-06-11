module Outlooks exposing (..)

outBall = "src/materials/ball.png"
outPaddle = "src/materials/pd.png"
outBkg = "src/materials/bkp.png"
outInterface = "src/materials/gameinter.png"
outOriginal = "src/materials/o.png"        -- 未被达到
outHit = "src/materials/n.png"            -- 已被达到
outDecrease = "src/materials/frozen.png"     -- 减速度减命,red
outIncrease = "src/materials/acceleration.png"   -- 加速度加命,pink



type Brick   --* 放在update或model中会导致import cycle!!
    = Blue    -- 不使用Blue
    | Cyan
    | Pink
    | Red