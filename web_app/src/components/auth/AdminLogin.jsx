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
import { logIn } from "../../helpers/loginSession";
import useFetch from "../../hook/useFetch";
import logo from "../../logo_dark.png";
import "./auth.css";

function AdminLogin({ setLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = location.state;

  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const { isLoading, fetchData } = useFetch(`auth/login/admin`, "POST", null, {
    email: email.value,
    password: password.value,
  });

  const validateForm = () => {
    let emailError = "";
    let passwordError = "";

    if (!email.value) {
      emailError = "Email cannot be empty";
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
      emailError = "Email is not valid";
    }

    if (!password.value) {
      passwordError = "Password cannot be empty";
    } else if (password.value.length < 6) {
      passwordError = "Password must be at least 6 characters";
    }

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const responseData = await fetchData();
      if (responseData && responseData.isSuccess) {
        if (await logIn(responseData, true)) {
          setLoggedIn(true);
          if (params && params.redirectUrl) {
            navigate(params.redirectUrl, { ...params });
          } else {
            navigate("/");
          }
        }
      } else {
        setErrorMsg("Invalid username or password");
        setTimeout(() => setErrorMsg(""), 2000);
      }
    }
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
                  <h5>Admin Login</h5>
                  <Form.Group className="form-group">
                    <Form.Control
                      type="text"
                      placeholder="Enter email"
                      value={email.value}
                      onChange={(e) =>
                        setEmail({ value: e.target.value, error: "" })
                      }
                      isInvalid={!!email.error}
                    />
                    <Form.Control.Feedback type="invalid">
                      {email.error}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password.value}
                      onChange={(e) =>
                        setPassword({ value: e.target.value, error: "" })
                      }
                      isInvalid={!!password.error}
                    />
                    <Form.Control.Feedback type="invalid">
                      {password.error}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="errorMsgSpan">
                    <span>{errorMsg}</span>
                  </div>
                  {isLoading ? (
                    <Button
                      variant="primary"
                      className="button"
                      type="submit"
                      disabled={true}
                    >
                      Loging in...
                    </Button>
                  ) : (
                    <Button variant="primary" className="button" type="submit">
                      Login
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

export default AdminLogin;
