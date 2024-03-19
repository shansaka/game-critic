import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hook/useFetch";

function LoginComp() {
  const { data, isLoading, error, refetch, fetchData } = useFetch(
    "games",
    "GET",
    {
      search: "all",
      pageSize: 12,
    }
  );

  useEffect(() => {
    //fetchData();
  }, []);

  return <div>Login</div>;
}

export default LoginComp;
