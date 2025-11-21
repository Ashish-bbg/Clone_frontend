const OrderSummary = ({ addressData, cartItem, totalAmount }) => {
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
      <div className="checkout-details-container">
        {cartItem.map((cart) => (
          <div className="checkout" key={cart.productId}>
            <img
              src={cart?.images?.[0] || cart.img}
              alt="cart item image"
              className="checkout-prod-img"
            />
            <p className="checkout-title">{cart.name}</p>
            {cart.quantity > 1 && (
              <span className="checkout-quantity">x{cart.quantity}</span>
            )}
            <span className="checkout-price">
              ₹{cart.price * cart.quantity}
            </span>
          </div>
        ))}
      </div>
      <div className="order-summary-container">
        <h4>Order Summary</h4>
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
          <button>Continue to payment </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
