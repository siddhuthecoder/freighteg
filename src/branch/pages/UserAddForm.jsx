import React, { useEffect, useCallback, useState } from "react";
import Select from "react-select";
import { UserDataMutation, updateUserData } from "../../HelperFunction/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { FiUser, FiPhone, FiLock, FiX } from "react-icons/fi";
import axios from "axios";

const UserAddForm = ({ editedData, id, onClose }) => {
  const user = useSelector((state) => state.login.user);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    role: "",
    password: "",
    company_id: user?.id,
    branch: user?.branch || "", // Default branch value from global state
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [branchOptions, setBranchOptions] = useState([]);

  // Fetching branches from API for the dropdown
  const fetchBranches = async () => {
    try {
      const response = await axios.get(
        `https://freighteg.in/freightapi/getbranches/company/${user.company_id}`
      );
      const branches = response.data.map((branch) => ({
        value: branch.id,
        label: branch.name,
      }));
      setBranchOptions(branches);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  useEffect(() => {
    if (isEditing) {
      fetchBranches();
    }
  }, [isEditing]);

  useEffect(() => {
    if (editedData && id) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...editedData,
      }));
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [editedData, id]);

  const roleOptions = [
    { value: "Field staff", label: "Field Staff" },
    { value: "Office staff", label: "Office Staff" },
  ];

  const queryClient = useQueryClient();

  const PostMutation = useMutation({
    mutationFn: UserDataMutation,
    onSuccess: () => {
      alert("User Successfully Created!");
      queryClient.invalidateQueries("users");
      onClose();
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      setError("Failed to create user. Please try again.");
    },
  });

  const updatedUserMutation = useMutation({
    mutationFn: updateUserData,
    onSuccess: (data, variable) => {
      queryClient.setQueryData(["user", variable.id], (oldData) => {
        return { ...oldData, ...data };
      });
      queryClient.invalidateQueries("users");
      alert("User Updated Successfully");
      onClose();
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      setError("Failed to update user. Please try again.");
    },
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }, []);

  const handleSelectChange = (selectedOption) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      role: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleBranchSelectChange = (selectedOption) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      branch: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError(null);
      try {
        const dataToSend = {
          name: formData.name,
          phone: formData.phone,
          role: formData.role,
          branch: formData.branch,
          ...(isEditing ? {} : { password: formData.password }),
          company_id: user?.id,
        };
        if (isEditing) {
          await updatedUserMutation.mutateAsync({
            id: id,
            newData: dataToSend,
          });
        } else {
          await PostMutation.mutateAsync(dataToSend);
        }
      } catch (error) {
        console.error("Error occurred while processing data:", error);
        setError("An error occurred. Please try again.");
      }
    },
    [formData, isEditing, id, PostMutation, updatedUserMutation, user]
  );

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-8 m-4 max-w-xl w-full relative animate-fade-in-down">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
        >
          <FiX size={24} />
        </button>
        <h2 className="text-blue-900 text-3xl font-bold mb-6 text-center">
          {isEditing ? "Edit User Details" : "Add New User"}
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User Name
            </label>
            <div className="relative">
              <FiUser className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-50 h-12 rounded-lg pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 transition duration-300"
                placeholder="Enter user name"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <FiPhone className="absolute top-3 left-3 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-gray-50 h-12 rounded-lg pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 transition duration-300"
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          {/* Role Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <Select
              value={
                roleOptions.find((option) => option.value === formData.role) ||
                null
              }
              onChange={handleSelectChange}
              options={roleOptions}
              className="w-full"
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  backgroundColor: "#f9fafb",
                  borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
                  borderRadius: "0.5rem",
                  height: "48px",
                  boxShadow: state.isFocused ? "0 0 0 2px #93c5fd" : "none",
                  "&:hover": {
                    borderColor: "#3b82f6",
                  },
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected ? "#e5e7eb" : "white",
                  color: state.isSelected ? "black" : "inherit",
                }),
              }}
              placeholder="Select role"
              required
            />
          </div>

          {/* Branch Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Branch
            </label>
            {isEditing ? (
              <Select
                value={branchOptions.find(
                  (option) => option.value === formData.branch
                )}
                onChange={handleBranchSelectChange}
                options={branchOptions}
                className="w-full"
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    backgroundColor: "#f9fafb",
                    borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
                    borderRadius: "0.5rem",
                    height: "48px",
                    boxShadow: state.isFocused ? "0 0 0 2px #93c5fd" : "none",
                    "&:hover": {
                      borderColor: "#3b82f6",
                    },
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? "#e5e7eb" : "white",
                    color: state.isSelected ? "black" : "inherit",
                  }),
                }}
                placeholder="Select branch"
              />
            ) : (
              <input
                type="text"
                value={user.name}
                onChange={handleChange}
                name="branch"
                className="w-full bg-gray-50 h-12 rounded-lg pl-3 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 transition duration-300"
                placeholder="Branch"
                readOnly
              />
            )}
          </div>

          {/* Password Field (only for add user) */}
          {!isEditing && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-50 h-12 rounded-lg pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 transition duration-300"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>
          )}

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300"
            >
              {isEditing ? "Update User" : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserAddForm;
