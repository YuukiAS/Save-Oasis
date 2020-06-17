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
    | InSearchOfLife
    | TheChordOfSpring

type Difficulty
    = Normal
    | Hard
    | Nightmare

type Msg
    = ChangeMusic Music
    | ChangeDifficulty Difficulty

type alias Model =
    {
        music :Music,
        difficulty: Difficulty
    }

main =
      Browser.sandbox { init = init, update = update, view = view }

init: Model
init =
    {
        music = Null,
        difficulty = Normal
    }

view: Model->Html Msg
view model =
    div[]
    [
      renderInfo,
      renderMusic model,
      renderButton1,
      renderButton2,
      renderButton3,
      renderButton4,
      renderDifficulty1,
      renderDifficulty2,
      renderDifficulty3,
      renderHome
    ]




update : Msg  -> Model-> Model
update msg model =
    case msg of
        ChangeMusic music -> {model|music = music}
        ChangeDifficulty difficulty -> {model|difficulty = difficulty}



renderInfo :  Html Msg
renderInfo  =
    div
        [
          style "background" "rgba(236, 240, 241, 0.85)"
        , style "color" "#090004"
        , style "height" "300px"
        , style "left" "200px"
        , style "top" "100px"
        , style "position" "absolute"
        , style "width" "1000px"
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
        [ text "Try \"The Oasis\"! (From movie \"Ready Player One\")" ]
renderButton2 : Html Msg
renderButton2 =
        button
        [   style "background" "#f8f4f4"
          , style "color" "#25a194"
          , style "display" "block"
          , style "height" "600x"
          , style "left" "630px"
          , style "top" "630px"
          , style "width" "200px"
          , style "position" "absolute"
        , onClick (ChangeMusic ReturnOfAncients)
        ]
        [ text "Try \"Return of Ancients\"! (From game \"WarcraftIII\")" ]

renderButton3 : Html Msg
renderButton3 =
        button
        [   style "background" "#f8f4f4"
          , style "color" "#25a194"
          , style "display" "block"
          , style "height" "600x"
          , style "left" "830px"
          , style "top" "630px"
          , style "width" "200px"
          , style "position" "absolute"
        , onClick (ChangeMusic InSearchOfLife)
        ]
        [ text "Try \"In Search of Life\"! (From game \"Stellaris\")" ]

renderButton4 : Html Msg
renderButton4 =
        button
        [   style "background" "#f8f4f4"
          , style "color" "#25a194"
          , style "display" "block"
          , style "height" "600x"
          , style "left" "1030px"
          , style "top" "630px"
          , style "width" "200px"
          , style "position" "absolute"
        , onClick (ChangeMusic TheChordOfSpring)
        ]
        [ text "Try \"The Chord of Spring\"! (From game \"Arknights\")" ]

renderDifficulty1 : Html Msg
renderDifficulty1 =
        button
        [   style "background" "#f8f4f4"
          , style "color" "#2fa11a"
          , style "display" "block"
          , style "height" "600x"
          , style "left" "500px"
          , style "top" "730px"
          , style "width" "200px"
          , style "position" "absolute"
          , onClick (ChangeDifficulty Normal)
          , title "A wise choice."
        ]
        [ text "Try \"The Chord of Spring\"! (From game \"Arknights\")" ]
renderDifficulty2 : Html Msg
renderDifficulty2 =
        button
        [   style "background" "#f8f4f4"
          , style "color" "#a19e32"
          , style "display" "block"
          , style "height" "600x"
          , style "left" "700px"
          , style "top" "730px"
          , style "width" "200px"
          , style "position" "absolute"
          , onClick (ChangeDifficulty Hard)
          , title "Emm."
        ]
        [ text "Try \"The Chord of Spring\"! (From game \"Arknights\")" ]
renderDifficulty3 : Html Msg
renderDifficulty3 =
        button
        [   style "background" "#f8f4f4"
          , style "color" "#a12b19"
          , style "display" "block"
          , style "height" "600x"
          , style "left" "900px"
          , style "top" "730px"
          , style "width" "200px"
          , style "position" "absolute"
          , onClick (ChangeDifficulty Nightmare)
          , title "Do'nt try it."
        ]
        [ text "Try \"The Chord of Spring\"! (From game \"Arknights\")" ]



renderMusic : Model ->Html Msg
renderMusic model =
    let
        music =
            case model.music of
                Null -> ""
                ReturnOfAncients -> "assets/musics/Return of Ancients.mp3"
                TheOasis -> "assets/musics/The Oasis.mp3"
                TheChordOfSpring -> "assets/musics/The Chord of Spring.mp3"
                InSearchOfLife ->"assets/musics/In Search of Life.mp3"
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
   , title "Is everything OK?"
   ]
    [a [ href "home.html" ] [div[][home 50 grey]]]
