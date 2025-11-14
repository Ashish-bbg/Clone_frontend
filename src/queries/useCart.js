import { useQuery } from "@tanstack/react-query";
import { getAllCartItems } from "../api/cartApi";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getAllCartItems,
    staleTime: 1000 * 60 * 5,
  });
};
