import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AllGames, NewGames } from "../components";

const apiUrl = process.env.REACT_APP_API_URL;

function Home() {
  return (
    <section>
      <Container>
        <NewGames />
        <AllGames />
      </Container>
    </section>
  );
}

export default Home;
