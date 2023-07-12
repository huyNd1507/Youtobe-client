import axios from "axios";

const axiosClient = axios.create({
<<<<<<< HEAD
  baseURL: "https://h-tobe.onrender.com/",
=======
  // baseURL: "https://h-tobe.onrender.com/",
  baseURL: "http://localhost:8000/",
>>>>>>> a5b421c02343f0495dfb1eb29f88a968ad3972dd
});

export default axiosClient;
