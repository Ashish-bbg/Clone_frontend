import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrderById } from "../api/orderApi";

export const useGetOrderById = (orderId) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
    retry: false,
    initialData: () => {
      const allOrders = queryClient.getQueryData(["order"]);

      const existingOrder = allOrders?.find((order) => order._id === orderId);
      return existingOrder;
    },
    refetchOnMount: true,
    staleTime: 0,
  });
};
