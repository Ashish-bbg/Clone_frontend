import axiosInstance from "./axiosInstance";

export const doPayment = async () => {
  const response = await axiosInstance.post("/payment/create-order");
  return response.data;
};
