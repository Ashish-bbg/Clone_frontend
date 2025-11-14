import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductById } from "../api/productApi";

export const useProductById = (id) => {
  const queryClient = useQueryClient();

  const searchProductById = async (id) => {
    const allProducts = queryClient.getQueryData(["products"]);
    const product = allProducts?.products?.find((p) => p._id === id);

    if (product) {
      // console.log("Cache hit");
      return product;
    }
    // console.log("Fetching from API");
    return await getProductById(id);
  };
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => searchProductById(id),
    staleTime: 1000 * 60 * 5,
  });
};
