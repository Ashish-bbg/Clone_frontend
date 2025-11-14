import { Link } from "react-router-dom";
import "./Product.css";
import { useAddToCart } from "../../../hooks/useAddToCart";

const Product = ({ name, price, img, id }) => {
  // console.log(id);
  const { mutate: addToCart, isPending } = useAddToCart();
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
          <button onClick={() => addToCart(id)} disabled={isPending}>
            <img src="./icons/cart.png" width="15px" />
            {isPending ? "Adding in cart..." : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
