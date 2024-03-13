import ScreenHeaderBtn from "./common/header/ScreenHeaderBtn";

// home screen
import Welcome from "./home/welcome/Welcome";
import AllGames from "./home/all/AllGames";
import NewGames from "./home/new/NewGames";

// game details screen
import Game from "./gameDetails/game/Game";
import { default as GameTabs } from "./gameDetails/tabs/Tabs";
import { default as GameAbout } from "./gameDetails/about/About";
import { default as GameReview } from "./gameDetails/review/Review";
import { default as GameFooter } from "./gameDetails/footer/Footer";

// common
import AllGameCard from "./common/cards/all/AllGameCard";
import ReviewCard from "./common/cards/review/ReviewCard";

// rewiew screen
import { default as ReviewFooter } from "./review/footer/Footer";

// auth screens
import Background from "./common/auth/Background";
import Logo from "./common/auth/Logo";
import Header from "./common/auth/Header";
import Button from "./common/auth/Button";
import TextInput from "./common/auth/TextInput";



export {
  ScreenHeaderBtn,
  Welcome,
  AllGames,
  NewGames,
  AllGameCard,
  ReviewCard,

  Game,
  GameTabs,
  GameAbout,
  GameReview, 
  GameFooter,

  ReviewFooter,

  Background,
  Logo,
  Header,
  Button,
  TextInput
};
