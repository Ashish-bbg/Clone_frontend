import "./Product.css";

const Product = ({ name, price, img }) => {
  return (
    <div className="product-container">
      <div className="product-img">
        <img src={img} alt="" />
      </div>
      <div className="product-fav-offer">
        <span>Offer 35%</span>
        <span className="fav-icon">
          <img
            src="./icons/heart-outline.png"
            className="heart-outline"
            alt="favourite"
          />
          <img
            src="./icons/heart-fill.png"
            className="heart-filled"
            alt="favourite"
          />
        </span>
      </div>
      <div className="product-desc">
        <h5 className="product-title">{name}</h5>
        <div className="reviews">
          <img src="./icons/star.png" alt="start image" width="10px" />
          <img src="./icons/star.png" alt="start image" width="10px" />
          <img src="./icons/star.png" alt="start image" width="10px" />
          <img src="./icons/star.png" alt="start image" width="10px" />
          <img src="./icons/star.png" alt="start image" width="10px" />
          <span>5.0</span>
          <span>(455)</span>
        </div>
        <div className="price-cart">
          <span>₹{price}</span>
          <button>
            <img src="./icons/cart.png" width="15px" />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
