import "./Cart.css";
import { useCart } from "../../queries/useCart";
import { useDeleteFromCart } from "../../hooks/useDeleteFromCart";
import { useUpdateCartItem } from "../../hooks/useUpdateCartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const { data, isLoading, error } = useCart();

  // console.log(data.items.length);
  // 1. calling mutation to delete cart item
  const { mutate: deleteItem, isPending: isDeleting } = useDeleteFromCart();

  const { mutate: updateQuantity } = useUpdateCartItem();

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Cart is Empty please add some items</h1>;

  const cartItem = data?.items || [];
  const totalQuantity = data?.items?.length || 0;
  const totalAmount = data?.totalAmount || 0;

  if (cartItem.length === 0) {
    return (
      <div className="empty-cart-container">
        <img src="../icons/empty-cart.png" alt="Empty Cart" width="150px" />
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/">
          <button className="empty-cart-btn">Continue Shopping</button>
        </Link>
      </div>
    );
  }

  // console.log(data);
  const handleDelete = (productId) => {
    deleteItem(productId);
  };

  const handleDecrease = (productId, quantity) => {
    if (quantity === 1) deleteItem(productId);
    else updateQuantity({ productId, newQuantity: quantity - 1 });
  };
  const handleIncrease = (productId, quantity) => {
    updateQuantity({ productId, newQuantity: quantity + 1 });
  };

  return (
    <div className="cart-container">
      <h4>Shopping Cart ({totalQuantity})</h4>
      <div className="cart-parent">
        <div className="cart-left">
          <div className="cart-items">
            {cartItem?.map((item) => (
              <div className="cart-item" key={item?.productId}>
                <img
                  src={item?.img ?? item?.images[0]}
                  alt="img"
                  width="60px"
                />
                <div className="cart-desc">
                  <Link to={`/product/${item.productId}`} className="prod-link">
                    <p>{item?.name}</p>
                  </Link>
                  <button className="fav-btn">Add to Favourites</button>
                  <button
                    onClick={() => handleDelete(item?.productId)}
                    disabled={isDeleting}
                  >
                    <img src="../icons/cross.png" height="12px" /> Remove
                  </button>
                </div>
                <div className="cart-count">
                  <button
                    className="decrease-btn"
                    onClick={() =>
                      handleDecrease(item.productId, item.quantity)
                    }
                  >
                    {item.quantity > 1 ? (
                      "-"
                    ) : (
                      <img src="../icons/trash.png" height="12px" />
                    )}
                  </button>

                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleIncrease(item.productId, item.quantity)
                    }
                  >
                    +
                  </button>
                </div>
                <div className="cart-price">
                  <span>{item?.price}₹</span>
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
                <span>{totalAmount}₹</span>
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
                <span>{totalAmount}₹</span>
              </div>
              <Link to="/checkout">
                <button className="checkout-btn">Proceed to Checkout</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
