import OrderItem from "../OrderItem";

const OrderSummary = ({
  addressData,
  cartItem,
  totalAmount,
  handlePlaceOrder,
  isProcessing,
  paymentMethod,
  setPaymentMethod,
}) => {
  return (
    <div className="checkout-details-right">
      {(addressData.firstName || addressData.line1) && (
        <div className="delivery-preview">
          <div className="delivery-container">
            <img src="../icons/location.png" alt="loc" width="16px" />
            <h5 className="shippping-to">Shipping To:</h5>
          </div>

          <div className="delivery-address">
            <strong>
              {addressData.firstName} {addressData.lastName}
            </strong>
            <br />
            {addressData.line1}
            <br />
            {addressData.city}, {addressData.state} - {addressData.zip}
            <br />
            {addressData.country}
            <br />
            <span className="delivery-phone">
              Phone: {addressData.phoneNumber}
            </span>
          </div>
        </div>
      )}
      <OrderItem items={cartItem} />
      <div className="order-summary-container">
        <h4>Order Summary</h4>
        <hr />
        {/* payment selection area */}
        <div className="payment-methods" style={{ margin: "15px 0" }}>
          <h5 style={{ marginBottom: "10px", color: "#333" }}>
            Payment Method
          </h5>

          {/* COD OPTION */}
          <div
            style={{
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="radio"
              id="cod"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ cursor: "pointer" }}
            />
            <label
              htmlFor="cod"
              style={{ marginLeft: "8px", cursor: "pointer", fontSize: "14px" }}
            >
              Cash on Delivery (COD)
            </label>
          </div>

          {/* UPI / ONLINE OPTION */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="radio"
              id="upi"
              name="payment"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ cursor: "pointer" }}
            />
            <label
              htmlFor="upi"
              style={{ marginLeft: "8px", cursor: "pointer", fontSize: "14px" }}
            >
              UPI / Online Payment
            </label>
          </div>
        </div>

        <hr />
        <div className="order-summary">
          <div className="order-flex">
            <span>Original price</span>
            <span>6592</span>
          </div>
          <div className="order-flex">
            <span>Savings</span>
            <span>-399</span>
          </div>
          <div className="order-flex">
            <span>Delivery Charges</span>
            <span>50</span>
          </div>
          <hr />
          <div className="order-flex">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>
        <div className="order-flex mt-3">
          <button
            className="place-order-btn"
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            style={{
              opacity: isProcessing ? 0.7 : 1,
              cursor: isProcessing ? "not-allowed" : "pointer",
            }}
          >
            {isProcessing
              ? "Placing Order..."
              : paymentMethod === "COD"
              ? "Place order"
              : "Continue to payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
