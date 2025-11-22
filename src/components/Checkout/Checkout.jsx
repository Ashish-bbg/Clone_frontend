import "./Checkout.css";
import AddressForm from "./AddressForm";
import OrderSummary from "./OrderSummary";
import { useAddressForm } from "../../hooks/useAddressForm";
import { useCart } from "../../queries/useCart";
import { usePlaceOrder } from "../../hooks/usePlaceOrder";
import { useState } from "react";
import { loadRazorpayScript } from "../../utiles/loadRazorpayScript";
import { doPayment } from "../../api/paymentApi";

const Checkout = () => {
  const formLogic = useAddressForm();
  const { data: cartData } = useCart();
  const { mutate: placeOrder, isPending: isPlacingOrder } = usePlaceOrder();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  // console.log(cartData);

  // handle place button on OrderSummary.jsx
  const handlePlaceOrder = async () => {
    const addressId = formLogic.selectedEditId;
    // check if addressid is selected or not
    if (!addressId) {
      alert("Please select a saved address to delivery to.");
      return;
    }
    // CASE 1. COD
    if (paymentMethod === "COD") {
      // place order
      placeOrder({
        shippingAddressId: addressId,
        paymentMethod: "COD", // we will change it later
      });
      return;
    }
    // CASE 2. ONLINE
    if (paymentMethod === "UPI") {
      // LOAD RAZORPAY SDK SCRIPT
      const isLoading = await loadRazorpayScript();
      if (!isLoading) {
        alert("Razorpay SDK failed to load. Check your internet connection.");
        return;
      }

      try {
        // calling backend to get orderId
        const data = await doPayment();
        // re Razorpay Options
        const options = {
          key: data.keyId,
          amount: data.amount,
          currency: data.currency,
          name: "Amazon clone",
          description: "Order Payment",
          order_id: data.orderId, // created by razorpay

          // success handle
          // runs after payment successfull
          handle: function (resposne) {
            // console.log("Payment ID:", response.razorpay_payment_id);
            // console.log("Order ID:", response.razorpay_order_id);
            // console.log("Signature:", response.razorpay_signature);
            //  calling placeOrder to place order

            placeOrder({
              shippingAddressId: addressId,
              paymentMethod: "Online",
              paymentResult: {
                id: resposne.razorpay_payment_id,
                orderId: Response.razorpay_order_id,
                signature: resposne.razorpay_signature,
                status: "success",
              },
            });
          },
          prefill: {
            name: `${formLogic.addressData.firstName} ${formLogic.addressData.lastName}`,
            contact: formLogic.addressData.phoneNumber,
          },
          theme: {
            color: "#232f3e",
          },
        };

        // open razorpay options
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Payment initialization failed: ", error);
        alert("Something went wrong starting the payment.");
      }
    }
  };

  return (
    <div>
      <div className="checkout-parent">
        <AddressForm {...formLogic} />
        <OrderSummary
          addressData={formLogic?.addressData}
          cartItem={cartData?.items || []}
          totalAmount={cartData?.totalAmount}
          handlePlaceOrder={handlePlaceOrder}
          isProcessing={isPlacingOrder}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
      </div>
    </div>
  );
};

export default Checkout;
