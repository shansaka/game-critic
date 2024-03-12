import ScreenHeaderBtn from "./common/header/ScreenHeaderBtn";

// home screen
import Welcome from "./home/welcome/Welcome";
import AllGames from "./home/all/AllGames";
import NewGames from "./home/new/NewGames";

// game details screen
import Game from "./game_details/game/Game";
import { default as JobTabs } from "./jobdetails/tabs/Tabs";
import { default as GameAbout } from "./game_details/about/About";
import { default as GameReview } from "./game_details/review/Review";
import { default as JobFooter } from "./jobdetails/footer/Footer";

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
  JobTabs,
  GameAbout,
  GameReview, 
  JobFooter
};
