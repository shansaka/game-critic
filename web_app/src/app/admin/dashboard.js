import React from "react";
import { MapView } from "../../components";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Dashboard = () => {
  const reviews = Array.from({ length: 50 }, (_, id) => {
    const lat = 50 + Math.random() * 10; // UK latitude roughly falls between 50 and 60
    const lng = -8 - Math.random() * 2; // UK longitude roughly falls between -10 and -8
    return {
      id: id + 1,
      location: {
        name: `Location ${id + 1}`,
        lat: lat.toFixed(4),
        lng: lng.toFixed(4),
      },
    };
  });
  return (
    <Container>
      <MapView reviews={reviews} />
    </Container>
  );
};

export default Dashboard;
