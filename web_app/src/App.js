import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./app/home";
import Search from "./app/search/search";
import Login from "./app/auth/login";
import Logout from "./app/auth/logout";
import Register from "./app/auth/register";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Navbar, Nav } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import logo from "./logo.png";
import { isLoggedIn } from "./helpers/loginSession";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Navbar
            expand="lg"
            bg="dark"
            data-bs-theme="dark"
            className="bg-body-tertiary "
          >
            <Container>
              <Navbar.Brand>
                <Nav.Link as={NavLink} to="/">
                  <img
                    src={logo}
                    height="50"
                    className="d-inline-block align-top"
                    alt="Logo"
                  />
                </Nav.Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto custom-nav">
                  <Nav.Link as={NavLink} to="/" activeclassname="active">
                    Home
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/games" activeclassname="active">
                    Games
                  </Nav.Link>
                </Nav>
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  activeclassname="active"
                  className="ml-auto"
                >
                  <FaUserCircle size={40} color="white" />
                </Nav.Link>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div className="main_container ">
          <Container fluid className="home-section">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<Search />} />
              {loggedIn ? (
                <Route
                  path="/login"
                  element={<Logout setLoggedIn={setLoggedIn} />}
                />
              ) : (
                <Route
                  path="/login"
                  element={<Login setLoggedIn={setLoggedIn} />}
                />
              )}
              <Route
                path="/register"
                element={<Register setLoggedIn={setLoggedIn} />}
              />
            </Routes>
          </Container>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
