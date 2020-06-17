module Main exposing (..)
import Html exposing (Html)
import Browser
import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes exposing (..)
import Url



-- MAIN


main : Program () Model Msg
main =
  Browser.application
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    , onUrlChange = UrlChanged
    , onUrlRequest = LinkClicked
    }



-- MODEL


type alias Model =
  { key : Nav.Key
  , url : Url.Url
  }


init : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
  ( Model key url, Cmd.none )



-- UPDATE


type Msg
  = LinkClicked Browser.UrlRequest
  | UrlChanged Url.Url


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    LinkClicked urlRequest ->
      case urlRequest of   -- 内部和外部网页的不同应对
        Browser.Internal url ->
          ( model, Nav.pushUrl model.key (Url.toString url) )
          --( model, Nav.load (Url.toString url) )

        Browser.External href ->
          ( model, Nav.load href )

    UrlChanged url ->
      ( { model | url = url }
      , Cmd.none
      )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
  Sub.none



-- VIEW


view : Model -> Browser.Document Msg
view model =
  { title = "\"Save Oasis\"! "          --* 这样改变标题
  , body =
      [ text "Welcome to game \"Save Oasis\"! "
      , ul []
          [
            li [] [ a [ href "game.html" ] [ text"Play" ] ]
          , li [] [ a [ href "help.html" ] [ text "Help" ] ]
          , li [] [ a [ href "https://cn.bing.com/" ] [ text "Bing!" ] ]
          ]
      ]
  }


