import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://h-tobe.onrender.com/",
});

export default axiosClient;
