import { useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "../../api/userProfileApi";
import { useState } from "react";

const AccountDetails = ({ user }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const queryClient = useQueryClient();

  const handleOnEdit = async (e) => {
    e.preventDefault();
    setIsEdit(!isEdit);
    // means it's in save state and when user click we need to call the api
    if (isEdit) {
      try {
        if (phoneNumber === user.phoneNumber) return;
        const response = await updateUserProfile({ phoneNumber });

        await queryClient.setQueryData(["authUser"], (oldData) => {
          return { ...oldData, ...response };
        });
        // console.log(response);
        setPhoneNumber(response?.phoneNumber);
      } catch (error) {
        console.error("Error occured", error);
      }
    }
  };

  return (
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
            <div className="account-left-edit">
              <h6>Phone Number</h6>
              <span onClick={handleOnEdit} className="account-edit-btn">
                {isEdit ? (
                  "Save"
                ) : (
                  <img src="../../icons/edit.png" alt="edit" height={"15px"} />
                )}
              </span>
            </div>
            {isEdit ? (
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            ) : (
              <span>{phoneNumber}</span>
            )}
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
              Accenture Services Pvt. Ltd., Survey No. 115, WaveRock Building,
              Nanakramguda, Hyderabad, Telangana, 500008
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
