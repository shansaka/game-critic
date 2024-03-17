import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Home from './Home';
import Projects from './Projects';
import Skills from './Skills';

export default class NavbarComp extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary custom_navbar">
            <Container>
              
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto justify-content-center">
                  <Nav.Link as={NavLink} to="/" activeclassname="active" exact>
                    Home
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/projects" activeclassname="active">
                    Projects
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/skills" activeclassname="active">
                    Skills
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div className='main_container'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
