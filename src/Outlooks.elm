module Outlooks exposing (..)

-- This module includes some resources and some types


background = "assets/main/saveOasis.png"
interface = "assets/main/trans.png"
ball = "assets/main/ball.png"
vKernel5 = "assets/main/stage1.png"
vKernel4 = "assets/main/stage2.png"
vKernel3 = "assets/main/stage3.png"
vKernel2 = "assets/main/stage4.png"
vKernel1 = "assets/main/stage5.png"
vKernel0 = "assets/main/stage0.png"
pad = "assets/main/bendpaddle.png"
gold = "assets/main/shootpaddle.png"
attacker = "assets/main/attack.png"   -- 前来攻击的球
downleft = "assets/main/downleft.png"  -- 这四个是四周发射的
downright = "assets/main/downright.png"
upleft = "assets/main/upleft.png"
upright = "assets/main/upright.png"
circular = "assets/main/circular.png"
vkf = "assets/main/clover.png"   -- 三叶草
bright = "assets/main/brighten.png"
brighter = "assets/main/brighterer.png"
nor_leaf = "assets/main/bricks/normal.png" -- leaf是brick
nor_leaf_2 = "assets/main/bricks/normal2.png"
inc_leaf = "assets/main/bricks/increasing.png"
dec_leaf = "assets/main/bricks/decreasing.png"

---用于dashboard
cloverC = "assets/main/clover/core.png" -- Core
cloverL = "assets/main/clover/left.png"
cloverR = "assets/main/clover/right.png"
cloverU = "assets/main/clover/up.png"
forclover = "assets/main/clover/forclover.png"


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

page1 = "assets/booklet/1.jpg"
page2 = "assets/booklet/2.jpg"
page3 = "assets/booklet/3.jpg"
page4 = "assets/booklet/4.jpg"
page5 = "assets/booklet/5.jpg"
page6 = "assets/booklet/6.jpg"
page7 = "assets/booklet/7.jpg"
page8 = "assets/booklet/8.jpg"
page9 = "assets/booklet/9.jpg"
page10 = "assets/booklet/10.jpg"
page11 = "assets/booklet/11.jpg"




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


type Page
    = Previousone
    | Nextone
    | Initi

--
viewbackground = "assets/views/viewbkg.png"