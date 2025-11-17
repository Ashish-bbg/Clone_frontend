import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartItem } from "../api/cartApi";

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, newQuantity }) =>
      updateCartItem(productId, newQuantity),
    onMutate: async ({ productId, newQuantity }) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousCart = queryClient.getQueryData(["cart"]);

      queryClient.setQueryData(["cart"], (oldData) => {
        if (!oldData) return oldData;
        const updateItems = oldData.items.map((item) => {
          if (item.productId === productId)
            return {
              ...item,
              quantity: newQuantity,
            };
          return item;
        });

        // console.log(updateItems);
        const totalAmount = updateItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        return {
          ...oldData,
          items: updateItems,
          totalAmount,
        };
      });
      return { previousCart };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], (oldData) => {
        if (!oldData) return;
        return {
          ...oldData,
          totalAmount: data.totalAmount,
        };
      });
    },
    onError: (_err, _variables, context) => {
      if (context.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
    },
  });
};
