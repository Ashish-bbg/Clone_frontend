import { useParams } from "react-router-dom";
import { useProductById } from "../../queries/useProductsById";
import "./ProductDetails.css";
import { useAddToCart } from "../../hooks/useAddToCart";
import { useAuth } from "../../context/useAuth";
import { useUpdateCartItem } from "../../hooks/useUpdateCartItem";
import { useCart } from "../../queries/useCart";
const ProductDetails = () => {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const { id } = useParams();
  const { data: product, isLoading, isError, error } = useProductById(id);
  // console.log(product);

  const { data: cart, isLoading: isCartLoading } = useCart(isLoggedIn);

  const { mutate: addToCart, isPending: isAdding } = useAddToCart();
  const { mutate: updateQuantity, isPending: isUpdating } = useUpdateCartItem();

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error?.message || "Something went wrong"}</h2>;
  if (!product) return <h2>Product not found</h2>;

  const handleAddToCartClick = () => {
    if (!isLoggedIn) return;
    const existingItem = cart?.items?.find((item) => item.productId === id);
    if (existingItem) {
      // updateQuantity
      updateQuantity({
        productId: existingItem.productId,
        newQuantity: existingItem.quantity + 1,
      });
    } else {
      const cartProduct = {
        name: product.name,
        quantity: 1,
        price: product.price,
        img: product.images?.[0],
        productId: product?._id,
      };
      addToCart(cartProduct);
    }
  };

  const isActionProcessing = isAdding || isUpdating;
  const isButtonDisabled = isCartLoading || isActionProcessing;

  // console.log(product);

  return (
    <div className="product-details-container">
      <div className="product-left">
        <img src={product.images?.[0]} alt="product image" width="30%" />
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
            {isLoggedIn && (
              <button
                onClick={handleAddToCartClick}
                disabled={isButtonDisabled}
              >
                <img src="../icons/cart.png" width="15px" />
                {isActionProcessing ? "Adding in cart..." : "Add to cart"}
              </button>
            )}
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
