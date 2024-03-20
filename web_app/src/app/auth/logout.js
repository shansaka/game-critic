import React from "react";
import { Container } from "react-bootstrap";

import { LogoutComp } from "../../components";

function Login({ setLoggedIn }) {
  return (
    <Container>
      <LogoutComp setLoggedIn={setLoggedIn} />
    </Container>
  );
}

export default Login;
