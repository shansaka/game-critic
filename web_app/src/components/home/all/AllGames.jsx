import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hook/useFetch";

const apiUrl = process.env.REACT_APP_API_URL;

function AllGames() {
  const { data, isLoading, error, refetch, fetchData } = useFetch("games", {
    search: "all",
    pageSize: 12,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="all-games">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="header-title">Games</h4>
        <Button
          variant="outline-primary"
          onClick={() =>
            navigate("/games", { state: { search: "all", searchTitle: "All" } })
          }
        >
          Show All
        </Button>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Something Went Wrong</div>
      ) : (
        <Row className="new-games-row">
          {data.map((game, index) => (
            <Col key={index} xs={12} sm={6} md={3} lg={2}>
              <Card className="game-card">
                <Card.Img
                  variant="top"
                  src={game.mainImage}
                  className="game-image"
                />{" "}
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div className="game-title flex-shrink-1">{game.name}</div>
                  <div
                    className="rating flex-shrink-0"
                    style={{
                      backgroundColor:
                        game.avgRating > 4
                          ? "#3BB273"
                          : game.avgRating < 2.5
                          ? "#F77474"
                          : "#d4b253",
                    }}
                  >
                    {game.avgRating}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default AllGames;
