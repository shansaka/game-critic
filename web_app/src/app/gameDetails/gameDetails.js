import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  Modal,
  Form,
} from "react-bootstrap";
import { useNavigate, Link, useParams } from "react-router-dom";
import useFetch from "../../hook/useFetch";

const GameDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error, fetchData } = useFetch(`games/${id}`);

  const [currentPage, setCurrentPage] = useState(1);
  const paramsWithPageNo = { pageNo: currentPage };
  const {
    data: reviewData,
    isLoading: reviewIsLoading,
    error: reviewError,
    fetchData: reviewFetchData,
    totalPages,
  } = useFetch(`reviews/game/${id}`, paramsWithPageNo, true);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  function formatDate(date) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date)
      .toLocaleDateString(undefined, options)
      .toLocaleUpperCase();
  }
  useEffect(() => {
    fetchData();
    reviewFetchData();
  }, []);

  const loadMoreItem = () => {
    if (currentPage >= totalPages) return;
    setCurrentPage(currentPage + 1);
    reviewFetchData();
  };

  return (
    <Container>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>error</div>
      ) : (
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Image
              variant="top"
              src={data.mainImage}
              className="game-image-large"
            />{" "}
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Card className="game-info-card">
              <Card.Body>
                <div className="d-flex align-items-center game-details-div">
                  <div
                    className="rating flex-shrink-0"
                    style={{
                      backgroundColor:
                        data.avgRating > 4
                          ? "#3BB273"
                          : data.avgRating < 2.5
                          ? "#F77474"
                          : "#d4b253",
                    }}
                  >
                    {data.avgRating}
                  </div>
                  <div className="game-detail-title flex-shrink-1">
                    {data.name}
                  </div>
                </div>
                <div className="">
                  <div className="game-details-div">
                    Released On: {formatDate(data.dateReleased)}
                  </div>
                  <div className="game-details-div">
                    <h5> About the game</h5>
                    {data.description}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <Row className="game-reviews-row">
        <div className="review-header d-flex">
          <div className="review-header-title">Reviews</div>
          <div className="review-add-div">
            <Button className="review-add-btn" onClick={handleShow}>
              {" "}
              Add a review
            </Button>
          </div>
        </div>

        {reviewData.map((review, index) => (
          <Col key={index} xs={12} sm={12} md={6} lg={6}>
            <Card className="game-review-card">
              <Card.Body>
                <div className="d-flex align-items-center game-review-div">
                  <div
                    className="rating flex-shrink-0"
                    style={{
                      backgroundColor:
                        review.rating > 4
                          ? "#3BB273"
                          : review.rating < 2.5
                          ? "#F77474"
                          : "#d4b253",
                    }}
                  >
                    {review.rating}
                  </div>
                  <div className="game-review-title flex-shrink-1">
                    {review.title}
                  </div>
                  <div className="game-review-date flex-shrink-1">
                    {formatDate(review.dateCreated)}
                  </div>
                </div>
                <hr />
                <div>{review.comments}</div>
                <div className="game-review-name">{review.user.name}</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {reviewIsLoading ? (
        <div>Loading...</div>
      ) : reviewError ? (
        <div>error</div>
      ) : (
        <Row className="game-reviews-row">
          {currentPage >= totalPages ? null : (
            <div>
              <Button variant="outline-primary" onClick={() => loadMoreItem()}>
                Load More Reviews
              </Button>
            </div>
          )}
        </Row>
      )}

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="form-group">
              {/* <Form.Label>Rating</Form.Label> */}
              <Form.Control type="number" placeholder="Enter rating" />
            </Form.Group>

            <Form.Group className="form-group">
              {/* <Form.Label>Title</Form.Label> */}
              <Form.Control type="text" placeholder="Enter title" />
            </Form.Group>

            <Form.Group className="form-group">
              {/* <Form.Label>Comment</Form.Label> */}
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter comment"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default GameDetails;
