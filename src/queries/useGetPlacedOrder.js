import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "../api/orderApi";

export const useGetPlacedOrder = () => {
  return useQuery({
    queryKey: ["order"],
    queryFn: getMyOrders,
    refetchOnMount: true,
    staleTime: 0,
  });
};
