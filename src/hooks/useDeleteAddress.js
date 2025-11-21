import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAddress } from "../api/addressApi";
import toast from "react-hot-toast";

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Address Deleted");
    },
    onError: () => {
      toast.error("Failed to Delete Address");
    },
  });
};
