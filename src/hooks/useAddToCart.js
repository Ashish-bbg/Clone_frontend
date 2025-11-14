import { addItemToCart } from "../api/cartApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// export const useAddToCart = (id) => {
//   const [adding, setAdding] = useState(false);

//   const addToCart = async () => {
//     try {
//       setAdding(true);
//       // console.log("Adding...");
//       const response = await addItemToCart(id);
//       console.log(response.message);
//     } catch (err) {
//       console.error(
//         "Failed to add to cart:",
//         err.response?.data?.message || err.message
//       );
//     } finally {
//       setAdding(false);
//     }
//   };
//   return { addToCart, adding };
// };

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addItemToCart,
    onMutate: async (newItem) => {
      await queryClient.cancelQueries(["cart"]);
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
        // const totalItems = updatedItems.reduce(
        //   (sum, item) => sum + item.quantity,
        //   0
        // );
        return { ...oldCart, items: updatedItems, totalAmount };
      });
      return { previousCart };
    },
    onError: (_err, _newItem, context) => {
      queryClient.setQueriesData(["cart"], context.previousCart);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });
};
