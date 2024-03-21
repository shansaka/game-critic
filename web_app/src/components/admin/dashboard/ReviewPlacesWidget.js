import React, { useEffect } from "react";
import { Card, Table } from "react-bootstrap";
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
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default ReviewPlacesWidget;
