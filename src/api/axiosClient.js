import axios from "axios";

const axiosClient = axios.create({
  // baseURL: "https://h-tobe.onrender.com/",
  baseURL: "https://youtube-server-z19k.onrender.com/",
});

export default axiosClient;
