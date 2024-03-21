import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./app/auth/login";
import Logout from "./app/auth/logout";
import Register from "./app/auth/register";
import GameDetails from "./app/game-details/game-details";
import Home from "./app/home";
import Search from "./app/search/search";

import Dashboard from "./app/admin/dashboard";
import AdminGames from "./app/admin/games";
import Reviews from "./app/admin/reviews";
import AdminLogin from "./app/auth/admin-login";

import React, { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { FaUserCircle } from "react-icons/fa";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { isAdmin, isLoggedIn } from "./helpers/loginSession";
import logo from "./logo.png";

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
                  {isAdmin() ? (
                    <>
                      <Nav.Link as={NavLink} to="/" activeclassname="active">
                        Dashboard
                      </Nav.Link>
                      <Nav.Link
                        as={NavLink}
                        to="/admin_games"
                        activeclassname="active"
                      >
                        Games
                      </Nav.Link>
                      <Nav.Link
                        as={NavLink}
                        to="/reviews"
                        activeclassname="active"
                      >
                        Reviews
                      </Nav.Link>
                    </>
                  ) : (
                    <>
                      <Nav.Link as={NavLink} to="/" activeclassname="active">
                        Home
                      </Nav.Link>
                      <Nav.Link
                        as={NavLink}
                        to="/games"
                        activeclassname="active"
                      >
                        Games
                      </Nav.Link>
                    </>
                  )}
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
              {isAdmin() ? (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/admin_games" element={<AdminGames />} />
                  <Route path="/reviews" element={<Reviews />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/games" element={<Search />} />

                  <Route
                    path="/register"
                    element={<Register setLoggedIn={setLoggedIn} />}
                  />
                  <Route path="/game-details/:id" element={<GameDetails />} />
                </>
              )}

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
                path="/admin-login"
                element={<AdminLogin setLoggedIn={setLoggedIn} />}
              />
            </Routes>
          </Container>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
