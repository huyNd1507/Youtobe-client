import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://huytube.onrender.com/",
});

export default axiosClient;
