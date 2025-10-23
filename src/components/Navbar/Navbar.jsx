import { Link } from "react-router-dom";
import Logo from "../../assets/Logo1.png";
import "./Navbar.css";
import { useAuth } from "../../context/useAuth.js";
import { logout } from "../../api/registerApi.js";
import { useState } from "react";
const Navbar = () => {
  const { user, setUser } = useAuth();
  console.log(user);
  const [loading, setLoading] = useState(false);
  const handleSignout = async () => {
    try {
      setLoading(true);
      const message = await logout();
      console.log(message);
      setUser(null);
      setLoading(false);
    } catch (err) {
      console.log("Logout failed", err);
    }
  };
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

        {!user ? (
          <>
            <div className="nav-child-login">
              <Link to="/signup">
                <img
                  src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"
                  alt="login"
                />
                <span>Signup</span>
              </Link>
            </div>
            <div className="nav-child-login">
              <Link to="/login">
                <img
                  src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/profile-52e0dc.svg"
                  alt="login"
                />
                <span>Login</span>
              </Link>
            </div>
          </>
        ) : (
          <div className="dropdown">
            <a
              className="btn dropdown-toggle capatalize"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {user ? user.name : "Account"}
            </a>

            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  My Account
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  My Orders
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Favourites
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Delivery Addresses
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Billing Data
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={handleSignout}>
                  {loading ? "Signing out..." : "Sign Out"}
                </a>
              </li>
            </ul>
          </div>
        )}

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
