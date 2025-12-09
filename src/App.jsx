import "./App.css";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

// Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Policy from "./components/Footer/Policy";
import Account from "./components/Account/Account";
import MyOrder from "./components/OrderCard/MyOrder";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// Pages direct pages
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";
import OrderSuccess from "./pages/Order/OrderSuccess";
import PageNotFound from "./pages/PageNotFound";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Checkout from "./pages/Checkout/Checkout";
import OrderDetails from "./pages/Order/OrderDetails";

function App() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Dummy Pages for Razorpay Verification */}
        <Route path="/terms-and-conditions" element={<Policy />} />
        <Route path="/privacy-policy" element={<Policy />} />
        <Route path="/refund-policy" element={<Policy />} />
        <Route path="/shipping-policy" element={<Policy />} />
        <Route path="/contact-us" element={<Policy />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:orderId" element={<OrderSuccess />} />
          <Route path="/account" element={<Account />} />
          <Route path="/my-orders" element={<MyOrder />} />
          <Route path="/my-order/:id" element={<OrderDetails />} />
        </Route>

        {/* 404 Not Found route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
