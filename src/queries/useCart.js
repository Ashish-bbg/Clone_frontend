import { useQuery } from "@tanstack/react-query";
import { getAllCartItems } from "../api/cartApi";
import { useAuth } from "../context/useAuth";

export const useCart = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["cart"],
    queryFn: getAllCartItems,
    staleTime: 1000 * 60 * 5,
    enabled: !!user,
  });
};
