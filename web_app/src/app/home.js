import React from "react";
import { Container } from "react-bootstrap";
import { AllGamesComp, NewGames, Welcome } from "../components";

function Home() {
  return (
    <section>
      <Container>
        <Welcome />
        <NewGames />
        <AllGamesComp />
      </Container>
    </section>
  );
}

export default Home;
