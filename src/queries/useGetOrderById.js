import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../api/orderApi";

export const useGetOrderById = (orderId) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
    retry: false,
  });
};
