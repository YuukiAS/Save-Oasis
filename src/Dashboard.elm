module Dashboard exposing (..)
import Svg exposing (image, rect,svg,tspan,text_)
import Svg.Attributes exposing (x,y,width,height,fill,fontSize,xlinkHref,opacity)
import Html exposing (..)
import Html.Attributes exposing (src, style)
import Model exposing (..)
import Color exposing (..)
import Message exposing (..)
import Outlooks exposing (..)
import List.Extra exposing (interweave)
import Ionicon exposing (clock,lightbulb,heart,leaf,star,volumeMute,volumeMedium,refresh,pause) -- some svg icons, may be helpful later


renderDashboard: Point -> Float -> Float -> Html msg
renderDashboard point wid hei =
   rect [x ((String.fromFloat point.x)++"%"), y ((String.fromFloat point.y)++"%"), width ((String.fromFloat wid)++"%"), height ((String.fromFloat hei)++"%") ,fill "white",opacity "0.5"][]



renderStatus : Model -> List(Html Msg)
renderStatus model =
     let
            life = svg[x "40%", y"1%"][Ionicon.heart 7 red]
            star = svg[x "40%", y"4%"][Ionicon.star 7 yellow]
            leaf = svg[x "48%", y"1%"][Ionicon.leaf 7 green]
            clock = svg[x "48%", y"4%"][Ionicon.clock 7 deep_grey]
            out_minute = String.fromInt (model.minute)
            out_second = String.fromInt (model.second)
     in
        [
             life
            ,text_[x "42%", y"2.5%",fill "black",fontSize "4"][text  ("Life: "++ String.fromInt model.life ++ "/" ++ String.fromInt model.max_life)]
            ,star
            ,text_[x "42%", y"5.5%",fill "black",fontSize "4"][text ("Exp: "++String.fromInt model.exp)]
            ,leaf
            ,if model.leaf /= 1 then text_[x "50%", y"2.5%",fill "black",fontSize "4"][text (String.fromInt model.leaf ++ " Lines cleared")] else text_[x "50%", y"2.5%",fill "black",fontSize "4"][text (String.fromInt model.leaf ++ " Line cleared")]
            ,clock
            ,text_[x "50%", y"5.5%",fill "black",fontSize "4"][ text ("Time Played" ++ ":" ++ (out_minute) ++ ":" ++ out_second)]
        ]


renderSettings : List(Html Msg)
renderSettings =
    let
         volumeOn = svg[x "59%", y"0.8%"][Ionicon.volumeMedium 7 grey]  --todo onclick
         volumeOff = svg[x "59%", y"0.8%"][Ionicon.volumeMute 7 grey]
         pause = svg[x "59%", y"2.8%"][Ionicon.pause 7 grey]
         refresh = svg[x "59%", y"4.8%"][Ionicon.refresh 7 grey]
    in
            [
                 volumeOn
                ,pause
                ,refresh
            ]


renderSkills : Model -> Float -> List(Html Msg)
renderSkills model wid=
    let
        t1 = image[x "5%", y"5%",width "5%", height"20%",xlinkHref trait1][]
        t2 = image[x "5%", y"5%",width "5%", height"20%",xlinkHref trait2][]
        t3 = image[x "5%", y"5%",width "5%", height"20%",xlinkHref trait3][]
        t4 = image[x "5%", y"5%",width "5%", height"20%",xlinkHref trait4][]
        t5 = image[x "5%", y"5%",width "5%", height"20%",xlinkHref trait5][]
        t6 = image[x "5%", y"5%",width "5%", height"20%",xlinkHref trait6][]
        t7 = image[x "5%", y"5%",width "5%", height"20%",xlinkHref trait7][]
        t8 = image[x "5%", y"5%",width "5%", height"20%",xlinkHref trait8][]
        t9 = image[x "5%", y"5%",width "5%", height"20%",xlinkHref trait9][]
        t10 = image[x "5%", y"5%",width "5%", height"20%",xlinkHref trait10][]
        t11 = image[x "5%", y"5%",width "5%", height"20%",xlinkHref trait11][]
    in
         [
            t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,t11
         ]