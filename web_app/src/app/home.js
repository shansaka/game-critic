import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
