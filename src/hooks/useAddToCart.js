import { addItemToCart } from "../api/cartApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product) => addItemToCart(product.productId),
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousCart = queryClient.getQueryData(["cart"]);

      queryClient.setQueryData(["cart"], (oldCart) => {
        if (!oldCart) {
          return {
            items: [newItem],
            totalItems: 1,
            totalAmount: newItem.price,
          };
        }

        const existing = oldCart.items.find(
          (item) => item.productId === newItem.productId
        );

        let updatedItems;
        if (existing) {
          updatedItems = oldCart.items.map((item) =>
            item.productId === newItem.productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedItems = [...oldCart.items, { ...newItem, quantity: 1 }];
        }

        const totalAmount = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const totalItems = updatedItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        return { ...oldCart, items: updatedItems, totalAmount, totalItems };
      });
      return { previousCart };
    },

    onSuccess: (data) => {
      queryClient.setQueryData(["cart"], (oldData) => {
        if (!oldData) return;
        // console.log(oldData);
        return {
          // ...oldData,
          name: oldData.name,
          price: oldData.price,
          items: oldData.items,
          img: oldData.images?.[0],
          totalAmount: data.totalAmount,
        };
      });
    },

    onError: (_err, _newItem, context) => {
      if (context.previousCart)
        queryClient.setQueryData(["cart"], context.previousCart);
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ["cart"] });
    // },
  });
};
