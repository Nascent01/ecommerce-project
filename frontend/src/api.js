import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withXSRFToken: true,
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
