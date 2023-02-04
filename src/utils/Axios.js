import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:5001/api/v1",
  timeout: 8000,
  headers: {
    Accept: "application/json",
  },
  withCredentials: true
});

export default Axios;
