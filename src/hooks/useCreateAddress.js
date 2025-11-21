import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAddress } from "../api/addressApi";

export const useCreateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Failed to save address";
      console.error("Address save error", message, error);
    },
  });
};
