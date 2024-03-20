import React from "react";
import { Container } from "react-bootstrap";
import { AdminLoginComp } from "../../components";

function AdminLogin({ setLoggedIn }) {
  return (
    <Container>
      <AdminLoginComp setLoggedIn={setLoggedIn} />
    </Container>
  );
}

export default AdminLogin;
