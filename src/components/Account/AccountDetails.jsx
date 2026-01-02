import { useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "../../api/userProfileApi";
import { useState } from "react";
import { useAddressForm } from "../../hooks/useAddressForm";
import AddressForm from "../AddressForm/AddressForm";

const AccountDetails = ({ user }) => {
  const queryClient = useQueryClient();

  const [isEdit, setIsEdit] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);

  const [editingAddressId, setEditingAddressId] = useState(null);

  const formLogic = useAddressForm();

  // console.log(user.addresses);

  const handlePhoneEdit = async () => {
    // toggle edit mode
    if (!isEdit) {
      setIsEdit(true);
      return;
    }

    // save mode
    try {
      if (phoneNumber === user.phoneNumber) {
        setIsEdit(false);
        return;
      }

      const response = await updateUserProfile({ phoneNumber });

      queryClient.setQueryData(["authUser"], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          phoneNumber: response.phoneNumber,
        };
      });

      setIsEdit(false);
    } catch (error) {
      console.error("Error updating phone number", error);
    }
  };

  const handleEditAddress = (addressId) => {
    setEditingAddressId((prev) => (prev === addressId ? null : addressId));
  };

  return (
    <div className="account-container">
      <h4>Account details</h4>
      <hr />

      <div className="account-info">
        {/* LEFT SIDE */}
        <div className="account-info-left">
          <div>
            <h6>Email address</h6>
            <span>{user?.email}</span>
          </div>

          <div>
            <div className="account-left-edit">
              <h6>Phone Number</h6>
              <span onClick={handlePhoneEdit} className="account-edit-btn">
                {isEdit ? (
                  "Save"
                ) : (
                  <img src="../../icons/edit.png" alt="edit" height="15" />
                )}
              </span>
            </div>

            {isEdit ? (
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            ) : !user?.phoneNumber ? (
              "Update your phNo."
            ) : (
              <span>{user?.phoneNumber}</span>
            )}
          </div>

          <div>
            <h6>Country</h6>
            <span>Asia India</span>
          </div>
        </div>

        <div className="account-info-right">
          {!user?.addresses?.length ? (
            <AddressForm {...formLogic} />
          ) : (
            user?.addresses?.map((address) => (
              <div key={address._id}>
                <div className="flex-box">
                  <h6 style={{ textTransform: "capitalize" }}>
                    {address.type} Address
                  </h6>

                  {editingAddressId === address._id ? (
                    <span
                      onClick={() => handleEditAddress(address._id)}
                      style={{ cursor: "pointer" }}
                    >
                      Cancel
                    </span>
                  ) : (
                    <img
                      src="../../icons/edit.png"
                      height="15"
                      className="edit-btn-img"
                      onClick={() => handleEditAddress(address._id)}
                    />
                  )}
                </div>

                {editingAddressId === address._id ? (
                  <AddressForm {...formLogic} />
                ) : (
                  <>
                    <strong>{address.name}: </strong>
                    <span>
                      {address.line1}, {address.city}, {address.state},{" "}
                      {address.zip} - {address.country}
                    </span>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
