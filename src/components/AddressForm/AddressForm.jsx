const AddressForm = ({
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
}) => {
  // console.log(addresses);
  return (
    // <div className="checkout-address-left">
    <div className="address-container">
      <h4>Shipping address</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-top-bottom">
          {selectedEditId && (
            <button
              type="button"
              onClick={handleReset}
              className="new_address_btn"
            >
              + Add New Address
            </button>
          )}
          {addresses.length > 0 && (
            <div>
              {isLoadingAddress ? (
                <h4>Addressess loading...</h4>
              ) : (
                <>
                  <label htmlFor="saved-address">Saved address</label>
                  <select
                    name="saved-address"
                    id="saved-address"
                    onChange={handleSelectAddress}
                    disabled={isLoadingAddress}
                  >
                    <option value="">
                      {isLoadingAddress
                        ? "Loading addressess..."
                        : "Choose one of your saved address"}
                    </option>
                    {addresses.map((addr) => (
                      <option key={addr._id} value={addr._id}>
                        {addr.name} - {addr.city}, {addr.zip}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>
          )}
        </div>
        <div className="seperate">
          <div>
            <label htmlFor="firstName">First Name*</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={addressData.firstName}
              onChange={handleAddressChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={addressData.lastName}
              onChange={handleAddressChange}
            />
          </div>
        </div>
        <div className="form-top-bottom">
          <label htmlFor="phoneNumber">Phone Number*</label>
          <input
            type="tel"
            name="phoneNumber"
            value={addressData.phoneNumber}
            onChange={handleAddressChange}
          />
        </div>
        <div className="form-top-bottom">
          <label htmlFor="line1">Shipping Address*</label>
          <textarea
            name="line1"
            id="line1"
            value={addressData.line1}
            onChange={handleAddressChange}
          />
        </div>
        <div className="seperate">
          <div>
            <label htmlFor="city">City*</label>
            <input
              type="text"
              name="city"
              value={addressData.city}
              onChange={handleAddressChange}
            />
          </div>
          <div>
            <label htmlFor="state">State*</label>
            <input
              type="text"
              name="state"
              value={addressData.state}
              onChange={handleAddressChange}
            />
          </div>
        </div>
        <div className="seperate">
          <div>
            <label htmlFor="zip">zip*</label>
            <input
              type="text"
              name="zip"
              value={addressData.zip}
              onChange={handleAddressChange}
            />
          </div>
          <div>
            <label htmlFor="country">Country*</label>
            <input
              type="text"
              value={addressData.country}
              name="country"
              onChange={handleAddressChange}
            />
          </div>
        </div>
        <button type="submit" disabled={isPending}>
          {isPending
            ? "Processing..."
            : selectedEditId
            ? "Update Address"
            : "Save new Address"}
        </button>
        {selectedEditId && (
          <button
            type="button"
            disabled={isDeleting}
            onClick={handleDelete}
            className="delete-btn"
          >
            {isDeleting ? "Deleting..." : "🗑️"}
          </button>
        )}
      </form>
    </div>
    // </div>
  );
};

export default AddressForm;
