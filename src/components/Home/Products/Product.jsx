import { Link } from "react-router-dom";
import "./Product.css";
import { useAddToCart } from "../../../hooks/useAddToCart";
import { useCart } from "../../../queries/useCart";
import { useUpdateCartItem } from "../../../hooks/useUpdateCartItem";
import { useAuth } from "../../../context/useAuth";

const Product = ({ name, price, img, id }) => {
  // console.log(id);
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const { data: cart, isLoading: isCartLoading } = useCart(isLoggedIn);
  const { mutate: addToCart, isPending: isAdding } = useAddToCart();
  const { mutate: updateQuantity, isPending: isUpdating } = useUpdateCartItem();

  // console.log(user); // giving obj like name, address, email etc if loggin else nothing
  const handleAddToCartClick = () => {
    if (!isLoggedIn) return;
    const existingItem = cart?.items?.find((item) => item.productId === id);
    if (existingItem) {
      updateQuantity({
        productId: existingItem.productId,
        newQuantity: existingItem.quantity + 1,
      });
      // console.log("inside update");
    } else {
      // console.log("inside new add");
      const cartProduct = {
        name,
        price,
        img,
        productId: id,
        quantity: 1,
      };
      addToCart(cartProduct);
    }
  };

  const isActionProcessing = isAdding || isUpdating;
  const isButtonDisabled = isCartLoading || isActionProcessing;

  return (
    <div className="product-container">
      <Link to={`/product/${id}`}>
        <div className="product-img">
          <img src={img} alt="" />
        </div>
      </Link>
      <div className="product-fav-offer">
        <span>Offer 35%</span>
        <span className="fav-icon">
          <img
            src="./icons/heart-outline.png"
            className="heart-outline"
            alt="favourite"
          />
          <img
            src="./icons/heart-fill.png"
            className="heart-filled"
            alt="favourite"
          />
        </span>
      </div>
      <div className="product-desc">
        <Link to={`/product/${id}`}>
          <h5 className="product-title">{name}</h5>
          <div className="reviews">
            <img src="./icons/star.png" alt="start image" width="10px" />
            <img src="./icons/star.png" alt="start image" width="10px" />
            <img src="./icons/star.png" alt="start image" width="10px" />
            <img src="./icons/star.png" alt="start image" width="10px" />
            <img src="./icons/star.png" alt="start image" width="10px" />
            <span>5.0</span>
            <span>(455)</span>
          </div>
        </Link>
        <div className="price-cart">
          <span>₹{price}</span>
          {isLoggedIn && (
            <button onClick={handleAddToCartClick} disabled={isButtonDisabled}>
              <img src="./icons/cart.png" width="15px" />
              {isActionProcessing ? "Adding in cart..." : "Add to cart"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
