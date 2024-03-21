import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import useFetch from "../../../hook/useFetch";

const ReviewPlacesWidget = () => {
  const { data, isLoading, fetchData } = useFetch(
    "dashboard/top-locations",
    "GET",
    null,
    null,
    true
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Card className="">
          <Card.Header>Top Reviwed Places</Card.Header>
          <Card.Body className="">
            <h4>{data.totalReviews}</h4>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default ReviewPlacesWidget;
