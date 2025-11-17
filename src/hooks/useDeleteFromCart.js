import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartItem } from "../api/cartApi";

export const useDeleteFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCartItem,

    // This runs instantly when you call deleteItem(productId)
    onMutate: async (productId) => {
      //   1. cancle any outgoing query
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      //   2. get current data for safety rollback
      const previousCart = queryClient.getQueryData(["cart"]);
      //   3. optimally update the cache
      queryClient.setQueryData(["cart"], (oldCart) => {
        if (!oldCart) return oldCart;

        // filtering out the item which we want to delete
        let totalAmount = 0;
        const updatedItems = oldCart.items.filter((item) => {
          if (item.productId === productId) return false;
          totalAmount += item.price * item.quantity;
          // totalItems += item.quantity;
          return true;
        });

        return {
          ...oldCart,
          items: updatedItems,
          totalAmount,
          // totalItems: updatedItems.length,
        };
      });
      // 4. return the previous cart items so we can rollback on  error
      return { previousCart };
    },

    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], (oldData) => {
        if (!oldData) return;
        return {
          ...oldData,
          totalAmount: data.totalAmount,
          // totalItems: data.totalItems,
        };
      });
    },

    //if the mutation fails, roll back to previous state
    onError: (_err, _productId, context) => {
      if (context.previousCart)
        queryClient.setQueryData(["cart"], context.previousCart);
    },
    // After the mutation finishes (success or error),
    // refetch the cart to ensure data is 100% correct.
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ["cart"] });
    // },
  });
};
