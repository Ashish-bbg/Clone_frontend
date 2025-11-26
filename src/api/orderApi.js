import axiosInstance from "./axiosInstance";

export const placeOrder = async (orderData) => {
  const response = await axiosInstance.post("/orders", orderData);
  return response.data;
};

export const getMyOrders = async () => {
  const response = await axiosInstance.get("/orders/my");
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await axiosInstance.get(`/orders/${id}`);
  return response.data;
};
