module Outlooks exposing (..)

-- This module includes some resources and some types

outBall = "assets/main/ball.png"
outBall2 = "assets/main/ball2.png"
outPaddle = "assets/main/pd.png"
outBkg = "assets/main/bkp.png"
outInterface = "assets/main/gameinter.png"
outOriginal = "assets/main/o.png"        -- 未被达到
outHit = "assets/main/n.png"            -- 已被达到
outDecrease = "assets/main/frozen.png"     -- 减速度减命,red
outIncrease = "assets/main/acceleration.png"   -- 加速度加命,pink
outAddBall = "assets/main/addBall.png"
outAddPaddle = "assets/main/addPaddle.png"
outBoss = "assets/main/boss.png"

background = "assets/main/bkp.png"
interface = "assets/main/trans.png"
ball = "assets/main/ball.png"
vkernal5 = "assets/main/stage1.png"
vkernal4 = "assets/main/stage2.png"
vkernal3 = "assets/main/stage3.png"
vkernal2 = "assets/main/stage4.png"
vkernal1 = "assets/main/stage5.png"
vkernal0 = "assets/main/gameover.png"
pad = "assets/main/bendpaddle.png"
gold = "assets/main/shootpaddle.png"
attacker = "assets/main/attack.png"
downleft = "assets/main/downleft.png"
downright = "assets/main/downright.png"
upleft = "assets/main/upleft.png"
upright = "assets/main/upright.png"
circular = "assets/main/circular.png"
circular45 = "assets/main/diamond45.png"
vkf = "assets/main/vkernelfrag.png"
bright = "assets/main/brighten.png"
leaf = "assets/main/brick.png"







trait1 = "assets/skills/Trait_charismatic.png"
trait2 = "assets/skills/Trait_cybernetic.png"
trait3 = "assets/skills/Trait_very_cybernetic.png"
trait4 = "assets/skills/Trait_erudite.png"
trait5 = "assets/skills/Trait_psionic.png"
trait6 = "assets/skills/Trait_strong.png"
trait7 = "assets/skills/Trait_very_strong.png"
trait8 = "assets/skills/Trait_enduring.png"
trait9 = "assets/skills/Trait_very_enduring.png"
trait10 = "assets/skills/Trait_intelligent.png"
trait11 = "assets/skills/Trait_very_intelligent.png"
trait12 = "assets/skills/Trait_boss.png"
trait13 = "assets/skills/Trait_rapid_speed.png"



type Brick   --* 放在update或model中会导致import cycle!!
    = Blue    -- 不使用Blue
    | Cyan
    | Pink
    | Red

type Music
    = Null
    | TheOasis
    | ReturnOfAncients
    | InSearchOfLife
    | TheChordOfSpring

type SE
    = Quite
    | Frozen
    | Fire
    | Ordinary

type Difficulty
    = Normal
    | Hard
    | Nightmare