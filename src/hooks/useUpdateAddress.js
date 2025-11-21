import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAddress } from "../api/addressApi";

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updatedAddress }) => updateAddress(id, updatedAddress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
};
