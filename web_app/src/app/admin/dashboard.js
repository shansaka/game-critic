import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MapWidget, ReviewPlacesWidget, TotalWidgets } from "../../components";

const Dashboard = () => {
  return (
    <Container>
      <TotalWidgets />
      <Row>
        <Col xs={12} md={12} lg={7}>
          <MapWidget />
        </Col>
        <Col xs={12} md={12} lg={5}>
          <ReviewPlacesWidget />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
