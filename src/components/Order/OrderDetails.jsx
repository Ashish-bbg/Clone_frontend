import "./OrderDetails.css";
import { useParams } from "react-router-dom";
import { useGetOrderById } from "../../queries/useGetOrderById";
import { formatDate } from "../../utiles/formatDate";
import OrderItem from "../OrderItem";
import { useQueryClient } from "@tanstack/react-query";

const OrderDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: order, isLoading, isError } = useGetOrderById(id);

  if (isLoading) {
    return <h1>Loading order details...</h1>;
  }

  if (isError || !order) {
    return <h1>Order not found</h1>;
  }
  // console.log(order);

  const getCachedProductImage = (prodId) => {
    const allProductsData = queryClient.getQueryData(["products"]);
    const products = allProductsData?.products;
    const foundProduct = products?.find((p) => p._id === prodId);

    return foundProduct?.images?.[0];
  };

  const formattedItems = order.items.map((item) => {
    const pId =
      typeof item.productId === "object" ? item.productId?._id : item.productId;

    const backendImage = item.productId?.images?.[0];
    return {
      productId: pId,
      name: item.productId?.name,
      price: item.price,
      quantity: item.quantity,
      img:
        backendImage ||
        getCachedProductImage(pId) ||
        "../icons/new-product.png",
    };
  });

  const steps = [
    {
      status: "Order placed",
      date: order?.createdAt,
      icon: "../icons/order_placed.png",
    },
    {
      status: "Payment accepted",
      date: order?.createdAt,
      icon: "../icons/payment_accepted.png",
    }, // Assuming immediate payment
    {
      status: "Shipped",
      date: order?.updatedAt,
      icon: "../icons/warehouse.png",
    },
    {
      status: "Out for Delivery",
      date: "Today",
      icon: "../icons/fast-delivery.png",
    },
    { status: "Delivered", date: "Tomorrow", icon: "../icons/delivered.png" },
  ];

  const statusStepMap = {
    pending: 1, // Highlights 'Order Placed' & 'Payment'
    processing: 2, // Highlights up to 'Warehouse'
    shipped: 3, // Highlights up to 'Out for Delivery'
    delivered: 4, // Highlights everything
    cancelled: -1,
  };

  const currentStepIndex = statusStepMap[order?.status] || 0;

  return (
    <div className="order-track-container">
      <h3>Track the delivery of order #{id}</h3>
      <div className="order-track">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`order-track-status ${
              index <= currentStepIndex ? "active" : ""
            }`}
          >
            <img src={step.icon} alt="" height="30px" />
            <span>
              {index <= currentStepIndex ? formatDate(step.date) : "Est."}
            </span>
            <span>{step.status}</span>
          </div>
        ))}
      </div>

      <div className="order-track-items">
        <div className="order-items">
          <OrderItem items={formattedItems} />
        </div>
        <div className="order-track-details">
          <h3>Order Details</h3>
          <div className="order-track-data">
            <span>Order date</span>
            <span>{formatDate(order?.createdAt)}</span>
          </div>
          <div className="order-track-data">
            <span>Email</span>
            <span>name@example.com</span>
          </div>
          <div className="order-track-data">
            <span>Phone</span>
            <span>{order?.shippingAddress?.phoneNumber}</span>
          </div>
          <div className="order-track-data">
            <span>Payment method</span>
            <span>{order?.paymentMethod}</span>
          </div>
          <div className="order-track-data">
            <span>Shipping address</span>
            <span>
              {order?.shippingAddress?.line1} {order?.shippingAddress?.city},{" "}
              {order?.shippingAddress?.state} - {order?.shippingAddress?.zip}{" "}
              {order?.shippingAddress?.country}
            </span>
          </div>
          <div className="order-track-data">
            <span>
              <strong>Total price</strong>
            </span>
            <span>
              <strong>₹7198</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
