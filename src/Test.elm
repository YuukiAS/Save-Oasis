module Test exposing (..)
import Dashboard exposing (..)
import Svg exposing (..)
import Svg.Attributes exposing (..)
import Model exposing (..)
import Html exposing (div, h2, h3, h4, img)
import Html.Attributes exposing (src, style)
import Ionicon
import Color exposing (..)
import Outlooks exposing (trait1)
-- This module is used for test
main =
    let
            life = div[][Ionicon.heart 20 red]
            star = div[][Ionicon.star 20 yellow]
            leaf = div[][Ionicon.leaf 20 green]
            clock = div[][Ionicon.clock 20 deep_grey]
            max_life = 2
            exp = 1
            lef = 1
            out_minute = String.fromInt 2
            out_second = String.fromInt 2
    in
        div[]
        [
            svg[viewBox "0 0 400 400" ]
            [
            text_[fill "black",fontSize "5"][tspan[x "10%", y "25%"][text "First line"],tspan[x "20%", y "35%"][text "Second line"]]
            ,image[x "5%", y"5%",width "5%", height"20%",xlinkHref trait1][],
            svg[x "15%", y"15%"][Ionicon.heart 20 red]
            ]
        ]
        {-div
        [
            Html.Attributes.style "padding-bottom" "50%"
            , Html.Attributes.style "margin-top" "2%"
            , Html.Attributes.style "position" "relative"
            , Html.Attributes.style "left" "80%"
        ]
        [
            life
            , h4[][text ("Life remaining:" ++ "/" ++ String.fromInt max_life)]
            , star
            , h4[][text ("Exp: "++String.fromInt exp)]
            , leaf
            , if lef /= 1 then h4[][text (String.fromInt lef ++ "lines cleared")] else h4[][text (String.fromInt lef ++ "line cleared")]
            , clock
            , h4[][ text ("Time Played" ++ ":" ++ (out_minute) ++ ":" ++ out_second)]
            , img [src trait1][]
        ]-}