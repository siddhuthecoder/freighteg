// components/BranchList.js
import React from 'react';

const BranchList = ({ branches, onEditClick, onVendorClick, onStaffClick }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {branches?.map((branch) => (
      <div key={branch._id} className="border p-4 rounded shadow">
        <h2 className="font-bold">{branch.name}</h2>
        <p>Contact: {branch.contact_person_name}</p>
        <p>Phone: {branch.phone}</p>
        <button
          onClick={() => onEditClick(branch)}
          className="bg-green-500 text-white px-4 py-2 mt-2"
        >
          Edit
        </button>
        <button
          onClick={() => onVendorClick(branch._id)}
          className="bg-yellow-500 text-white px-4 py-2 mt-2"
        >
          Vendors
        </button>
        <button
          onClick={() => onStaffClick(branch._id)}
          className="bg-purple-500 text-white px-4 py-2 mt-2"
        >
          Staff
        </button>
      </div>
    ))}
  </div>
);

export default BranchList;
