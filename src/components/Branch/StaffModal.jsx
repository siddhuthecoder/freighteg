import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css'
const StaffModal = ({ isOpen, onClose, staff }) => {
  const [staffDetails, setStaffDetails] = useState([]);

  useEffect(() => {
    if (isOpen && staff.length > 0) {
      const fetchStaffDetails = async () => {
        try {
          const promises = staff.map(async (userId) => {
            const response = await axios.get(`https://freighteg.in/freightapi/freightusers/${userId}`);
            return response.data;
          });
          const results = await Promise.all(promises);
          setStaffDetails(results);
        } catch (error) {
          console.error('Error fetching staff details:', error);
        }
      };

      fetchStaffDetails();
    }
  }, [isOpen, staff]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50  flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Staff</h2>
        {staffDetails.length > 0 ? (
          <table className="table-auto w-full table">
            <thead>
              <tr className='tr'>
                {/* <th className="px-4 py-2">ID</th> */}
                <th className="px-4 py-2 th">Name</th>
                <th className="px-4 py-2 th">Phone</th>
                <th className="px-4 py-2 th">Role</th>
                <th className="px-4 py-2 th ">Active</th>
              </tr>
            </thead>
            <tbody>
              {staffDetails.map((staffMember, index) => (
                <tr key={index} className='tr'>
                  {/* <td className="border px-4 py-2">{staffMember._id}</td> */}
                  <td className="border px-4 py-2 td">{staffMember.name}</td>
                  <td className="border px-4 py-2 td">{staffMember.phone}</td>
                  <td className="border px-4 py-2 td">{staffMember.role}</td>
                  <td className="border px-4 py-2 td">
                    {staffMember.isActive ? 'Yes' : 'No'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No staff members available.</p>
        )}
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default StaffModal;
