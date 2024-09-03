import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import BranchModal from "./BranchModal";
import VendorModal from "./VendorModal";
import StaffModal from "./StaffModal";
import "./style.css";
import { useSelector } from "react-redux";
import { FaUserPlus } from "react-icons/fa";
import { MdEdit } from 'react-icons/md';
import { FaRegEdit } from "react-icons/fa";

const Branch = () => {
  const [branches, setBranches] = useState([]);
  const [name, setName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [editingBranchId, setEditingBranchId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [staff, setStaff] = useState([]);
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const user = useSelector((state) => state.login.user);
  const userData = { id: user?.id }; // Replace with actual user data

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await axios.get(
        `https://freighteg.in/freightapi/getbranches/company/${userData.id}`
      );
      setBranches(response.data || []);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const fetchBranchDetails = async (branchId) => {
    try {
      const response = await axios.get(
        `https://freighteg.in/freightapi/getbranchdetails/${branchId}`
      );
      setVendors(response.data.vendor_ids || []);
      setStaff(response.data.staff_ids || []);
    } catch (error) {
      console.error("Error fetching branch details:", error);
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
      console.log("Creating branch:", branchData);

      await axios.post("https://freighteg.in/freightapi/addBranch", branchData);
      setMessage("Branch successfully created!");
      setIsError(false);
      fetchBranches(); // Refresh branches after creation
      closeModal(); // Close modal after successful creation
    } catch (error) {
      console.error("Error creating branch:", error.response || error.message);
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
      console.log("Updating branch:", branchData);

      await axios.put(
        `https://freighteg.in/freightapi/updatebranches/${editingBranchId}`,
        branchData
      );
      setMessage("Branch successfully updated!");
      setIsError(false);
      fetchBranches(); // Refresh branches after update
      closeModal(); // Close modal after successful update
    } catch (error) {
      console.error("Error updating branch:", error.response || error.message);
      setMessage(`Error updating branch: ${error.message}`);
      setIsError(true);
    }
  };

  const handleEditClick = (branch) => {
    setEditingBranchId(branch._id);
    setName(branch.name);
    setContactPerson(branch.contact_person_name);
    setPhone(branch.phone);
    setPassword(branch.password); // Clear the password field for editing
    setNewPassword(""); // Clear the new password field for editing
    setIsModalOpen(true); // Open modal for editing
  };

  const openModalForCreate = () => {
    setEditingBranchId(null);
    setName("");
    setContactPerson("");
    setPhone("");
    setPassword("");
    setNewPassword("");
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

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        {/* <h1 className="text-2xl font-bold mb-4">Branch Management</h1> */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Branch </h1>
          <button
            onClick={openModalForCreate}
            className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-full hover:bg-blue-700 transition duration-150 ease-in-out"
          >
            <FaUserPlus className="mr-2" />
            <span>Add Branch</span>
          </button>
        </div>

        {branches.length > 0 ? (
          <div className="table-container">
            <table className="min-w-full table">
              <thead className="thead">
                <tr className="tr">
                  <th className="th">Branch Name</th>
                  <th className="th">Contact Person</th>
                  <th className="th">Phone</th>
                  <th className="th"> Actions</th>
                </tr>
              </thead>
              <tbody>
                {branches.map((branch) => (
                  <tr key={branch._id} className="tr">
                    <td className="td">{branch.name}</td>
                    <td className="td">{branch.contact_person_name}</td>
                    <td className="td">{branch.phone}</td>
                    <td className="actions space-x-2 td">
                      <button
                        onClick={() => handleEditClick(branch)}
                        className="text-blue-500 px-2 py-2 rounded hover:text-black "
                      >
                       <FaRegEdit className="h-6 w-6 " />
                      </button>
                      <button
                        onClick={() => handleVendorClick(branch._id)}
                        className="view-button bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                      >
                        View Vendors
                      </button>
                      <button
                        onClick={() => handleStaffClick(branch._id)}
                        className="view-button bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-300"
                      >
                        View Staff
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No branches available.</p>
        )}

        {message && (
          <p className={`mt-4 ${isError ? "text-red-500" : "text-green-500"}`}>
            {message}
          </p>
        )}

        {/* Modals for Branch, Vendor, and Staff */}
        <BranchModal
          isOpen={isModalOpen}
          onClose={closeModal}
          name={name}
          contactPerson={contactPerson}
          phone={phone}
          password={password}
          newPassword={newPassword}
          onNameChange={(e) => setName(e.target.value)}
          onContactPersonChange={(e) => setContactPerson(e.target.value)}
          onPhoneChange={(e) => setPhone(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onNewPasswordChange={(e) => setNewPassword(e.target.value)}
          onSubmit={editingBranchId ? handleEditBranch : handleCreateBranch}
          isEditing={!!editingBranchId}
        />

        <VendorModal
          isOpen={isVendorModalOpen}
          onClose={() => setIsVendorModalOpen(false)}
          vendors={vendors}
        />

        <StaffModal
          isOpen={isStaffModalOpen}
          onClose={() => setIsStaffModalOpen(false)}
          staff={staff}
        />
      </div>
    </>
  );
};

export default Branch;
