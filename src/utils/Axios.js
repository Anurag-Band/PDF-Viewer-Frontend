import axios from "axios";

const Axios = axios.create({
  baseURL: "https://pdf-viewer-backend-ibdl.onrender.com/api/v1",
  timeout: 8000,
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
});

export default Axios;
