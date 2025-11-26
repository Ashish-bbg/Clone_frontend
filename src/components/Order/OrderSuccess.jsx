import { Link, useLocation, useParams } from "react-router-dom";
import "./OrderSuccess.css";
const OrderSuccess = () => {
  const { orderId } = useParams();
  const location = useLocation();

  const instantOrder = location.state?.orderData;
  // console.log(instantOrder);
  return (
    <div className="order-success-container">
      {/* Success Icon */}
      <div className="order-success">
        <img src="../icons/order-success.png" alt="Success" width="80px" />
      </div>

      <h2 className="order-success-head">Order Placed Successfully!</h2>
      <p className="order-success-Desc">Thank you for your purchase.</p>

      <div className="order-success-id">
        <span>Order ID: </span>
        <strong>{orderId}</strong>
      </div>
      <p>Total Paid: ₹{instantOrder?.totalAmount}</p>
      <p>Payment Mode: {instantOrder?.paymentMethod}</p>
      <p className="order-success-email">
        We will send you an email confirmation shortly.
      </p>

      <div className="continue-shopping">
        <Link to="/">
          <button className="continue-shopping-btn">Continue Shopping</button>
        </Link>

        {/* We will build this page later */}
        <Link to="/my-orders">
          <button className="order-btn">View My Orders</button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
