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
  GameFooter
};
