import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';

const Branch = () => {
  const [branches, setBranches] = useState([]);
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [editingBranchId, setEditingBranchId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [staff, setStaff] = useState([]);
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);

  const userData = { id: '665580f353ccced94082681b' }; // Replace with actual user data

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await axios.get(`https://freighteg.in/freightapi/getbranches/company/${userData.id}`);
      setBranches(response.data || []);
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  const fetchBranchDetails = async (branchId) => {
    try {
      const response = await axios.get(`https://freighteg.in/freightapi/getbranchdetails/${branchId}`);
      setVendors(response.data.vendor_ids || []);
      setStaff(response.data.staff_ids || []);
    } catch (error) {
      console.error('Error fetching branch details:', error);
    }
  };

  const handleCreateBranch = async () => {
    const branchData = {
      name,
      contact_person_name: contactPerson,
      role: "branch",
      phone,
      password,
      company_id: userData.id,
    };

    try {
      console.log('Creating branch:', branchData);

      await axios.post('https://freighteg.in/freightapi/addBranch', branchData);
      setMessage('Branch successfully created!');
      setIsError(false);
      fetchBranches(); // Refresh branches after creation
      closeModal(); // Close modal after successful creation
    } catch (error) {
      console.error('Error creating branch:', error.response || error.message);
      setMessage(`Error creating branch: ${error.message}`);
      setIsError(true);
    }
  };

  const handleEditBranch = async () => {
    const branchData = {
      name,
      contact_person_name: contactPerson,
      phone,
      ...(newPassword.trim() && { password: newPassword }),
      company_id: userData.id,
    };

    try {
      console.log('Updating branch:', branchData);

      await axios.put(`https://freighteg.in/freightapi/updatebranches/${editingBranchId}`, branchData);
      setMessage('Branch successfully updated!');
      setIsError(false);
      fetchBranches(); // Refresh branches after update
      closeModal(); // Close modal after successful update
    } catch (error) {
      console.error('Error updating branch:', error.response || error.message);
      setMessage(`Error updating branch: ${error.message}`);
      setIsError(true);
    }
  };

  const handleEditClick = (branch) => {
    setEditingBranchId(branch._id);
    setName(branch.name);
    setContactPerson(branch.contact_person_name);
    setPhone(branch.phone);
    setPassword(''); // Clear the password field for editing
    setNewPassword(''); // Clear the new password field for editing
    setIsModalOpen(true); // Open modal for editing
  };

  const openModalForCreate = () => {
    setEditingBranchId(null);
    setName('');
    setContactPerson('');
    setPhone('');
    setPassword('');
    setNewPassword('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleVendorClick = async (branchId) => {
    await fetchBranchDetails(branchId);
    setIsVendorModalOpen(true);
  };

  const handleStaffClick = async (branchId) => {
    await fetchBranchDetails(branchId);
    setIsStaffModalOpen(true);
  };

  console.log(branches[0]);
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Branches</h1>
        {message && (
          <div
            className={`mb-4 p-2 text-center rounded ${
              isError ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
            }`}
          >
            {message}
          </div>
        )}
        <button
          onClick={openModalForCreate}
          className="bg-blue-500 text-white px-4 py-2 mb-4"
        >
          Create Branch
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {branches?.map((branch) => (
            
            <div key={branch._id} className="border p-4 rounded shadow">
              <h2 className="font-bold">{branch.name}</h2>
              <p>Contact: {branch.contact_person_name}</p>
              <p>Phone: {branch.phone}</p>
              <button
                onClick={() => handleEditClick(branch)}
                className="bg-green-500 text-white px-4 py-2 mt-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleVendorClick(branch._id)}
                className="bg-yellow-500 text-white px-4 py-2 mt-2"
              >
                Vendors 
              </button>
              <button
                onClick={() => handleStaffClick(branch._id)}
                className="bg-purple-500 text-white px-4 py-2 mt-2"
              >
                Staff
              </button>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editingBranchId ? 'Edit Branch' : 'Create Branch'}
            </h2>
            <input
              type="text"
              placeholder="Branch Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Contact Person"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border p-2 mb-2 w-full"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 mb-2 w-full"
            />
            {editingBranchId && (
              <input
                type="password"
                placeholder="New Password (optional)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border p-2 mb-2 w-full"
              />
            )}
            <div className="flex justify-between">
              {editingBranchId ? (
                <button
                  onClick={handleEditBranch}
                  className="bg-blue-500 text-white px-4 py-2"
                >
                  Update Branch
                </button>
              ) : (
                <button
                  onClick={handleCreateBranch}
                  className="bg-blue-500 text-white px-4 py-2"
                >
                  Create Branch
                </button>
              )}
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isVendorModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Vendors</h2>
            {vendors.length > 0 ? (
              <ul>
                {vendors?.map((vendor, index) => (
                  <li key={index} className="mb-2">
                    Vendor ID: {vendor}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No vendors available.</p>
            )}
            <button
              onClick={() => setIsVendorModalOpen(false)}
              className="bg-blue-500 text-white px-4 py-2 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isStaffModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Staff</h2>
            {staff.length > 0 ? (
              <ul>
                {staff?.map((staffMember, index) => (
                  <li key={index} className="mb-2">
                    Staff ID: {staffMember}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No staff members available.</p>
            )}
            <button
              onClick={() => setIsStaffModalOpen(false)}
              className="bg-blue-500 text-white px-4 py-2 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Branch;
