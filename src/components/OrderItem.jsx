import { Link } from "react-router-dom";

const OrderItem = ({ items }) => {
  return (
    <div className="checkout-details-container">
      {items.map((item) => (
        <div className="checkout" key={item.productId}>
          <img
            src={item?.images?.[0] || item.img}
            alt="cart item image"
            className="checkout-prod-img"
          />
          <Link to={`/product/${item.productId}`} className="prod-link">
            <p className="checkout-title">{item.name}</p>
          </Link>
          {item.quantity > 1 && (
            <span className="checkout-quantity">x{item.quantity}</span>
          )}
          <span className="checkout-price">₹{item.price * item.quantity}</span>
        </div>
      ))}
    </div>
  );
};

export default OrderItem;
