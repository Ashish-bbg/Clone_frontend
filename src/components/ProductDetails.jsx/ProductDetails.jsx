import { useParams } from "react-router-dom";
import { useProductById } from "../../queries/useProductsById";
import "./ProductDetails.css";
import { useAddToCart } from "../../hooks/useAddToCart";
const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError, error } = useProductById(id);

  const { mutate: addToCart, isPending } = useAddToCart();
  // console.log(cart);

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error?.message || "Something went wrong"}</h2>;
  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="product-details-container">
      <div className="product-left">
        <img src={product.images[0]} alt="product image" width="30%" />
      </div>
      <div className="product-right">
        <div className="product-details">
          <h4>{product.name}</h4>
          <div className="product-price-review">
            <h3>₹{product.price}</h3>
            <div className="reviews">
              <img src="../icons/star.png" alt="start image" width="10px" />
              <img src="../icons/star.png" alt="start image" width="10px" />
              <img src="../icons/star.png" alt="start image" width="10px" />
              <img src="../icons/star.png" alt="start image" width="10px" />
              <img src="../icons/star.png" alt="start image" width="10px" />
              <span>5.0</span>
              <span>(455)</span>
            </div>
          </div>
          <div className="product-fav-cart">
            <button>
              <img
                src="../icons/heart-outline.png"
                className="heart-outline"
                alt="favourite"
                width="20px"
              />
              Add to favourites
            </button>
            <button onClick={() => addToCart(id)} disabled={isPending}>
              <img src="../icons/cart.png" width="15px" />
              {isPending ? "Adding in cart..." : "Add to cart"}
            </button>
          </div>
        </div>
        <hr />
        <div className="product-description">
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
