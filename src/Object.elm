module Object exposing (..)

import Svg exposing (svg,rect,circle,line)
import Svg.Attributes exposing (..)
import Html exposing (..)
import Html.Attributes as HtmlAt exposing (style)   --* import!
import Model exposing (..)
import Message exposing (..)
import Color exposing (..)
import List.Extra exposing (interweave)



--* 多加一个方括号即从Svg msg变为Html msg
renderPillar: Point->Point->Html Msg
renderPillar pointA pointB =
     line [x1 ((String.fromFloat pointA.x)++"%"), y1 ((String.fromFloat pointA.y)++"%"), x2 ((String.fromFloat pointB.x)++"%"),y2((String.fromFloat pointB.y)++"%"), stroke cus_purple,strokeWidth "0.1%"][]

renderBall: Point->Html Msg
renderBall point =
   circle [ cx ((String.fromFloat point.x)++"%"), cy ((String.fromFloat point.y)++"%"), r "1%", fill cus_yellow ] []   -- c is the center point

renderPaddle: Point->Float->Float->Html Msg
renderPaddle point wid hei=
    rect [x ((String.fromFloat point.x)++"%"), y ((String.fromFloat point.y)++"%"), width ((String.fromFloat wid)++"%"), height ((String.fromFloat hei)++"%"), fill cus_orange][]

renderBrick: Point->Float->Float->String->Html Msg
renderBrick point wid hei color=
    rect [x ((String.fromFloat point.x)++"%"), y ((String.fromFloat point.y)++"%"), width ((String.fromFloat wid)++"%"), height ((String.fromFloat hei)++"%"), fill color][]

renderBrick1 point wid hei = renderBrick point wid hei cus_blue
renderBrick2 point wid hei = renderBrick point wid hei cus_cyan --加速*1.1
renderBrick3 point wid hei = renderBrick point wid hei cus_pink  -- 加血,但是加速*1.5
renderBrick4 point wid hei = renderBrick point wid hei cus_red -- 掉血,但是减速*0.8

renderGrid: Point->Float->Float-> List(Html Msg)
renderGrid point wid hei=
    [
        renderBrick1 point wid hei
    ,   renderBrick1 (Point (point.x+wid+0.175) point.y) wid hei
    ,   renderBrick1 (Point (point.x+(wid+0.175)*2) point.y) wid hei
    ,   renderBrick1 (Point (point.x+(wid+0.175)*3) point.y) wid hei
    ,   renderBrick1 (Point (point.x+(wid+0.175)*4) point.y) wid hei
    ,   renderBrick1 (Point (point.x+(wid+0.175)*5) point.y) wid hei
    ,   renderBrick1 (Point (point.x+(wid+0.175)*6) point.y) wid hei
    ,   renderBrick1 (Point (point.x+(wid+0.175)*7) point.y) wid hei
    ,   renderBrick1 (Point (point.x+(wid+0.175)*8) point.y) wid hei
    ,   renderBrick1 (Point (point.x+(wid+0.175)*9) point.y) wid hei
    ,   renderBrick1 (Point (point.x+(wid+0.175)*10) point.y) wid hei
    ,   renderBrick1 (Point (point.x+(wid+0.175)*11) point.y) wid hei
    ]


renderTotalGrid : Point->Float->Float->Int->List (Html Msg)   -- 得到n行Grid
renderTotalGrid point wid hei num =
    if num > 0 then        -- case of 后不需重复变量
            interweave (renderGrid point wid hei) (renderTotalGrid (Point point.x (point.y+hei+0.175)) wid hei (num- 1))
    else
        []


