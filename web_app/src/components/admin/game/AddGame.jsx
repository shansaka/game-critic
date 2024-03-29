import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import useFetch from "../../../hook/useFetch";

const AddGame = ({ showAddModal, setShowAddModal }) => {
  const [gameName, setGameName] = useState({ value: "", error: "" });
  const [gameDescription, setGameDescription] = useState({
    value: "",
    error: "",
  });
  const [gameDate, setGameDate] = useState({ value: "", error: "" });
  const [gameImage, setGameImage] = useState({ value: "", error: "" });

  const formData = new FormData();
  formData.append("name", gameName.value);
  formData.append("description", gameDescription.value);
  formData.append("dateReleased", gameDate.value);
  formData.append("mainImage", gameImage.value);

  const { data, isLoading, error, fetchData } = useFetch(
    "games",
    "POST",
    null,
    formData,
    true
  );

  const validateForm = () => {
    let gameNameError = "";
    let gameDescriptionError = "";
    let gameDateError = "";
    let gameImageError = "";

    if (!gameImage.value) {
      gameImageError = "Game image cannot be empty";
    }

    if (!gameName.value) {
      gameNameError = "Game name cannot be empty";
    }

    if (!gameDescription.value) {
      gameDescriptionError = "Game description cannot be empty";
    }

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

  const handleAddGameSubmit = async (event) => {
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
    <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
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
              value={gameDescription.value}
              maxLength={500}
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

            <Form.Control
              type="date"
              value={gameDate.value}
              onChange={(e) =>
                setGameDate({ value: e.target.value, error: "" })
              }
              isInvalid={!!gameDate.error}
            />
            <Form.Control.Feedback type="invalid">
              {gameDate.error}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowAddModal(false)}>
          Close
        </Button>
        {isLoading ? (
          <Button
            variant="primary"
            onClick={handleAddGameSubmit}
            disabled={true}
          >
            Saving...
          </Button>
        ) : (
          <Button variant="primary" onClick={handleAddGameSubmit}>
            Save Changes
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AddGame;
