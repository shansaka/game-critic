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
import Swal from "sweetalert2";
import useFetch from "../../hook/useFetch";
import logo from "../../logo_dark.png";
import "./auth.css";

function ResetPassword({ setLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = location.state;

  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [newPassword, setNewPassword] = useState({ value: "", error: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const { data, isLoading, error, refetch, totalPages, fetchData } = useFetch(
    `auth/reset-password`,
    "POST",
    null,
    {
      email: email.value,
      currentPassword: password.value,
      newPassword: newPassword.value,
    }
  );

  const validateForm = () => {
    let emailError = "";
    let passwordError = "";
    let newPasswordError = "";

    // Validate email
    if (!email.value) {
      emailError = "Email cannot be empty";
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
      emailError = "Email is not valid";
    }

    // Validate password
    if (!password.value) {
      passwordError = "Password cannot be empty";
    } else if (password.value.length < 6) {
      passwordError = "Password must be at least 6 characters";
    }

    // Validate new password
    if (!newPassword.value) {
      newPasswordError = "Password cannot be empty";
    } else if (newPassword.value.length < 6) {
      newPasswordError = "Password must be at least 6 characters";
    }

    if (newPasswordError || emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setNewPassword({ ...newPassword, error: newPasswordError });
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const responseData = await fetchData();
      if (responseData && responseData.isSuccess) {
        Swal.fire({
          icon: "success",
          title: "Reset password successfully",
          text: "Please confirm your email address.",
          showConfirmButton: true,
          confirmButtonText: "Okay, Got it!",
          didClose: () => {
            navigate("/login");
          },
        });
      } else if (responseData && responseData.message) {
        setErrorMsg(responseData.message);
        setTimeout(() => setErrorMsg(""), 2000);
      }
    } else {
      setErrorMsg("Error while registering user, please contact support");
      setTimeout(() => setErrorMsg(""), 2000);
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
                  <h5>Welcome back.</h5>

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
                  <Form.Group className="form-group">
                    <Form.Control
                      type="password"
                      placeholder="New Password"
                      value={newPassword.value}
                      onChange={(e) =>
                        setNewPassword({ value: e.target.value, error: "" })
                      }
                      isInvalid={!!newPassword.error}
                    />
                    <Form.Control.Feedback type="invalid">
                      {newPassword.error}
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
                      Resetting Password...
                    </Button>
                  ) : (
                    <Button variant="primary" className="button" type="submit">
                      Reset Password
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

export default ResetPassword;
