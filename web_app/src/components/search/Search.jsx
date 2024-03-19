import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import useFetch from "../../hook/useFetch";

const apiUrl = process.env.REACT_APP_API_URL;

function Search() {
  const location = useLocation();
  const params = location.state;
  const searchTitle = params ? params.searchTitle : "All";
  const [currentPage, setCurrentPage] = useState(1);
  const paramsWithPageNo = { ...params, pageNo: currentPage };
  const { data, isLoading, error, refetch, totalPages, fetchData } = useFetch(
    `games`,
    paramsWithPageNo,
    true
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h4 className="header-title">{searchTitle}</h4>
          <h6 className="header-title">Games</h6>
        </div>
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
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Search;
