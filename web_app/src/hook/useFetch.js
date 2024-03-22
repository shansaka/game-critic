// useFetch.js
import axios from "axios";
import { useCallback, useState } from "react";
import Swal from "sweetalert2";
import { getSessionItem, logOut, updateToken } from "../helpers/loginSession";

const apiUrl = process.env.REACT_APP_API_URL;

const useFetch = (
  endpoint,
  method = "GET",
  query = null,
  body = null,
  requiresAuth = false
) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const options = {
    method: method,
    url: `${apiUrl}/${endpoint}`,
    params: {
      ...query,
    },
    data: body,
    headers:
      body instanceof FormData ? {} : { "Content-Type": "application/json" },
  };

  // Setting the data and total pages
  const handleResponseData = (response, shouldAppend) => {
    // Check if the response has a data, that mean it's pagination data
    if ("data" in response.data) {
      // If shouldAppend is true, append the data to the existing data, it means it's coming from load more items button
      if (shouldAppend) {
        setData((prevData) => [...prevData, ...response.data.data]);
      } else {
        setData(response.data.data);
      }
      setTotalPages(response.data.totalPages);
    } else {
      setData(response.data);
    }
    return response.data;
  };

  // Fetching data
  const fetchData = useCallback(
    async (shouldAppend = false) => {
      setIsLoading(true);

      const token = await getSessionItem("token");
      const refreshToken = await getSessionItem("refreshToken");

      // If the request requires authentication, add the token to the header
      if (requiresAuth) {
        options.headers = { Authorization: `Bearer ${token}` };
      }

      try {
        const response = await axios.request(options);
        return handleResponseData(response, shouldAppend);
      } catch (error) {
        // If the error is 401 and the message is Token expired, try to refresh the token
        if (
          error.response &&
          error.response.status === 401 &&
          error.response.data.message === "Token expired"
        ) {
          console.log("token expired");
          const refreshOptions = {
            method: "POST",
            url: `${apiUrl}/auth/refresh`,
            data: {
              expiredToken: token,
              refreshToken: refreshToken,
            },
          };
          try {
            console.log("getting new token");
            console.log(refreshOptions);
            const refreshResponse = await axios.request(refreshOptions);
            console.log("saving new token");
            await updateToken(
              refreshResponse.data.token,
              refreshResponse.data.refreshToken
            );
            options.headers = {
              Authorization: `Bearer ${refreshResponse.data.token}`,
            };
            console.log("trying again");
            console.log(options);
            const response = await axios.request(options);
            return handleResponseData(response, shouldAppend);
          } catch (refreshError) {
            console.log("refresh error", refreshError);
            // After refreshing the token still getting 403, log out the user and show an error message
            if (refreshError.response && refreshError.response.status === 403) {
              console.log("Forbidden");
              logOut();
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Your session has expired. Please log in again!",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong, please contact support.",
              });
            }
          }
        } else {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong, please contact support.",
          });
        }
      } finally {
        setIsLoading(false);
      }
    },
    [endpoint, JSON.stringify(query), body]
  );

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, refetch, totalPages, fetchData };
};

export default useFetch;
