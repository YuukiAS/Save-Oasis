module Outlooks exposing (..)

outBall = "src/materials/ball.png"
outPaddle = "src/materials/pd.png"
outBkg = "src/materials/bkp.png"
outInterface = "src/materials/gameinter.png"
outOriginal = "src/materials/o.png"        -- 未被达到
outHit = "src/materials/n.png"            -- 已被达到
outDecrease = "src/materials/frozen.png"     -- 减速度减命,red
outIncrease = "src/materials/acceleration.png"   -- 加速度加命,pink

trait1 = "src/materials/skills/Trait_charismatic.png"  -- 定时回血
trait2 = "src/materials/skills/Trait_cybernetic.png"   -- 减速
trait3 = "src/materials/skills/Trait_very_cybernetic.png" -- 超级减速
trait4 = "src/materials/skills/Trait_erudite.png" -- 降低其他技能花费
trait5 = "src/materials/skills/Trait_psionic.png" -- 直接消失随机方块
trait6 = "src/materials/skills/Trait_strong.png"   -- 一段时间内不掉血
trait7 = "src/materials/skills/Trait_very_strong.png"   -- 更长时间内不掉血
trait8 = "src/materials/skills/Trait_enduring.png"    -- 生命值上限加一
trait9 = "src/materials/skills/Trait_very_enduring.png" -- 生命值上限加二
trait10 = "src/materials/skills/Trait_intelligent.png" -- 经验值获得增加
trait11 = "src/materials/skills/Trait_very_intelligent.png" -- 经验值进一步获得增加


type Brick   --* 放在update或model中会导致import cycle!!
    = Blue    -- 不使用Blue
    | Cyan
    | Pink
    | Red