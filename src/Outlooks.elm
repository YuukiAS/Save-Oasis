module Outlooks exposing (..)

outBall = "src/assets/main/ball.png"
outBall2 = "src/assets/main/ball2.png"
outPaddle = "src/assets/main/pd.png"
outBkg = "src/assets/main/bkp.png"
outInterface = "src/assets/main/gameinter.png"
outOriginal = "src/assets/main/o.png"        -- 未被达到
outHit = "src/assets/main/n.png"            -- 已被达到
outDecrease = "src/assets/main/frozen.png"     -- 减速度减命,red
outIncrease = "src/assets/main/acceleration.png"   -- 加速度加命,pink
outAddBall = "src/assets/main/addBall.png"
outAddPaddle = "src/assets/main/addPaddle.png"
outBoss = "src/assets/main/boss.png"

trait1 = "src/assets/skills/Trait_charismatic.png"
trait2 = "src/assets/skills/Trait_cybernetic.png"
trait3 = "src/assets/skills/Trait_very_cybernetic.png"
trait4 = "src/assets/skills/Trait_erudite.png"
trait5 = "src/assets/skills/Trait_psionic.png"
trait6 = "src/assets/skills/Trait_strong.png"
trait7 = "src/assets/skills/Trait_very_strong.png"
trait8 = "src/assets/skills/Trait_enduring.png"
trait9 = "src/assets/skills/Trait_very_enduring.png"
trait10 = "src/assets/skills/Trait_intelligent.png"
trait11 = "src/assets/skills/Trait_very_intelligent.png"
trait12 = "src/assets/skills/Trait_boss.png"
trait13 = "src/assets/skills/Trait_rapid_speed.png"



type Brick   --* 放在update或model中会导致import cycle!!
    = Blue    -- 不使用Blue
    | Cyan
    | Pink
    | Red
    | APaddle
    | ABall
    | Boss

