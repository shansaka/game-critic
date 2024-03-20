import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Form,
  Modal,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import useFetch from "../../../hook/useFetch";
import StatusChangeReview from "./StatusChangeReview";
import { formatDate } from "../../../utils/dateFormat";

const ReviewTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [showStatusChangeAlert, setShowStatusChangeAlert] = useState(false);
  const [reviewStatus, setReviewStatus] = useState(null);

  const paramsWithPageNo = {
    search: "all",
    pageSize: 5,
    pageNo: currentPage,
    searchTerm: searchTerm,
  };
  const { data, isLoading, error, refetch, totalPages, fetchData } = useFetch(
    "reviews",
    "GET",
    paramsWithPageNo,
    null,
    true
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (currentPage > 1) {
      fetchData(true);
    }
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    fetchData();
  }, [searchTerm]);

  const loadMoreItem = () => {
    if (currentPage >= totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChangeReview = (review, status) => {
    setShowStatusChangeAlert(true);
    setReviewStatus(status);
    setSelectedReview(review);
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Search by review name"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Col>
            <Col xs="auto"></Col>
          </Row>
        </Col>
      </Row>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Comments</th>
            <th>Game</th>
            <th>User</th>

            <th>Status</th>
            <th>Date Added</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((review, index) => (
            <tr key={index}>
              <td>{review.title}</td>
              <td>{review.comments}</td>
              <td>{review.game.name}</td>
              <td>{review.user.name}</td>
              <td>{review.status}</td>
              <td>{formatDate(review.dateCreated)}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleStatusChangeReview(review, "Approved")}
                >
                  Approve
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleStatusChangeReview(review, "Rejected")}
                >
                  Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {currentPage >= totalPages ? null : (
        <Button onClick={loadMoreItem}>Load more reviews</Button>
      )}

      <StatusChangeReview
        reviewData={selectedReview}
        setSelectedReview={setSelectedReview}
        showStatusChangeAlert={showStatusChangeAlert}
        setShowStatusChangeAlert={setShowStatusChangeAlert}
        reviewStatus={reviewStatus}
      />
    </>
  );
};

export default ReviewTable;
