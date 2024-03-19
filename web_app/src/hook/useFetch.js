// useFetch.js
import { useState, useCallback } from "react";
import { getSessionItem, updateToken } from "../helpers/loginSession";
import axios from "axios";

const apiUrl = "https://game-critic-web-api.onrender.com/api";

const useFetch = (
  endpoint,
  method = "GET",
  query = null,
  body = null,
  requiresAuth = false
) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const handleResponseData = (response, shouldAppend) => {
    if ("data" in response.data) {
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

  const fetchData = useCallback(
    async (shouldAppend = false) => {
      setIsLoading(true);

      const token = await getSessionItem("token");
      const refreshToken = await getSessionItem("refreshToken");
      if (requiresAuth) {
        options.headers = { Authorization: `Bearer ${token}` };
      }

      try {
        const response = await axios.request(options);
        return handleResponseData(response, shouldAppend);
        console.log(response.data);
      } catch (error) {
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
            setError(refreshError);
            console.log("refresh error", refreshError);
          }
        } else {
          setError(error);
          console.log(error);
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

  return { data, isLoading, error, refetch, totalPages, fetchData };
};

export default useFetch;
