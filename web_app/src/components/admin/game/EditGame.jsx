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
  InputGroup,
} from "react-bootstrap";
import useFetch from "../../../hook/useFetch";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const EditGame = ({ showEditModal, setShowEditModal, gameData }) => {
  const [gameName, setGameName] = useState({ value: "", error: "" });
  const [gameDescription, setGameDescription] = useState({
    value: "",
    error: "",
  });
  const [gameDate, setGameDate] = useState({ value: "", error: "" });
  const [gameImage, setGameImage] = useState({ value: "", error: "" });
  const [gameId, setGameId] = useState({ value: "", error: "" });

  useEffect(() => {
    if (gameData) {
      setGameName({ value: gameData.name, error: "" });
      setGameDescription({ value: gameData.description, error: "" });

      const date = new Date(gameData.dateReleased);
      setGameDate({ value: date, error: "" });

      //setGameImage({ value: gameData.mainImage, error: "" });
      setGameId({ value: gameData._id, error: "" });
    }
  }, [gameData]);

  const formData = new FormData();
  formData.append("name", gameName.value);
  formData.append("description", gameDescription.value);
  formData.append("dateReleased", gameDate.value);
  formData.append("mainImage", gameImage.value);

  const { data, isLoading, error, fetchData } = useFetch(
    `games/${gameId.value}`,
    "PATCH",
    null,
    formData,
    true
  );

  const validateForm = () => {
    let gameNameError = "";
    let gameDescriptionError = "";
    let gameDateError = "";
    let gameImageError = "";

    // Validate game name
    if (!gameName.value) {
      gameNameError = "Game name cannot be empty";
    }

    // Validate game description
    if (!gameDescription.value) {
      gameDescriptionError = "Game description cannot be empty";
    }

    // Validate game date
    if (!gameDate.value) {
      gameDateError = "Game date cannot be empty";
    }

    if (
      gameNameError ||
      gameDescriptionError ||
      gameDateError ||
      gameImageError
    ) {
      setGameName({ ...gameName, error: gameNameError });
      setGameDescription({ ...gameDescription, error: gameDescriptionError });
      setGameDate({ ...gameDate, error: gameDateError });
      setGameImage({ ...gameImage, error: gameImageError });
      return false;
    }

    return true;
  };

  const handleEditGameSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const response = await fetchData();
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Your work has been saved!",
          showConfirmButton: false,
          timer: 1500,
          didClose: () => {
            window.location.reload();
          },
        });
      }
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

    if (file && !validImageTypes.includes(file.type)) {
      setGameImage({ value: "", error: "Please select an image file" });
    } else {
      setGameImage({ value: file, error: "" });
    }
  };

  return (
    <Modal
      show={showEditModal}
      onHide={() => setShowEditModal(false)}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Game</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="form-group">
            <Form.Label>Game Image</Form.Label>
            <Form.Control
              type="file"
              onChange={handleImageUpload}
              isInvalid={!!gameImage.error}
            />
            <Form.Control.Feedback type="invalid">
              {gameImage.error}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter game name"
              maxLength={50}
              value={gameName.value}
              onChange={(e) =>
                setGameName({ value: e.target.value, error: "" })
              }
              isInvalid={!!gameName.error}
            />
            <Form.Control.Feedback type="invalid">
              {gameName.error}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter game description"
              maxLength={500}
              value={gameDescription.value}
              onChange={(e) =>
                setGameDescription({ value: e.target.value, error: "" })
              }
              isInvalid={!!gameDescription.error}
            />
            <Form.Control.Feedback type="invalid">
              {gameDescription.error}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Date Released</Form.Label>
            <InputGroup>
              <DatePicker
                className="form-control"
                width="100%"
                selected={gameDate.value}
                dateFormat="dd/MM/yyyy"
                onChange={(date) => setGameDate({ value: date, error: "" })}
              />
            </InputGroup>
            <Form.Control.Feedback type="invalid">
              {gameDate.error}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
          Close
        </Button>
        {isLoading ? (
          <Button
            variant="primary"
            onClick={handleEditGameSubmit}
            disabled={true}
          >
            Saving...
          </Button>
        ) : (
          <Button variant="primary" onClick={handleEditGameSubmit}>
            Save Changes
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default EditGame;
