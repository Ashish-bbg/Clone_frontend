import axiosInstance from "./axiosInstance";

export const createAddress = async (address) => {
  const response = await axiosInstance.post("/address", address);
  return response.data;
};

export const getAllAddress = async () => {
  const response = await axiosInstance.get("/address");
  return response.data;
};

export const updateAddress = async (addressId, address) => {
  const response = await axiosInstance.put(`/address/${addressId}`, address);
  return response.data;
};

export const deleteAddress = async (addressId) => {
  const response = await axiosInstance.delete(`/address/${addressId}`);
  return response.data;
};
