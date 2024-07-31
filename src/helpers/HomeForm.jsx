import React from 'react';

const HomeForm = () => {
  return (
    <div className="bg-gray-800 items-center justify-between px-4 top-16 left-44 right-0 z-10 mt-20 overflow-y-auto">
      <div className="flex flex-wrap justify-between">
        {/* First half */}
        <div className="w-full md:w-5/12 bg-blue-300 rounded-lg shadow-lg mb-4 p-4">
          {/* Icons and Routes */}
          <div className="flex justify-between items-center mb-4">
            <div className="pr-4">Icons</div>
            <div className="pl-4">Routes</div>
          </div>
          {/* Loading details */}
          <div className="bg-blue-300 rounded-lg shadow-lg p-4 mb-4">
            <div className="text-left">Loading details</div>
          </div>
          {/* City and State inputs */}
          <div className="flex">
            <div className="flex items-center bg-blue-300 rounded-lg shadow-lg p-4 mb-4 mr-4">
              <label htmlFor="city" className="mr-2">City:</label>
              <input type="text" id="city" className="bg-white px-2 py-1 rounded" />
            </div>
            <div className="flex items-center bg-blue-300 rounded-lg shadow-lg p-4 mb-4">
              <label htmlFor="state" className="mr-2">State:</label>
              <select id="state" className="bg-white px-2 py-1 rounded">
                <option value="">Select State</option>
                {/* Add state options here */}
              </select>
            </div>
          </div>
          {/* Address input */}
          <div className="flex items-center bg-blue-300 rounded-lg shadow-lg p-4 mb-4">
            <label htmlFor="address" className="mr-2">Address:</label>
            <input type="text" id="address" className="bg-white px-2 py-1 rounded" />
          </div>
          {/* Pincode input */}
          <div className="flex items-center bg-blue-300 rounded-lg shadow-lg p-4 mb-4">
            <label htmlFor="pincode" className="mr-2">Pincode:</label>
            <input type="text" id="pincode" className="bg-white px-2 py-1 rounded" />
          </div>
        </div>

        {/* Second half */}
        <div className="w-full md:w-5/12 bg-blue-300 rounded-lg shadow-lg mb-4 p-4">
          <div className="mb-4 text-left">Uploading details</div>
          <div className="flex">
            <div className="flex items-center bg-blue-300 rounded-lg shadow-lg p-4 mb-4 mr-4">
              <label htmlFor="city" className="mr-2">City:</label>
              <input type="text" id="city" className="bg-white px-2 py-1 rounded" />
            </div>
            <div className="flex items-center bg-blue-300 rounded-lg shadow-lg p-4 mb-4">
              <label htmlFor="state" className="mr-2">State:</label>
              <select id="state" className="bg-white px-2 py-1 rounded">
                <option value="">Select State</option>
                {/* Add state options here */}
              </select>
            </div>
          </div>
          {/* Address input */}
          <div className="flex items-center bg-blue-300 rounded-lg shadow-lg p-4 mb-4">
            <label htmlFor="address" className="mr-2">Address:</label>
            <input type="text" id="address" className="bg-white px-2 py-1 rounded" />
          </div>
          {/* Pincode input */}
          <div className="flex items-center bg-blue-300 rounded-lg shadow-lg p-4 mb-4">
            <label htmlFor="pincode" className="mr-2">Pincode:</label>
            <input type="text" id="pincode" className="bg-white px-2 py-1 rounded" />
          </div>
        </div>
      </div>

      {/* Rest of the divs */}
      <div className="w-full md:w-5/12 bg-green-300 rounded-lg shadow-lg mb-4">second</div>
      <div className="w-full md:w-5/12 bg-yellow-300 rounded-lg shadow-lg mb-4">third</div>
      <div className="w-full md:w-5/12 bg-red-300 rounded-lg shadow-lg mb-4">fourth</div>
      <div className="w-full md:w-5/12 bg-purple-300 rounded-lg shadow-lg mb-4">Fifth</div>
    </div>
  );
};

export default HomeForm;
