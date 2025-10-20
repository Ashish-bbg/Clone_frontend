import { Link } from "react-router-dom";
import Logo from "../../assets/Logo1.png";
import "./Navbar.css";
const Navbar = () => {
  return (
    <>
      <div className="nav-parent">
        <div className="nav-child-logo">
          <Link to="/">
            <img src={Logo} alt="" className="nav-bar-logo" />
          </Link>
        </div>
        <div className="nav-child-logo">
          <span>
            <Link to="/">Home</Link>
          </span>
        </div>
        <div className="nav-child-logo">
          <span>
            <a href="#">Best Sellers</a>
          </span>
        </div>
        <div className="nav-child-logo">
          <span>
            <a href="#">Today's Deals</a>
          </span>
        </div>
        <div className="nav-child-search">
          <input type="text" placeholder="🔍Search for Products" />
        </div>
        <div className="nav-child-cart">
          <img
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/header_cart-eed150.svg"
            alt="cart"
          />
          <span>Cart</span>
        </div>
        <div className="nav-child-login">
          <img
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"
            alt="login"
          />
          <span>
            <Link to="/signup">Signup</Link>
          </span>
        </div>
        <div className="nav-child-login">
          <img
            src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"
            alt="login"
          />
          <span>Login</span>
        </div>
        <div className="nav-child-seller">
          <img
            src="	https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/Store-9eeae2.svg"
            alt="Become a seller"
          />
          <span>Become a Seller</span>
        </div>
      </div>
      <div className="border"></div>
    </>
  );
};

export default Navbar;
