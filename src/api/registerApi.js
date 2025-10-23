import axiosInstance from "./axiosInstance";

export const registerUser = async (userData) => {
  const response = await axiosInstance.post("/users/register", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axiosInstance.post("/users/login", userData);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/users/logout");
  return response.data;
};

export const getUserProfile = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
};
