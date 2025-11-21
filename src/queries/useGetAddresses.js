import { useQuery } from "@tanstack/react-query";
import { getAllAddress } from "../api/addressApi";

export const useGetAddresses = () => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: getAllAddress,
  });
};
