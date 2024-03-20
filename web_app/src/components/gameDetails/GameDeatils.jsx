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
  Alert,
} from "react-bootstrap";
import { useNavigate, Link, useParams } from "react-router-dom";
import useFetch from "../../hook/useFetch";
import { isLoggedIn, isAdmin } from "../../helpers/loginSession";
import { formatDate } from "../../utils/dateFormat";
import Swal from "sweetalert2";
import game_no_image from "../../game_no_image.png";

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error, fetchData } = useFetch(`games/${id}`);

  const [currentPage, setCurrentPage] = useState(1);
  const paramsWithPageNo = { pageNo: currentPage };
  const {
    data: reviewData,
    isLoading: reviewIsLoading,
    error: reviewError,
    fetchData: reviewFetchData,
    totalPages,
  } = useFetch(`reviews/game/${id}`, "GET", paramsWithPageNo);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    if (isLoggedIn() === false) {
      return navigate("/login", {
        state: { redirectUrl: `/game-details/${id}` },
      });
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setShowModal(true);
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
          setShowModal(true);
        }
      );
    }
  };

  const [rating, setRating] = useState({ value: 5, error: "" });
  const [title, setTitle] = useState({ value: "", error: "" });
  const [comment, setComment] = useState({ value: "", error: "" });
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  const requiresAuth = true;
  const {
    data: addReviewData,
    isLoading: addReviewIsLoading,
    error: addReviewError,
    fetchData: addReviewFetchData,
  } = useFetch(
    `reviews`,
    "POST",
    null,
    {
      gameId: id,
      title: title.value,
      comments: comment.value,
      rating: rating.value,
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    },
    requiresAuth
  );

  const validateForm = () => {
    let ratingError = "";
    let titleError = "";
    let commentError = "";

    // Validate rating
    if (!rating.value) {
      ratingError = "Rating cannot be empty";
    } else if (rating.value < 1 || rating.value > 5) {
      ratingError = "Rating must be between 1 and 5";
    }

    // Validate title
    if (!title.value) {
      titleError = "Title cannot be empty";
    }

    // Validate comment
    if (!comment.value) {
      commentError = "Comment cannot be empty";
    }

    if (ratingError || titleError || commentError) {
      setRating({ ...rating, error: ratingError });
      setTitle({ ...title, error: titleError });
      setComment({ ...comment, error: commentError });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      const addReviewResponse = await addReviewFetchData();
      if (addReviewData) {
        Swal.fire({
          icon: "success",
          title: "Your review has been submitted, thank you!",
          text: "Your review will be visible after moderation",
          showConfirmButton: true,
          didClose: () => {
            window.location.reload();
          },
        });
      } else {
        console.log("error");
        alert("error");
      }
    }
  };

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
      ) : (
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Image
              variant="top"
              src={data.mainImage}
              className="game-image-large"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = game_no_image;
              }}
            />{" "}
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Card className="game-info-card">
              <Card.Body>
                <div className="d-flex align-items-center game-details-div">
                  {data.avgRating == 0 ? (
                    <></>
                  ) : (
                    <div
                      className="rating_game_details flex-shrink-0"
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
                  )}

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
          {!isAdmin() ? (
            <div className="review-add-div">
              <Button className="review-add-btn" onClick={handleShow}>
                {" "}
                Add a review
              </Button>
            </div>
          ) : null}
        </div>

        {reviewData.length === 0 && !reviewIsLoading ? (
          <Alert variant="warning">
            No reviews for this game, Be the first to add a review!
          </Alert>
        ) : (
          reviewData.map((review, index) => (
            <Col key={index} xs={12} sm={12} md={12} lg={12}>
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
          ))
        )}
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
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add a Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicRating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter rating"
                value={rating.value}
                onChange={(e) =>
                  setRating({ value: e.target.value, error: "" })
                }
                isInvalid={!!rating.error}
              />
              <Form.Control.Feedback type="invalid">
                {rating.error}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                maxLength={50}
                value={title.value}
                onChange={(e) => setTitle({ value: e.target.value, error: "" })}
                isInvalid={!!title.error}
              />
              <Form.Control.Feedback type="invalid">
                {title.error}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                maxLength={500}
                placeholder="Enter comment"
                value={comment.value}
                onChange={(e) =>
                  setComment({ value: e.target.value, error: "" })
                }
                isInvalid={!!comment.error}
              />
              <Form.Control.Feedback type="invalid">
                {comment.error}
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Submit Review
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default GameDetails;
