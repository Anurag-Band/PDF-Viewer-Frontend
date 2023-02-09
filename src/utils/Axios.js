import axios from "axios";

const Axios = axios.create({
  baseURL: "https://pdf-viewer-backend-ibdl.onrender.com",
  timeout: 8000,
  headers: {
    Accept: "application/json",
  },
  withCredentials: true
});

export default Axios;
