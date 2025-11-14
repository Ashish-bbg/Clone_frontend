import "./Cart.css";
import { useCart } from "../../queries/useCart";
import { useEffect, useState } from "react";
import { deleteCartItem } from "../../api/cartApi";
import { useAddToCart } from "../../hooks/useAddToCart";

const Cart = () => {
  const [priceQuantity, setPriceQuantity] = useState({});

  const { data, isLoading, error } = useCart();
  // const { mutate: addToCart, isPending } = useAddToCart();
  useEffect(() => {
    if (data) {
      setPriceQuantity({
        totalAmount: data?.totalAmount,
        totalQuantity: data?.totalItems,
      });
    }
  }, [data]);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Something went wrong while fetching products.</h1>;

  const cartItem = data?.items || [];

  const handleDelete = async (productId) => {
    console.log(productId);
    console.log("preparing to delete this..");
    const data = await deleteCartItem(productId);
    console.log(data);
  };

  return (
    <div className="cart-container">
      <h4>Shopping Cart ({priceQuantity.totalQuantity})</h4>
      <div className="cart-parent">
        <div className="cart-left">
          <div className="cart-items">
            {cartItem?.map((item) => (
              <div className="cart-item" key={item.productId}>
                <img src={item.images[0]} alt="img" width="60px" />
                <div className="cart-desc">
                  <p>{item.name}</p>
                  <button className="fav-btn">Add to Favourites</button>
                  <button onClick={() => handleDelete(item.productId)}>
                    ❌Remove
                  </button>
                </div>
                <div className="cart-count">
                  <button>-</button>
                  <span>{item.quantity}</span>
                  <button>+</button>
                </div>
                <div className="cart-price">
                  <span>{item.price}₹</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="cart-right">
          <div className="cart-order">
            <h4>Order summary</h4>
            <div className="cart-total">
              <div className="cart-flex">
                <span>Original Price</span>
                <span>{priceQuantity.totalAmount}₹</span>
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
                <span>{priceQuantity.totalAmount}₹</span>
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
