import React, { Component } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col, Badge } from "react-bootstrap";
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
    // Getting projects from Api
    fetch(`${config.apiUrl}/projects`)
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
        <Container fluid className="project-section" id="home">
          <Container className="project-content">
            <Row>
            <h1 className="project-heading">
              My Recent <strong className="purple">Projects </strong>
            </h1>
              {
                items.map(item => (
                  <Col md={4} className='card-col'>
                  <Card >
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <hr></hr>
                    <Card.Text>
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                    {item.techStack.split(',').map((tech, index) => (
                      <Badge key={index} variant="success" className="mr-1 tech_badge bg-success">
                        {tech.trim()}
                      </Badge>
                    ))}
                    </ListGroup.Item>
                  </ListGroup>
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

