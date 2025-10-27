import "./Cart.css";

const Cart = () => {
  return (
    <div className="cart-container">
      <h4>Shopping Cart</h4>
      <div className="cart-parent">
        <div className="cart-left">
          <div className="cart-items">
            <div className="cart-item">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                alt="img"
                width="60px"
              />
              <div className="cart-desc">
                <p>
                  PC system All in One APPLE iMac (2023) mqrq3ro/a, Apple M3,
                  24" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, Keyboard layout
                  INT
                </p>
                <button>💖Add to Favourites</button>
                <button>❌Remove</button>
              </div>
              <div className="cart-count">
                <button>-</button>
                <span>2</span>
                <button>+</button>
              </div>
              <div className="cart-price">
                <span>590₹</span>
              </div>
            </div>
            <div className="cart-item">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                alt="img"
                width="60px"
              />
              <div className="cart-desc">
                <p>
                  PC system All in One APPLE iMac (2023) mqrq3ro/a, Apple M3,
                  24" Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, Keyboard layout
                  INT
                </p>
                <button>💖Add to Favourites</button>
                <button>❌Remove</button>
              </div>
              <div className="cart-count">
                <button>-</button>
                <span>2</span>
                <button>+</button>
              </div>
              <div className="cart-price">
                <span>590₹</span>
              </div>
            </div>
          </div>
        </div>
        <div className="cart-right">
          <div className="cart-order">
            <h4>Order summary</h4>
            <div className="cart-total">
              <div className="cart-flex">
                <span>Original Price</span>
                <span>3093₹</span>
              </div>
              <div className="cart-flex">
                <span>Savings</span>
                <span>-403₹</span>
              </div>
              <div className="cart-flex">
                <span>Delivery charge</span>
                <span>50₹</span>
              </div>
              <div className="cart-flex">
                <span>Tax</span>
                <span>20₹</span>
              </div>
              <hr />
              <div className="cart-flex">
                <span>Total</span>
                <span>5098₹</span>
              </div>
              <button>Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
