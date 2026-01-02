import { Link } from "react-router-dom";
import { useGetPlacedOrder } from "../../queries/useGetPlacedOrder";
import "./MyOrder.css";
import { formatDate } from "../../utiles/formatDate";
import { cancelOrderById } from "../../api/orderApi";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";

const MyOrder = () => {
  const { data: myOrder, isLoading: orderLoading } = useGetPlacedOrder();
  const queryClient = useQueryClient();

  const [cancellingId, setCancellingId] = useState(null);

  if (orderLoading) return <h2>Loading your orders...</h2>;
  if (myOrder.length === 0)
    return (
      <h4>
        You haven't order anything yet, please order{" "}
        <Link to="/" style={{ textDecoration: "underline", color: "blue" }}>
          visit here
        </Link>
      </h4>
    );

  const handleOrderCancel = async (orderId) => {
    setCancellingId(orderId);
    try {
      const data = await cancelOrderById(orderId);
      toast.success(data.message);

      const filterdOrder = myOrder.map((order) => {
        if (order._id === orderId) return { ...order, status: "cancelled" };
        return order;
      });
      queryClient.setQueryData(["order"], filterdOrder);
    } catch (error) {
      console.error("Error while cancelling order", error);
      toast.error(error?.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="my-order-container">
      <div className="my-order-filters">
        <h3>My orders ({myOrder?.length})</h3>
      </div>
      <div className="my-order-container">
        {myOrder?.map((order) => (
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
              <button
                className="my-order-cancel"
                onClick={() => handleOrderCancel(order._id)}
                disabled={
                  order.status === "cancelled" || order._id === cancellingId
                }
                style={{
                  opacity:
                    order.status === "cancelled" || order._id === cancellingId
                      ? 0.5
                      : 1,
                  cursor:
                    order.status === "cancelled" || order._id === cancellingId
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {order._id === cancellingId
                  ? "Cancelling order..."
                  : "Cancel Order"}
              </button>
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
