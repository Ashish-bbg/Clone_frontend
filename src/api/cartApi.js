import axiosInstance from "./axiosInstance";

export const getAllCartItems = async () => {
  const response = await axiosInstance.get("/cart");
  return response.data;
};

export const addItemToCart = async (productId) => {
  const response = await axiosInstance.post("/cart/add", { productId });
  return response.data;
};

export const updateCartItem = async (productId, quantity) => {
  const response = await axiosInstance.put(`/cart/${productId}`, { quantity });
  return response.data;
};

export const deleteCartItem = async (productId) => {
  const response = await axiosInstance.delete(`/cart/${productId}`);
  return response.data;
};
