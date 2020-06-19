module Help exposing (..)
import Html exposing (..)
import Html.Attributes exposing (controls, src, style, title,href)
import Html.Events exposing (onClick)
import Browser
import Json.Decode as Json
import Markdown
import Ionicon exposing (home)
import Color exposing (grey)
import Message exposing (Msg(..))
import Object exposing (renderBooklet, renderInterface)
import Outlooks exposing (..)
import Model exposing (..)
import Svg exposing (image, svg)
import Svg.Attributes exposing (viewBox)


{-main =
      Browser.sandbox { init = init, update = update, view = view }-}


view: Model-> List (Html Msg)
view model =
    [
      renderNiceOutlook model,
      renderInfo,
      renderMusic model,
      renderButton1,
      renderButton2,
      renderButton3,
      renderButton4,
      renderDifficulty1,
      renderDifficulty2,
      renderDifficulty3,
      renderHome,
      renderDifficulty model,
      renderButtonLeft,
      renderButtonRight,
      a[href "https://github.com/YuukiAS/VG100_Project1"][text "Go to instructions"]
    ]


renderNiceOutlook : Model -> Html Msg
renderNiceOutlook model =
    div [ style "backgroundColor" "#1d1d1d"]
                        [svg
                        [ viewBox "0 0 400 400" ][
                        renderBooklet (Point 0 0) 100 65 model.showingpage
                        ]]


renderInfo :  Html Msg
renderInfo  =
    div
        [
          style "background" "#1d1d1d"
        , style "color" "#ffffff"
        , style "height" "300px"
        , style "left" "200px"
        , style "top" "100px"
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
        Skill1: You will gain 1 life and 1 max_life; Skill2: The speed of ball will be half immediately; Skill3: Your paddle will move faster;
        Skill4: The cost of all skills - 10; Skills5: The gain of exp will be faster; Skills6: You will not lose life when being frozen;
        Skill7: You will periodically gain some life(depending on the current one); Skill8: The acceleration of ball will be slower; Skill9: Some bricks will disappear randomly.
        Skill10: You can get the kernel by one hit!

        ## About the game
        This game is powered by **Team Clover**!

        """
        ]

renderButtonLeft: Html Msg
renderButtonLeft =
    button
    [  style "background" "#f8f4f4"
    , style "color" "#25a194"
    , style "display" "block"
    , style "height" "600x"
    , style "left" "430px"
    , style "top" "630px"
    , style "width" "200px"
    , onClick (Alterpage Previousone)
    ]
    [ text "Previous Page"]

renderButtonRight: Html Msg
renderButtonRight =
    button
        [ style "background" "#f8f4f4"
        , style "color" "#25a194"
        , style "display" "block"
        , style "height" "600x"
        , style "left" "430px"
        , style "top" "630px"
        , style "width" "200px"
        , onClick (Alterpage Nextone)
        ]
        [ text "Next Page" ]




previousOne : Model -> List String -> Maybe String
previousOne model bookletL =
    if Maybe.withDefault "a"(List.head (List.drop 1 bookletL)) == model.showingpage then List.head bookletL
    else previousOne model (List.drop 1 bookletL)

nextOne : Model -> List String -> Maybe String
nextOne model bookletL =
    if Maybe.withDefault "a"(List.head (List.drop 1 (List.reverse bookletL))) == model.showingpage then List.head (List.reverse bookletL)
    else nextOne model (List.reverse(List.drop 1 (List.reverse bookletL)))

bookletList : List String
bookletList = [page1, page2, page3, page4, page5, page6, page7, page8, page9, page10, page11]




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
          , onClick (ChangeMusic TheChordOfSpring)
          --, onClick GoHome
        ]
        [ text "Try \"The Chord of Spring\"! (From game \"Arknights\")" ]

renderDifficulty : Model -> Html Msg
renderDifficulty model =
    let
        content =
            case model.difficulty of
                Normal -> "Normal"
                Hard -> "Hard"
                Nightmare -> "Nightmare"
    in
    div[
        style "left" "500px"
      , style "top" "600px"
      ]
      [text ("Current Difficulty: " ++content)]

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
          , onClick (ChangeDifficulty Normal)
          , title "A wise choice."
        ]
        [ text "Normal" ]
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
          , onClick (ChangeDifficulty Hard)
          , title "Emm."
        ]
        [ text "Hard" ]

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
          , onClick (ChangeDifficulty Nightmare)
          , title "Do not try it."
        ]
        [ text "Nightmare" ]



renderMusic : Model -> Html Msg
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
        , style "left" "530px"]
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
   , title "Is everything OK?"
   , onClick GoHome
   ]
    [div[][home 50 grey]]
