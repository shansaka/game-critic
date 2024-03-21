import React, { useEffect } from "react";

import useFetch from "../../../hook/useFetch";

const TotalWidgets = () => {
  const { data, isLoading, fetchData } = useFetch(
    "dashboard/totals",
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
          <Card.Header>Reviews map</Card.Header>
          <Card.Body className="">
            <h4>{data.totalReviews}</h4>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default TotalWidgets;
