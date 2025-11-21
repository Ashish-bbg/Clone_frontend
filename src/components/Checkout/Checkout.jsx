// import { useState } from "react";
import "./Checkout.css";
// import { useCreateAddress } from "../../hooks/useCreateAddress";
// import { useGetAddresses } from "../../queries/useGetAddresses";
// import { useUpdateAddress } from "../../hooks/useUpdateAddress";
// import toast from "react-hot-toast";
// import { useDeleteAddress } from "../../hooks/useDeleteAddress";
import AddressForm from "./AddressForm";
import OrderSummary from "./OrderSummary";
import { useAddressForm } from "../../hooks/useAddressForm";
import { useCart } from "../../queries/useCart";

// const INITIAL_ADDRESS_STATE = {
//   firstName: "",
//   lastName: "",
//   phoneNumber: "",
//   line1: "",
//   city: "",
//   state: "",
//   zip: "",
//   country: "",
// };

const Checkout = () => {
  // const { data: addresses = [], isLoading: isLoadingAddress } =
  //   useGetAddresses();
  // const { mutate: saveAddress, isPending: isSaving } = useCreateAddress();
  // const { mutate: updateAddress, isPending: isUpdating } = useUpdateAddress();
  // const { mutate: deleteAddress, isPending: isDeleting } = useDeleteAddress();

  // const [addressData, setAddressData] = useState(INITIAL_ADDRESS_STATE);
  // const [selectedEditId, setSelectedEditId] = useState(null);

  // const handleReset = () => {
  //   setAddressData(INITIAL_ADDRESS_STATE);
  //   setSelectedEditId(null);
  //   document.querySelector("#saved-address").value = "";
  // };

  // const handleAddressChange = (e) => {
  //   const { name, value } = e.target;
  //   setAddressData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleSelectAddress = (e) => {
  //   const selectedId = e.target.value;
  //   if (!selectedId) {
  //     setAddressData(INITIAL_ADDRESS_STATE);
  //     return;
  //   }
  //   // console.log(addresses);
  //   const addr = addresses.find((a) => a._id === selectedId);
  //   // console.log(addr);
  //   if (addr) {
  //     setSelectedEditId(selectedId);
  //     const nameParts = addr.name?.split(" ");
  //     setAddressData({
  //       firstName: nameParts?.[0] || "",
  //       lastName: nameParts?.[1] || "",
  //       phoneNumber: addr.phoneNumber,
  //       line1: addr.line1,
  //       city: addr.city,
  //       state: addr.state,
  //       zip: addr.zip,
  //       country: addr.country,
  //     });
  //   }
  // };

  // const handleDelete = () => {
  //   if (!selectedEditId) return;
  //   if (window.confirm("Are you sure you want to delete this address")) {
  //     deleteAddress(selectedEditId, {
  //       onSuccess: () => {
  //         handleReset();
  //       },
  //     });
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { firstName, lastName, ...rest } = addressData;
  //   console.log(addressData);
  //   const data = {
  //     ...rest,
  //     name: `${firstName} ${lastName}`.trim(),
  //     type: "home",
  //   };
  //   // console.log(data);
  //   if (selectedEditId) {
  //     // if update address
  //     // then call the update address
  //     updateAddress(
  //       { id: selectedEditId, updatedAddress: data },
  //       {
  //         onSuccess: () => {
  //           // console.log("Address updated");
  //           toast.success("Address Updated Successfully");
  //         },
  //       }
  //     );
  //   } else {
  //     // new address
  //     saveAddress(data, {
  //       onSuccess: () => {
  //         // setAddressData(INITIAL_ADDRESS_STATE);
  //         handleReset();
  //         toast.success("Address saved Successfully");
  //         // console.log("address saved in db");
  //       },
  //     });
  //   }
  // };

  // const isPending = isSaving || isUpdating;

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
