import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hook/useFetch";
import { isLoggedIn, getSessionItem } from "../../../helpers/loginSession";

const apiUrl = process.env.REACT_APP_API_URL;

function AllGamesComp() {
  const [loggedInUserName, setLoggedInUserName] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      const username = getSessionItem("username");
      setLoggedInUserName(username);
    }
  }, []);

  return (
    <section>
      {loggedInUserName ? <h5>Hello! {loggedInUserName}</h5> : null}
      <h3>Welcome to the Game Critic</h3>
    </section>
  );
}

export default AllGamesComp;
