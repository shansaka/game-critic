import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Search } from "../../components";

function Home() {
  return (
    <section>
      <Container>
        <Search />
      </Container>
    </section>
  );
}

export default Home;
