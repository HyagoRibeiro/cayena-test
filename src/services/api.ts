import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use(function (config) {
  const currToken = localStorage.getItem("tokenCayena");
  if (currToken) {
    config.headers.Authorization = `Bearer ${currToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("tokenCayena");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export const authentication = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    authorization: `Basic ${window.btoa(`${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`)}`,
  },
});
