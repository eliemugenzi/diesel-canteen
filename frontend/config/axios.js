import axios from "axios";
// contains ajax
// Back end and front edn combinationo

const api = axios.create({
  baseURL: "http://localhost:9000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `JWT ${localStorage.getItem("JWT_TOKEN")}`
  }
});

export default api;
