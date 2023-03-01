import axios from "axios";

const axiosClient = axios.create({
  // baseURL: "http://localhost:8000/",
  baseURL: "https://h-tobe.onrender.com/",
});

export default axiosClient;
