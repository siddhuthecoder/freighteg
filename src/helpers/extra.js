<div>
  {/* main form */}

  {/* Main Content */}
  <div
    style={{
      paddingTop: "64px",
      marginTop: "-30%",
      height: "382px",
      width: "85%",
      marginLeft: "14%",
    }}
    className="bg-white-300 shadow-lg"
  >
    <div
      style={{
        width: "100%",
        margin: "10% auto",
        height: "320px",
        overflowY: "auto",
        marginTop: "-8%",

        display: "flex",
        padding: "20px",
      }}
    >
      {/* First half */}
      <div className="w-1/2 rounded-l-lg  p-4">
        {/* Icons and Routes */}
        <div className="flex">
          <div className="p-2 ">icons</div>
          <div className="p-2 text-blue-900">Vehicle Details</div>
        </div>
        {/* Loading details */}
        <div className=" rounded-lg p-4 mb-2">
          <div className="text-left text-blue-400">Loading details</div>
        </div>
        {/* City and State inputs */}
        <div className="flex">
          <div className="flex items-center  p-1 mb-4">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              className="bg-gray-300 px-2 py-1 rounded ml-8 w-36"
            />
          </div>
          <div className="flex items-center p-1 mb-4 ml-3">
            <label htmlFor="state" className="mr-4">
              State
            </label>
            <select
              id="state"
              className="bg-gray-300 px-2 py-1 rounded w-36 "
            >
              <option value="">Select State</option>
              {/* Add state options here */}
            </select>
          </div>
        </div>
        {/* Address input */}
        <div className="flex items-center  p-1 mb-4">
          <label htmlFor="address" className="">
            Address
          </label>
          <input
            style={{ width: "362px" }}
            type="text"
            id="address"
            className="bg-gray-300 px-2 py-1 rounded ml-1  "
          />
        </div>
        {/* Pincode input */}
        <div className="flex items-center  p-1 mb-4">
          <label htmlFor="pincode" className="mr-2 w-10">
            Pincode
          </label>
          <input
            type="text"
            id="pincode"
            className="bg-gray-300 px-2 py-1 rounded ml-3"
          />
        </div>
      </div>

      {/* Second half */}
      <div className="w-1/2   p-4">
        <div className="mb-4 text-left mt-14 text-blue-400">
          Uploading details
        </div>
        <div className="flex">
          <div className="flex items-center  p-1 mb-4">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              className="bg-gray-300 px-2 py-1 rounded ml-8 w-36"
            />
          </div>
          <div className="flex items-center  p-1 mb-4 ml-3">
            <label htmlFor="state" className="mr-4">
              State
            </label>
            <select
              id="state"
              className="bg-gray-300 px-2 py-1 rounded w-36 "
            >
              <option value="">Select State</option>
              {/* Add state options here */}
            </select>
          </div>
        </div>
        {/* Address input */}
        <div className="flex items-center  p-1 mb-4">
          <label htmlFor="address" className="">
            Address
          </label>
          <input
            style={{ width: "362px" }}
            type="text"
            id="address"
            className="bg-gray-300 px-2 py-1 rounded ml-1  "
          />
        </div>
        {/* Pincode input */}
        <div className="flex items-center   p-1 mb-4">
          <label htmlFor="pincode" className="mr-2 w-10">
            Pincode
          </label>
          <input
            type="text"
            id="pincode"
            className="bg-gray-300 px-2 py-1 rounded ml-3"
          />
        </div>
      </div>
    </div>
    <div
      style={{
        marginTop: "auto",
        alignSelf: "flex-end",
        width: "100%",
        padding: "20px",
        marginTop: "-12%",
        display: "flex",
      }}
    >
      <label htmlFor="routeDistance" className="block mt-2.5">
        Route Distance:
      </label>
      <input
        type="text"
        id="routeDistance"
        className="bg-gray-300 px-2 py-1 rounded mt-2"
      />
    </div>
  </div>
</div>

{/* Additional Content */ }
<div
  style={{
    width: "85%",
    margin: "40% auto",
    height: "186px",
    marginLeft: "14%",
    marginTop: "10px",
    borderRadius: "10px",
  }}
  className="rounded-full shadow-lg"
>
  <div className="flex">
    <div className="p-2 ml-6 mt-4">icons</div>
    <div className="p-2 text-blue-900 mt-4">Vehicle Details</div>
  </div>
  <div className="flex">
    <div className="flex">
      <div>
        <label htmlFor="state" className="ml-8">
          Vehicle Type
        </label>
        <select
          id="state"
          className="w-36 h-7 rounded-md border border-gray-300 mt-8 ml-4 bg-gray-300"
        >
          <option value="">Select State</option>
        </select>
      </div>
    </div>
    <div>
      <div>
        <label htmlFor="state" className="ml-8">
          Size
        </label>
        <select
          id="state"
          className="w-36 h-7 rounded-md border border-gray-300 mt-8 ml-4 bg-gray-300"
        >
          <option value="">Select State</option>
          {/* Add state options here */}
        </select>
      </div>
    </div>
    <div>
      <div>
        <label htmlFor="state" className="ml-8">
          Body
        </label>
        <select
          id="state"
          className="w-36 h-7 rounded-md border border-gray-300 mt-8 ml-4 bg-gray-300"
        >
          <option value="">Select State</option>
          {/* Add state options here */}
        </select>
      </div>
    </div>
    <div>
      <div>
        <label htmlFor="state" className="ml-4">
          Quantity
        </label>
        <select
          id="state"
          className="w-36 h-7 rounded-md border border-gray-300 mt-8 ml-4 bg-gray-300"
        >
          <option value="">Select State</option>
          {/* Add state options here */}
        </select>
      </div>
    </div>
  </div>
  <div className="flex items-center">
    <input type="checkbox" id="cng-checkbox" className="ml-8 mt-6" />
    <label htmlFor="cng-checkbox" className="mt-6 ml-1">
      Click here for CNG Vehicle
    </label>
  </div>
</div>
{/* material info */ }
{/* <div
  style={{
    width: "85%",
    margin: "40% auto",
    height: "150px",
    marginLeft: "14%",
    marginTop: "-40%",
    borderRadius: "10px",
  }}
  className="rounded-full shadow-lg"
>
  <div className="flex">
    <div className="p-2 ml-6">icons</div>
    <div className="p-2">Vehicle Details</div>
  </div>
  <div className="flex">
    <div className="flex">
      <div>
        <label htmlFor="state" className="ml-8">
          Material Type
        </label>
        <select
          id="state"
          className="w-64 h-7 top-0 left-0 rounded-lg border border-gray-300 mt-8 ml-4 bg-gray-300"
        >
          <option value="">Select Materia Type</option>
        </select>
      </div>
    </div>
    <div>
      <div>
        <label htmlFor="state" className="ml-16">
          Material Weight
        </label>
        <select
          id="state"
          className="w-64 h-7 rounded-full border border-gray-300 mt-8 ml-4 bg-gray-300"
        >
          <option value="">Select Material Weight</option>
          {/* Add state options here */}
//         </select>
//       </div>
//     </div>
//   </div>
// </div>


// <div
//   style={{
//     width: "85%",
//     margin: "40% auto",
//     height: "186px",
//     marginLeft: "14%",
//     marginTop: "-40%",
//     borderRadius: "10px",
//   }}
//   className="rounded-full shadow-lg"
// >
//   <div className="flex">
//     <div className="p-2 ml-6 mt-4">icons</div>
//     <div className="p-2 text-blue-900 mt-4">Addition Info</div>
//   </div>
//   <div className="flex">
//     <div className="flex">
//       <div>
//         <label htmlFor="state" className="ml-6">
//           Vehicle Loading Date & Time
//         </label>
//         <select
//           id="state"
//           className="w-44 h-7 rounded-md border border-gray-300 mt-4 ml-4 bg-gray-300"
//         >
//           <option value=""></option>
//         </select>
//       </div>
//     </div>
//     <div>
//       <div>
//         <label htmlFor="state" className="ml-14">
//           Bid Exp Date
//         </label>
//         <select
//           id="state"
//           className="w-40 h-7 rounded-md border border-gray-300 mt-4 ml-4 bg-gray-300"
//         >
//           <option value=""></option>
        
//         </select>
//       </div>
//     </div>
//     <div>
//       <div>
//         <label htmlFor="state" className="ml-8">
//           Target Price
//         </label>
//         <input
//           type="text"
//           id="state"
//           className="w-40 h-7 rounded-md border border-gray-300 mt-4 ml-4 bg-gray-300"
//         >
//           {/* Add state options here */}
//         </input>
//       </div>
//     </div>
//     <div></div>
//   </div>
//   <div className="flex items-center">
//     <label htmlFor="cng-checkbox" className="mt-6 ml-6">
//       Remarks (if any)
//     </label>
//     <input
//       type="text"
//       className="w-[82%] bg-gray-300 mt-8 ml-4  rounded"
//     />
//   </div>
// </div>
// <div
//   style={{
//     width: "85%",
//     margin: "40% auto",
//     height: "110px",
//     marginLeft: "14%",
//     marginTop: "-40%",
//     borderRadius: "10px",
//   }}
//   className="rounded-full shadow-lg"
// >
//   <div className="flex">
//     <div className="p-2 ml-6">icons</div>
//     <div className="p-2 text-blue-900">Assign Staff</div>
//   </div>
//   <div className="flex">
//     <div className="flex">
//       <div>
//         <label htmlFor="state" className="ml-6">
//           Name
//         </label>
//         <input
//           type="text"
//           id="name"
//           className="w-44 h-7 rounded-md border border-gray-300 mt-4 ml-4 bg-gray-300"
//         ></input>
//       </div>
//     </div>
//     <div>
//       <div>
//         <label htmlFor="state" className="ml-14">
//           Phone Number
//         </label>
//         <input
//           type="text"
//           id="state"
//           className="w-64 h-7 rounded-md border border-gray-300 mt-4 ml-4 bg-gray-300"
//         ></input>
//       </div>
//     </div>

//     <div></div>
//   </div>
// </div>
// <div className="relative flex justify-end mr-4">
//   <div className="absolute bottom-4 right-4 ">
//     <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
//       Create
//     </button>
//   </div>
// </div> */} */}