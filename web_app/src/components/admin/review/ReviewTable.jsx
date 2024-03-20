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
  const [searchStatus, setSearchStatus] = useState(null);

  const paramsWithPageNo = {
    search: "all",
    pageSize: 5,
    pageNo: currentPage,
    status: searchStatus,
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
  }, [searchStatus]);

  const loadMoreItem = () => {
    if (currentPage >= totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  const handleStatusChange = (event) => {
    setSearchStatus(event.target.value);
  };

  const handleStatusChangeReview = (review, status) => {
    setShowStatusChangeAlert(true);
    setReviewStatus(status);
    setSelectedReview(review);
  };

  const clearFilter = () => {
    setSearchStatus("");
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <Row>
            <Col>
              <Form.Control
                as="select"
                value={searchStatus}
                onChange={handleStatusChange}
              >
                <option value="">Select the status you want to filter</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Pending">Pending</option>
              </Form.Control>
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={clearFilter}>
                Clear Filter
              </Button>
            </Col>
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
