/*<div className="w-full h-1000 ">
<div className="h-3/4 w-full  shadow-lg">
  <div className="w-1/4 text-blue-900 p-4 text-base font-medium">
    <p className="mr-40">Vendor Details</p>
  </div>
  <div className="flex ml-10">
    <div className="flex-1 h-auto">
      <div className="flex mt-2">
        <label className="text-gray-600 text-sm">Vendor User i'd</label>
        <input
          type="text"
          className="w-54 ml-10 bg-gray-300 rounded-md"
          name="id"
          onChange={handleInputChange}
        />
      </div>

      <div className="flex py-4">
        <label htmlFor="vendorName" className="text-gray-600 text-sm">
          Vendor Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleInputChange}
          className="w-54 ml-12 bg-gray-300 rounded-md"
        />
      </div>

      <div className="flex py-4">
        <label
          htmlFor="vendorAddress"
          className="text-gray-600 text-sm"
        >
          Vendor Address
        </label>
        <input
          type="text"
          id="vendorAddress"
          name="address"
          onChange={handleInputChange}
          className="w-54 ml-10 bg-gray-300 rounded-md p-2 h-6"
        />
      </div>

      <div className="flex py-4">
        <label htmlFor="ownerName" className="text-gray-600 text-sm">
          Owner Name
        </label>
        <input
          type="text"
          id="ownerName"
          name="owner_name"
          onChange={handleInputChange}
          className="w-54 ml-12 bg-gray-300 rounded-md"
        />
      </div>
      <div className="flex py-4">
        <label
          htmlFor="supervisorName"
          className="text-gray-600 text-sm"
        >
          Supervisor Name
        </label>
        <input
          type="text"
          id="supervisorName"
          name="supervisor_name"
          onChange={handleInputChange}
          className="w-54 ml-4 bg-gray-300 rounded-md"
        />
      </div>
      <div className="flex py-2">
        <label htmlFor="gstNumber" className="text-gray-600 text-sm">
          GST Number
        </label>
        <input
          type="text"
          id="gstNumber"
          name="gst"
          onChange={handleInputChange}
          className="w-54 ml-12 bg-gray-300 rounded-md"
        />
      </div>

      <div></div>
    </div>
    <div className="flex-1 h-auto ">
      <div className="flex-1 h-auto ">
        <div className="flex mt-2">
          <label className="text-gray-600 text-sm">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleInputChange}
            className="w-54 ml-10 bg-gray-300 rounded-md"
          />
        </div>

        <div className="flex py-4">
          <label className="text-gray-600 text-sm">Vendor Code</label>
          <input
            type="text"
            id="vendorcode"
            name="code"
            onChange={handleInputChange}
            className="w-54 ml-12 bg-gray-300 rounded-md"
          />
        </div>
        <div className="ml-10 flex">
          <label htmlFor="state" className="text-gray-600 mt-1.5">
            State
          </label>
          <select
            id="loading_state"
            value={formData.unloading_state}
            onChange={handleChange}
            name="state"
            className="border w-36 h-7 mt-1 border-gray-300 bg-gray-300 px-3 py-1 rounded-sm ml-2 focus:outline-none focus:border-blue-500 text-sm"
          >
            <option value=""></option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
            <option value="Andaman and Nicobar Islands">
              Andaman and Nicobar Islands
            </option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Dadra and Nagar Haveli and Daman and Diu">
              Dadra and Nagar Haveli and Daman and Diu
            </option>
            <option value="Delhi">Delhi</option>
            <option value="Lakshadweep">Lakshadweep</option>
            <option value="Puducherry">Puducherry</option>
          </select>
        </div>

        <div className="flex py-4">
          <label className="text-gray-600 text-sm">
            Owner Phone Number 1
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            onChange={handleInputChange}
            className="w-54 h-6 ml-2 bg-gray-300 rounded-md"
          />
        </div>
        <div className="flex py-4">
          <label className="text-gray-600 text-sm">
            Phone Number 1
          </label>
          <input
            type="text"
            id="supervisor_phone1"
            name="supervisor_phone1"
            onChange={handleInputChange}
            className="w-54 ml-4 bg-gray-300 rounded-md"
          />
        </div>
        <div className="flex py-2">
          <label className="text-gray-600 text-sm">PAN Number</label>
          <input
            type="text"
            id="pannumber"
            name="pan"
            onChange={handleInputChange}
            className="w-54 ml-12 h-6 mt-2 bg-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
    <div className="flex-1 h-auto ">
      <div className="flex-1 mt-24 h-auto ">
        <div className="flex py-4">
          <label className="text-gray-600 text-sm ml-4">
            Vendor Type
          </label>
          <select
            type="text"
            className="w-36 ml-14 bg-gray-300 rounded-md"
            id=" vendortype"
            name="vtype"
            onChange={handleInputChange}
          >
            <option>Broker</option>
            <option>Vehicle Owner</option>
          </select>
        </div>
        <div className="flex py-4">
          <label className="text-gray-600 text-sm ml-4">Pin Code</label>
          <input
            type="text"
            className="w-54 ml-20 bg-gray-300 rounded-md p-2 h-6"
            id="pincode"
            name="pin"
            onChange={handleInputChange}
          />
        </div>
        {/* <div className="flex py-4">
          <label className="text-gray-600 text-sm ml-2">
            Owner Phone Number
          </label>
          <input
            type="text"
            className="w-54 ml-2 bg-gray-300 rounded-md"
            id="ownerphonenumber"
            name="phone"
            onChange={handleInputChange}
          />
        </div> 
        <div className="flex py-4">
          <label className="text-gray-600 text-sm ml-2">
            Phone Number 2
          </label>
          <input
            type="text"
            className="w-54 ml-10 bg-gray-300 rounded-md"
            id="phonenumber"
            name="supervisor_phone2"
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  </div>
</div>

<div className="flex py-4">
  <label className="text-gray-600 text-sm">Operation State</label>
  <div className="flex-1 flex flex-col ml-4">
    {operation_states.map((state, index) => (
      <div key={index} className="flex items-center">
        <label className="text-gray-600 text-sm w-48">
          {state.name}
        </label>
        <input
          type="checkbox"
          checked={state.source}
          onChange={() => handleSourceChange(index)}
          className="mx-2"
        />
        <input
          type="checkbox"
          checked={state.dest}
          onChange={() => handleDestinationChange(index)}
          className="mx-2"
        />
      </div>
    ))}
  </div>
</div>
<div className="flex justify-end mr-10 mb-10">
  <button
    onClick={handleSubmit}
    className="bg-blue-900 py-2 px-5 text-white rounded-lg"
  >
    Add Vendor
  </button>
</div>
</div>*/
