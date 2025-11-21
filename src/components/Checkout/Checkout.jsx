import "./Checkout.css";
import AddressForm from "./AddressForm";
import OrderSummary from "./OrderSummary";
import { useAddressForm } from "../../hooks/useAddressForm";
import { useCart } from "../../queries/useCart";

const Checkout = () => {
  const formLogic = useAddressForm();
  const { data: cartData } = useCart();
  console.log(cartData);
  return (
    <div>
      <div className="checkout-parent">
        <AddressForm {...formLogic} />
        <OrderSummary
          addressData={formLogic?.addressData}
          cartItem={cartData?.items || []}
          totalAmount={cartData?.totalAmount}
        />
      </div>
    </div>
  );
};

export default Checkout;
