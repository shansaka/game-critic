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
import useFetch from "../../hook/useFetch";
import AddGame from "./AddGame";
import EditGame from "./EditGame";

const GameTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const paramsWithPageNo = {
    search: "all",
    pageSize: 5,
    pageNo: currentPage,
    searchTerm: searchTerm,
  };
  const { data, isLoading, error, refetch, totalPages, fetchData } = useFetch(
    "games",
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

  const handleAddGame = () => {
    setShowAddModal(true);
  };

  const handleEditGame = (game) => {
    setSelectedGame(game);
    setShowEditModal(true);
  };

  return (
    <>
      <Row>
        <Col md={12}>
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
              <Button variant="primary" onClick={handleAddGame}>
                Add Game
              </Button>
            </Col>
          </Row>
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
                <Button variant="primary" onClick={() => handleEditGame(game)}>
                  Edit
                </Button>
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

      <AddGame showAddModal={showAddModal} setShowAddModal={setShowAddModal} />

      <EditGame
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        gameData={selectedGame}
      />
    </>
  );
};

export default GameTable;
