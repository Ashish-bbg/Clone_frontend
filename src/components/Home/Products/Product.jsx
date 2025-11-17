import { Link } from "react-router-dom";
import "./Product.css";
import { useAddToCart } from "../../../hooks/useAddToCart";
import { useCart } from "../../../queries/useCart";
import { useUpdateCartItem } from "../../../hooks/useUpdateCartItem";

const Product = ({ name, price, img, id }) => {
  // console.log(id);
  const { data: cart, isLoading: isCartLoading } = useCart();
  const { mutate: addToCart, isPending: isAdding } = useAddToCart();
  const { mutate: updateQuantity, isPending: isUpdating } = useUpdateCartItem();

  const handleAddToCartClick = () => {
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
      };
      addToCart(cartProduct);
    }
  };

  const isPending = isCartLoading || isAdding || isUpdating;

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
          <button onClick={handleAddToCartClick} disabled={isPending}>
            <img src="./icons/cart.png" width="15px" />
            {isPending ? "Adding in cart..." : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
