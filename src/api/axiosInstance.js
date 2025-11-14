import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://clone-production-8d54.up.railway.app/api",
  // baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
