import React from "react";
import { Container } from "react-bootstrap";
import { AllGamesComp, NewGames, Welcome } from "../components";

const apiUrl = process.env.REACT_APP_API_URL;

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
