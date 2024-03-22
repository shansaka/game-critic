import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import useFetch from "../../hook/useFetch";
import { formatDate } from "../../utils/dateFormat";

const MyReviewTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const paramsWithPageNo = {
    search: "all",
    pageSize: 5,
    pageNo: currentPage,
  };
  const { data, isLoading, error, refetch, totalPages, fetchData } = useFetch(
    "reviews/user",
    "GET",
    paramsWithPageNo,
    null,
    true
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (currentPage > 1) {
      fetchData(true);
    }
  }, [currentPage]);

  const loadMoreItem = () => {
    if (currentPage >= totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Comments</th>
              <th>Game</th>
              <th>Location</th>
              <th>Status</th>
              <th>Date Added</th>
            </tr>
          </thead>
          <tbody>
            {data.map((review, index) => (
              <tr key={index}>
                <td>{review.title}</td>
                <td>{review.comments}</td>
                <td>{review.game.name}</td>
                <td>{`${
                  review.location != null && review.location.city
                    ? review.location.city + ", "
                    : ""
                } ${
                  review.location != null && review.location.country
                    ? review.location.country
                    : ""
                }`}</td>
                <td>{review.status}</td>
                <td>{formatDate(review.dateCreated)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {currentPage >= totalPages ? null : (
        <Button onClick={loadMoreItem}>Load more reviews</Button>
      )}
    </>
  );
};

export default MyReviewTable;
