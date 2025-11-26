import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../api/orderApi";

export const usePlaceOrder = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: placeOrder,
    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], null);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Order placed Successfully! 🎉");
      if (data?.order?._id) {
        // navigate to order_id page
        // console.log("order placed...");
        // console.log(data);
        navigate(`/order-success/${data.order._id}`, {
          state: { orderData: data.order },
        });
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Failed to place order";
      toast.error(message);
    },
  });
};
