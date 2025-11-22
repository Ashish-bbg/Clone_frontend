import "./Checkout.css";
import AddressForm from "./AddressForm";
import OrderSummary from "./OrderSummary";
import { useAddressForm } from "../../hooks/useAddressForm";
import { useCart } from "../../queries/useCart";
import { usePlaceOrder } from "../../hooks/usePlaceOrder";
import { useState } from "react";

const Checkout = () => {
  const formLogic = useAddressForm();
  const { data: cartData } = useCart();
  const { mutate: placeOrder, isPending: isPlacingOrder } = usePlaceOrder();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  // console.log(cartData);

  // handle place button on OrderSummary.jsx
  const handlePlaceOrder = () => {
    const addressId = formLogic.selectedEditId;
    // check if addressid is selected or not
    if (!addressId) {
      alert("Please select a saved address to delivery to.");
      return;
    }
    // place order
    placeOrder({
      shippingAddressId: addressId,
      paymentMethod: "COD", // we will change it later
    });
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
