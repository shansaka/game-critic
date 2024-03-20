import React from "react";
import { Container } from "react-bootstrap";

import { LoginComp } from "../../components";

function Login({ setLoggedIn }) {
  return (
    <section>
      <Container>
        <LoginComp setLoggedIn={setLoggedIn} />
      </Container>
    </section>
  );
}

export default Login;
