import React from "react";
import { Container } from "react-bootstrap";
import { RegisterComp } from "../../components";

function Register({ setLoggedIn }) {
  return (
    <Container>
      <RegisterComp setLoggedIn={setLoggedIn} />
    </Container>
  );
}

export default Register;
