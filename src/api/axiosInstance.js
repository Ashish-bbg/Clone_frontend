import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://clone-production-8d54.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
