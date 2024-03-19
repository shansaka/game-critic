import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Form,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import useFetch from "../../hook/useFetch";

const GameTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScroll, setisScroll] = useState(true);

  const paramsWithPageNo = {
    search: "all",
    pageSize: 10,
    pageNo: currentPage,
    searchTerm: searchTerm,
  };
  const { data, isLoading, error, refetch, totalPages, fetchData } = useFetch(
    "games",
    paramsWithPageNo,
    isScroll
  );

  useEffect(() => {
    fetchData();
  }, []);

  const loadMoreItem = () => {
    if (currentPage >= totalPages) return;
    setCurrentPage(currentPage + 1);
    setisScroll(true);
    fetchData();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    //fetchData();
    setisScroll(false);
    fetchData();
  };

  const handleAddGame = () => {
    // Implement your add game logic here
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <Form onSubmit={handleSearchSubmit}>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Search by game name"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </Col>
              <Col xs="auto">
                <Button variant="outline-success" type="submit">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col md={4} className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleAddGame}>
            Add Game
          </Button>
        </Col>
      </Row>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Date Released</th>
            <th>Date Added</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((game, index) => (
            <tr key={index}>
              <td>{game.name}</td>
              <td>{game.description}</td>
              <td>{game.dateReleased}</td>
              <td>{game.dateAdded}</td>
              <td>
                <Button variant="primary">Edit</Button>
              </td>
              <td>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {currentPage >= totalPages ? null : (
        <Button onClick={loadMoreItem}>Load more games</Button>
      )}
    </>
  );
};

export default GameTable;
