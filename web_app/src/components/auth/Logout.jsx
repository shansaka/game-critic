import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { logOut } from "../../helpers/loginSession";
import logo from "../../logo_dark.png";
import "./auth.css";

function Login({ setLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = location.state;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (logOut()) {
      setLoggedIn(false);
      navigate("/");
    } else {
      setError("Failed to logout");
    }
    setIsLoading(false);
  };

  return (
    <section>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Card>
              <Card.Body className="card-body-auth">
                <Card.Title className="text-center">
                  <Image src={logo} alt="Logo" height="150" />
                </Card.Title>
                <Form onSubmit={handleSubmit}>
                  {isLoading ? (
                    <Button
                      variant="primary"
                      className="button"
                      type="submit"
                      disabled={true}
                    >
                      Loging out...
                    </Button>
                  ) : error ? (
                    <div>Something Went Wrong</div>
                  ) : (
                    <Button variant="primary" className="button" type="submit">
                      Logout
                    </Button>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Login;
