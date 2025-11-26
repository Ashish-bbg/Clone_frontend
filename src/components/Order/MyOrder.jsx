import { Link } from "react-router-dom";
import { useGetPlacedOrder } from "../../queries/useGetPlacedOrder";
import "./MyOrder.css";
import { formatDate } from "../../utiles/formatDate";

const MyOrder = () => {
  const { data: myOrder, isLoading: orderLoading } = useGetPlacedOrder();

  // const formatDate = (isoString) => {
  //   if (!isoString) return "N/A";
  //   const date = new Date(isoString);

  //   return date.toLocaleString("en-IN", {
  //     day: "numeric",
  //     month: "short",
  //     year: "2-digit",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     hour12: true,
  //   });
  // };

  if (orderLoading) return <h2>Loading your orders...</h2>;
  //   console.log(myOrder);
  return (
    <div className="my-order-container">
      <div className="my-order-filters">
        <h3>My orders</h3>
      </div>
      <div className="my-order-container">
        {myOrder.map((order) => (
          <div className="my-order" key={order._id}>
            <div className="my-order-col">
              <span>Order ID:</span>
              <Link to={`/my-order/${order._id}`} className="order-link">
                <span>{order._id}</span>
              </Link>
            </div>
            <div className="my-order-col">
              <span>Date:</span>
              <span>{formatDate(order.createdAt)}</span>
            </div>
            <div className="my-order-col">
              <span>Price</span>
              <span>₹{order.totalAmount}</span>
            </div>
            <div className="my-order-col">
              <span>Status:</span>
              <span>{order.status}</span>
            </div>
            <div className="my-order-view-details">
              <button className="my-order-cancel">Cancel Order</button>
              <Link to={`/my-order/${order._id}`} className="order-link">
                <button className="my-order-details">View details</button>
              </Link>
            </div>
            <hr className="hr" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrder;
