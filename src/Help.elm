module Help exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Browser
import Json.Decode as Json
import Markdown
import Ionicon exposing (home)
import Color exposing (grey)


type Music
    = Null
    | TheOasis
    | ReturnOfAncients

type Msg
    = ChangeMusic Music

type alias Model = Music

main =
      Browser.sandbox { init = init, update = update, view = view }

init: Model
init = Null


view: Model->Html Msg
view model =
    div[]
    [
      renderInfo,
      renderMusic model,
      renderButton1,
      renderButton2,
      renderHome
    ]




update : Msg  -> Model-> Model
update msg model =
    case msg of
        ChangeMusic music -> music



renderInfo :  Html Msg
renderInfo  =
    div
        [
          style "background" "rgba(236, 240, 241, 0.85)"
        , style "color" "#090004"
        , style "height" "300px"
        , style "left" "400px"
        , style "top" "100px"
        , style "position" "absolute"
        ]
        [ Markdown.toHtml [] """
        # This is the page of help.

        ## Background
        This is the background.

        ## How to play the game
        The method to play the game.

        ## The status
        Status includes life, exp, leaf, and so on

        ## The skills
        There are more than 10 skills for you to choose. Of course, you must pay some price for them!

        ## About the game
        This game is powered by **Team Clover**!

        """
        ]

renderButton1 : Html Msg
renderButton1 =
        button
        [  style "background" "#f8f4f4"
        , style "color" "#25a194"
        , style "display" "block"
        , style "height" "600x"
        , style "left" "430px"
        , style "top" "630px"
        , style "width" "200px"
        , style "position" "absolute"
        , onClick (ChangeMusic TheOasis)
        ]
        [ text "Try \"The Oasis\"!" ]
renderButton2 : Html Msg
renderButton2 =
        button
        [   style "background" "#f8f4f4"
          , style "color" "#25a194"
          , style "display" "block"
          , style "height" "600x"
          , style "left" "830px"
          , style "top" "630px"
          , style "width" "200px"
          , style "position" "absolute"
        , onClick (ChangeMusic ReturnOfAncients)
        ]
        [ text "Try \"Return of Ancients\"!" ]

renderMusic : Model ->Html Msg
renderMusic model =
    let
        music =
            case model of
                Null -> ""
                ReturnOfAncients -> "src/assets/musics/Return of Ancients.mp3"
                TheOasis -> "src/assets/musics/The Oasis.mp3"
    in
        div[
          style "top" "430px"
        , style "left" "530px"
        , style "position" "absolute"]
        [audio
            [ src music
            , controls True
            ] []
         ]

renderHome : Html Msg
renderHome =
    div
    [
     style "top" "30px"
   , style "left" "30px"
   , style "position" "absolute"
   ]
    [a [ href "/VG100_Project1/home.html" ] [div[][home 50 grey]]]
