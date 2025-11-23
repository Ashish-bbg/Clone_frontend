import { useEffect, useState } from "react";
import { useGetAddresses } from "../queries/useGetAddresses";
import { useCreateAddress } from "./useCreateAddress";
import { useDeleteAddress } from "./useDeleteAddress";
import { useUpdateAddress } from "./useUpdateAddress";
import toast from "react-hot-toast";

const INITIAL_ADDRESS_STATE = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  line1: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};

export const useAddressForm = () => {
  // 1. All hooks
  const { data: addresses = [], isLoading: isLoadingAddress } =
    useGetAddresses();
  const { mutate: saveAddress, isPending: isSaving } = useCreateAddress();
  const { mutate: updateAddress, isPending: isUpdating } = useUpdateAddress();
  const { mutate: deleteAddress, isPending: isDeleting } = useDeleteAddress();

  //   2. State here
  const [addressData, setAddressData] = useState(INITIAL_ADDRESS_STATE);
  const [selectedEditId, setSelectedEditId] = useState(null);

  const [hasInitialFill, setHasInitialFill] = useState(false);

  // autofill adress if availabe
  useEffect(() => {
    if (!isLoadingAddress && addresses.length > 0 && !hasInitialFill) {
      const firstAddress = addresses[0];
      setSelectedEditId(firstAddress._id);
      const nameParts = firstAddress.name?.split(" ");
      setAddressData({
        firstName: nameParts?.[0] || "",
        lastName: nameParts?.slice(1).join(" ") || "",
        phoneNumber: firstAddress.phoneNumber,
        line1: firstAddress.line1,
        city: firstAddress.city,
        state: firstAddress.state,
        zip: firstAddress.zip,
        country: firstAddress.country,
      });
      setHasInitialFill(true);
    }
  }, [addresses, isLoadingAddress, hasInitialFill]);
  //   3. All function
  //   1. reset form
  const handleReset = () => {
    setAddressData(INITIAL_ADDRESS_STATE);
    setSelectedEditId(null);
    if (document.querySelector("#saved-address"))
      document.querySelector("#saved-address").value = "";
  };

  //   2. handle Address
  //   Setting all form data dynamically
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. handle select address drop-down
  const handleSelectAddress = (e) => {
    const selectedId = e.target.value;
    if (!selectedId) {
      setAddressData(INITIAL_ADDRESS_STATE);
      return;
    }
    // console.log(addresses);
    const addr = addresses.find((a) => a._id === selectedId);
    // console.log(addr);
    if (addr) {
      setSelectedEditId(selectedId);
      const nameParts = addr.name?.split(" ");
      setAddressData({
        firstName: nameParts?.[0] || "",
        lastName: nameParts?.[1] || "",
        phoneNumber: addr.phoneNumber,
        line1: addr.line1,
        city: addr.city,
        state: addr.state,
        zip: addr.zip,
        country: addr.country,
      });
    }
  };

  //   4. Handle delete address
  const handleDelete = () => {
    if (!selectedEditId) return;
    if (window.confirm("Are you sure you want to delete this address?")) {
      deleteAddress(selectedEditId, {
        onSuccess: () => {
          handleReset();
        },
      });
    }
  };

  //   5. Submitting address form
  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, ...rest } = addressData;
    // console.log(addressData);
    const data = {
      ...rest,
      name: `${firstName} ${lastName}`.trim(),
      type: "home",
    };
    // console.log(data);
    if (selectedEditId) {
      // if update address
      // then call the update address
      updateAddress(
        { id: selectedEditId, updatedAddress: data },
        {
          onSuccess: () => {
            // console.log("Address updated");
            toast.success("Address Updated Successfully");
          },
        }
      );
    } else {
      // new address
      saveAddress(data, {
        onSuccess: () => {
          // setAddressData(INITIAL_ADDRESS_STATE);
          handleReset();
          toast.success("Address saved Successfully");
          // console.log("address saved in db");
        },
      });
    }
  };

  //   6. checking loading state for update and new address
  const isPending = isSaving || isUpdating;

  //   4. returning everything Ui need
  return {
    addressData,
    addresses,
    selectedEditId,
    isLoadingAddress,
    isPending,
    isDeleting,
    handleAddressChange,
    handleSelectAddress,
    handleReset,
    handleDelete,
    handleSubmit,
  };
};
