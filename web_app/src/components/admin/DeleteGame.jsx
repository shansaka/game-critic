import React, { useState, useEffect } from "react";
import useFetch from "../../hook/useFetch";
import Swal from "sweetalert2";

const DeleteGame = ({ gameData }) => {
  const [gameId, setGameId] = useState({ value: "", error: "" });
  const { data, isLoading, error, fetchData } = useFetch(
    `games/${gameId.value}`,
    "DELETE",
    null,
    null,
    true
  );

  useEffect(() => {
    if (gameData && gameData._id) {
      setGameId({ value: gameData._id, error: "" });
    }
  }, [gameData]);

  useEffect(() => {
    if (gameId.value) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!" + gameId.value,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          fetchData().then(() => {
            window.location.reload();
          });
        }
      });
    }
  }, [gameId.value]);

  return <></>;
};

export default DeleteGame;
