import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Account from "./components/Account/Account";
import Cart from "./components/Cart/Cart";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails.jsx/ProductDetails";
import Checkout from "./components/Checkout/Checkout";
import { Toaster } from "react-hot-toast";
import OrderSuccess from "./components/Order/OrderSuccess";
import Policy from "./pages/Policy";
import Footer from "./pages/Footer";
import PageNotFound from "./pages/PageNotFound";
import MyOrder from "./components/Order/MyOrder";
import OrderDetails from "./components/Order/OrderDetails";

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
        <Route path="/my-orders" element={<MyOrder />} />
        <Route path="/my-order/:id" element={<OrderDetails />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:orderId" element={<OrderSuccess />} />
          <Route path="/account" element={<Account />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
