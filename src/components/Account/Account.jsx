import "./Account.css";
import { useAuth } from "../../context/useAuth";
import { useSignout } from "../../hooks/useSignout";
const Account = () => {
  const { user } = useAuth();
  const { loading, signout } = useSignout();
  return (
    <div>
      <div className="account-parent">
        <div className="account-left">
          <div className="profile-main">
            <div className="profile-info">
              <div>
                <img
                  src="data:image/jpeg;base64,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"
                  alt="profile image"
                  className="profile-img"
                />
              </div>
              <div>
                <span>{user?.name}</span>
                <p>{user?.email}</p>
              </div>
            </div>
          </div>
          <div className="profile-details">
            <div>
              <img src="./icons/orders.png" alt="orders icon" width="30px" />
              <span>My orders</span>
            </div>
            <div>
              <img src="./icons/reviews.png" alt="reviews icon" width="30px" />
              <span>Reviews</span>
            </div>
            <div>
              <img src="./icons/delivery.png" alt="reviews icon" width="30px" />
              <span>Delivery addresses</span>
            </div>
            <div>
              <img src="./icons/cart.png" alt="reviews icon" width="30px" />
              <span>Cart</span>
            </div>
            <div>
              <img
                src="./icons/favourites.png"
                alt="reviews icon"
                width="30px"
              />
              <span>Favourite items</span>
            </div>
            <div>
              <img src="./icons/settings.png" alt="reviews icon" width="30px" />
              <span>Settings</span>
            </div>
            <div onClick={signout}>
              <img src="./icons/logout.png" alt="reviews icon" width="30px" />
              <span>{loading ? "Logging out..." : "Logout"}</span>
            </div>
          </div>
        </div>
        <div className="account-right">
          <div className="header-items">
            <div className="item">
              <img
                src="./icons/favourites.png"
                alt="favourite product icon"
                width="25px"
              />
              <div className="item-details">
                <span>Favourite products</span>
                <span>455</span>
              </div>
            </div>
            <div className="item">
              <img src="./icons/orders.png" alt="orders icon" width="25px" />
              <div className="item-details">
                <span>Total orders</span>
                <span>124</span>
              </div>
            </div>
            <div className="item">
              <img src="./icons/reviews.png" alt="review icon" width="25px" />
              <div className="item-details">
                <span>Reviews added</span>
                <span>1285</span>
              </div>
            </div>
            <div className="item">
              <img src="./icons/cart.png" alt="cart icon" width="25px" />
              <div className="item-details">
                <span>Cart</span>
                <span>4</span>
              </div>
            </div>
          </div>
          <div className="account-container">
            <h4>Account details</h4>
            <hr />
            <div className="account-info">
              <div className="account-info-left">
                <div>
                  <h6>Email address</h6>
                  <span>{user?.email}</span>
                </div>
                <div>
                  <h6>Phone Number</h6>
                  <span>+91 9455109348</span>
                </div>
                <div>
                  <h6>Country</h6>
                  <span>Asia India</span>
                </div>
              </div>
              <div className="account-info-right">
                <div>
                  <h6>Home Address</h6>
                  <span>
                    1st EME Centre RdCavalry Barracks Defence Officer's Colony,
                    Bolarum, Secunderabad, Telangana 500087
                  </span>
                </div>
                <div>
                  <h6>Delivery Address</h6>
                  <span>
                    Accenture Services Pvt. Ltd., Survey No. 115, WaveRock
                    Building, Nanakramguda, Hyderabad, Telangana, 500008
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="order">
            <h4>Active orders</h4>
            <hr />
            <div className="order-items">
              <div className="order-item">
                <div className="order-id order-column">
                  <span>Order ID:</span>
                  <span>#QPELKD987SDNI</span>
                </div>
                <div className="order-date order-column">
                  <span>Date:</span>
                  <span>28.09.2025</span>
                </div>
                <div className="order-price order-column">
                  <span>Price:</span>
                  <span>₹9850</span>
                </div>
                <div className="order-status order-column">
                  <span>Status:</span>
                  <span>In transit</span>
                </div>
              </div>
              <hr />
              <div className="order-item">
                <div className="order-id order-column">
                  <span>Order ID:</span>
                  <span>#QPELKD987SDNI</span>
                </div>
                <div className="order-date order-column">
                  <span>Date:</span>
                  <span>28.09.2025</span>
                </div>
                <div className="order-price order-column">
                  <span>Price:</span>
                  <span>₹9850</span>
                </div>
                <div className="order-status order-column">
                  <span>Status:</span>
                  <span>In transit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
