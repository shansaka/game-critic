import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from "react-bootstrap";
import config from "../config";

export default class Projects extends Component {

  constructor(props){
    super(props);
    this.state = {
      items: [],
      isLoaded: false
    }
  }

  componentDidMount(){
    // Getting skills from Api
    fetch(`${config.apiUrl}/skills`)
    .then(res => res.json())
    .then(json => {
      this.setState({
        isLoaded: true,
        items: json.data
      })
    })
  }

  render() {
    var {isLoaded, items} = this.state;

    if(!isLoaded){
        <div>Loading..</div>
    } 
    else {
      return (
        <section>
        <Container fluid className="skill-section" id="home">
          <Container className="skill-content">
            <Row>
            <h1 className="skill-heading">
              My <strong className="purple">Skills </strong>
            </h1>
              {
                items.map(item => (
                  <Col md={4} className='card-col'>
                  <Card>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <hr></hr>
                    <Card.Text>
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                 
                  </Card>
                  </Col>
                ))
              }      
            </Row>
          </Container>
        </Container>
      </section>  
      )
    }
  }
}
