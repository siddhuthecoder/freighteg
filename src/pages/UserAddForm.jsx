import React, { useEffect, useCallback, useState } from "react";
import Select from "react-select";
import { UserDataMutation, updateUserData } from "../HelperFunction/api";
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
    branch_id: "", // Ensure branch_id is used
    password: "",
    company_id: user?.id,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [branches, setBranches] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [defaultBranch, setDefaultBranch] = useState(null);

  // Fetch branches when component mounts
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get(
          `https://freighteg.in/freightapi/getbranches/company/${user?.id}`
        );
        const branchesData = response.data;

        // Prepare branch options
        const options = branchesData.map((branch) => ({
          value: branch._id,
          label: branch.name,
        }));

        // Get branch_id from localStorage
        const storedBranchId = localStorage.getItem("branch_id");

        // Set default branch based on localStorage or first option
        const defaultOption =
          options.find((option) => option.value === storedBranchId) || options[0];

        setBranches(branchesData);
        setBranchOptions(options);
        setDefaultBranch(defaultOption); // Set the default selected branch
        setFormData((prevFormData) => ({
          ...prevFormData,
          branch_id: defaultOption.value, // Set the default branch_id
        }));
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, [user?.id]);

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

  const handleRoleSelectChange = (selectedOption) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      role: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleBranchSelectChange = (selectedOption) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      branch_id: selectedOption ? selectedOption.value : "", // Update branch_id correctly
    }));
    setDefaultBranch(selectedOption); // Ensure selected branch is updated
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
          branch_id: formData.branch_id, // Include branch_id
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
          {/* User Name */}
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

          {/* Phone Number */}
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

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <Select
              value={
                roleOptions.find((option) => option.value === formData.role) ||
                null
              }
              onChange={handleRoleSelectChange}
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
                  backgroundColor: state.isFocused ? "#eff6ff" : null,
                  color: state.isFocused ? "#1e40af" : null,
                }),
              }}
              isClearable
            />
          </div>

          {/* Branch */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Branch
            </label>
            <Select
              value={defaultBranch}
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
                  backgroundColor: state.isFocused ? "#eff6ff" : null,
                  color: state.isFocused ? "#1e40af" : null,
                }),
              }}
              isClearable
            />
          </div>

          {/* Password */}
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

          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            {isEditing ? "Update User" : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserAddForm;
