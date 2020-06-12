module Color exposing (red,yellow,orange,green,grey,deep_grey)
import Html exposing (Html, div)
import Ionicon

-- Define your colors

red : RGBA
red = RGBA (255/255) (107/255) (107/255) 1

orange : RGBA
orange = RGBA (255/255) (159/255) (67/255) 1

yellow : RGBA
yellow = RGBA (254/255) (202/255) (87/255) 1

green : RGBA
green = RGBA (29/255) (209/255) (161/255) 1

deep_grey : RGBA
deep_grey = RGBA (87/255) (101/255) (116/255) 1

grey : RGBA
grey =  RGBA (200/255) (214/255) (229/255) 1

type alias RGBA =
    { red : Float
    , green : Float
    , blue : Float
    , alpha : Float
    }