import React, { useState, useEffect } from "react";
import useFetch from "../../../hook/useFetch";
import Swal from "sweetalert2";

const StatusChangeReview = ({
  reviewData,
  showStatusChangeAlert,
  setSelectedReview,
  setShowStatusChangeAlert,
  reviewStatus,
}) => {
  const [reviewId, setReviewId] = useState({ value: "", error: "" });
  const { data, isLoading, error, fetchData } = useFetch(
    `reviews/${reviewId.value}/status`,
    "PATCH",
    null,
    {
      status: reviewStatus,
    },
    true
  );

  useEffect(() => {
    if (reviewData && reviewData._id) {
      setReviewId({ value: reviewData._id, error: "" });
    }
  }, [reviewData]);

  useEffect(() => {
    if (reviewId.value && showStatusChangeAlert) {
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, change it!",
      }).then((result) => {
        if (result.isConfirmed) {
          fetchData().then(() => {
            window.location.reload();
          });
        } else {
          setSelectedReview(null);
          setReviewId({ value: "", error: "" });
          setShowStatusChangeAlert(false);
        }
      });
    }
  }, [reviewId.value, showStatusChangeAlert]);

  return <></>;
};

export default StatusChangeReview;
