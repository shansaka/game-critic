import React, { Component } from 'react'
import { Container, Row, Col } from "react-bootstrap";
// import SocialMedia from "../SocialMedia";
import Typewriter from "typewriter-effect";
import myImg from "../me.jpg";


export default class Home extends Component {
  render() {
    return (
      <section>
      <Container fluid className="home-section" id="home">
        <Container className="home-content">
          <Row>
            <Col md={6} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I'm
                <strong className="main-name"> Salindu Hansaka</strong>
              </h1>

              <p className="heading-description blockquote">
                I am deeply passionate about harnessing the power of .NET frameworks and development to create remarkable user experiences. 
                With over five years of hands-on experience, I specialize in crafting web applications using the latest front-end and back-end technologies 
                in the realm of full-stack development.
              </p>

              <div className="heading-type">
              <Typewriter
                  options={{
                    strings: [
                      "Front End Developer",
                      "Back End Developer",
                      "Software Engineer",
                      "Open Source Contributor",
                    ],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 50,
                  }}
                />
              </div>
            </Col>

            <Col md={5}>
              <img src={myImg} className="profile-pic" alt="avatar" />
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
    )
  }
}
