import React, { useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import game_no_image from "../../game_no_image.png";
import useFetch from "../../hook/useFetch";

function NewGames() {
  const { data, isLoading, error, refetch, fetchData } = useFetch(
    "games",
    "GET",
    {
      search: "new",
      pageSize: 6,
    }
  );
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="new-games">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="header-title">New Releases</h4>
        <Button
          variant="outline-primary"
          onClick={() =>
            navigate("/games", {
              state: { search: "new", searchTitle: "Newly Released" },
            })
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
              <Link
                to={`/game-details/${game._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card className="game-card">
                  <Card.Img
                    variant="top"
                    src={game.mainImage}
                    className="game-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = game_no_image;
                    }}
                  />{" "}
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <div className="game-title flex-shrink-1">{game.name}</div>
                    {game.avgRating == 0 ? (
                      <></>
                    ) : (
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
                    )}
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default NewGames;
