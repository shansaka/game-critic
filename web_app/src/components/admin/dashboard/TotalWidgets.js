import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import useFetch from "../../../hook/useFetch";

const TotalWidgets = () => {
  const { data, isLoading, fetchData } = useFetch(
    "dashboard/totals",
    "GET",
    null,
    null,
    true
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Row style={{ marginBottom: 25 }}>
          <Col xs={12} sm={6} md={4} lg={4}>
            <Card className="">
              <Card.Header>Total Reviews</Card.Header>
              <Card.Body className="">
                <h4>{data.totalReviews}</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} lg={4}>
            <Card className="">
              <Card.Header>Total Games Reviewed</Card.Header>
              <Card.Body className="">
                <h4>{data.totalGames}</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} lg={4}>
            <Card className="">
              <Card.Header>Total Users Reviewed</Card.Header>
              <Card.Body className="">
                <h4>{data.totalUsers}</h4>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default TotalWidgets;
