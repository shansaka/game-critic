import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import game_no_image from "../../game_no_image.png";
import useFetch from "../../hook/useFetch";

const apiUrl = process.env.REACT_APP_API_URL;

function Search() {
  const location = useLocation();
  const params = location.state;
  const searchTitle = params ? params.searchTitle : "All";
  const [currentPage, setCurrentPage] = useState(1);
  const paramsWithPageNo = { ...params, pageNo: currentPage, pageSize: 12 };
  const { data, isLoading, error, refetch, totalPages, fetchData } = useFetch(
    `games`,
    "GET",
    paramsWithPageNo
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (currentPage > 1) {
      fetchData(true);
    }
  }, [currentPage]);

  const loadMoreItem = () => {
    if (currentPage >= totalPages) return;
    setCurrentPage(currentPage + 1);
  };

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

          {currentPage >= totalPages ? null : (
            <Button onClick={loadMoreItem} variant="outline-secondary">
              Load more games
            </Button>
          )}
        </Row>
      )}
    </div>
  );
}

export default Search;
