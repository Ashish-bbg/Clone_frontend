import axiosInstance from "./axiosInstance";

export const getUserProfile = async () => {
  const response = await axiosInstance.get("/userProfile");
  return response.data;
};

export const updateUserProfile = async (updatedUserData) => {
  const response = await axiosInstance.put("/userProfile", updatedUserData);
  return response.data;
};
