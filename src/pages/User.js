import React, { useCallback, useState } from "react";
import { FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "react-datepicker/dist/react-datepicker.css";
import "../css/ToggleSwitch.css";
import UserAddForm from "./UserAddForm";
import { updateUserData, useUserById, deleteUser } from "../HelperFunction/api";
import Navbar from "../components/Navbar";

const User = () => {
  const { usersData, usersLoading, usersError, error, refetch } = useUserById();
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const queryClient = useQueryClient();

  const updatedUserMutation = useMutation({
    mutationFn: updateUserData,
    onSuccess: (data, variable) => {
      queryClient.setQueryData(["user", variable.id], (oldData) => {
        return { ...oldData, ...data };
      });
      alert("User status changed successfully");
      refetch();
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      alert("User deleted successfully");
      refetch();
    },
    onError: (error) => {
      alert("Failed to delete user: " + error.message);
    },
  });

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(id);
    }
  };

  const handleToggles = useCallback(
    (id) => {
      const user = usersData?.user.find((item) => item._id === id);
      if (user) {
        const updatedUser = { ...user, isActive: !user.isActive };
        const status = updatedUser.isActive ? "true" : "false";
        updatedUserMutation.mutate({
          id: id,
          newData: { isActive: status },
        });
      }
    },
    [updatedUserMutation, usersData]
  );

  const filteredUsers = usersData?.user.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (usersLoading) return <SkeletonLoader />;
  if (usersError) return <ErrorState error={error} />;

  console.log(filteredUsers)

  return (
    <>
    <Navbar/>
    <div className="p-5 font-sans min-h-screen bg-gray-100">
      <div className="sticky top-20 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-blue-900 text-2xl font-semibold">
            All Users ({usersData?.user ? usersData?.user?.length : 0})
          </h4>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out"
              />
            </div>
            <button
              onClick={() => {
                setEditingUser(null);
                setShowUserForm(true);
              }}
              className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-full hover:bg-blue-700 transition duration-150 ease-in-out"
            >
              <FaUserPlus className="mr-2" />
              <span>Add User</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto max-h-96">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Phone Number</th>
                <th className="py-2 px-4 text-left">Role</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers && filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr
                    key={index}
                    className={`font-semibold border-t border-b border-gray-300 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-100"
                    } hover:bg-blue-50 transition-all`}
                  >
                    <td className="py-3 px-4 font-semibold text-gray-800 mr-2">
                      {user.name}
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-800 mr-2">
                      {user.phone}
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-800 mr-2">
                      {user.role}
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-800 mr-2">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out"
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                        <ToggleSwitch
                          isActive={user.isActive}
                          onToggle={() => handleToggles(user._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-4 text-center text-sm text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showUserForm && (
        <UserAddForm
          editedData={editingUser}
          id={editingUser?._id}
          onClose={() => {
            setShowUserForm(false);
            setEditingUser(null);
            refetch();
          }}
        />
      )}
    </div>
    </>
  );
};

const ToggleSwitch = ({ isActive, onToggle }) => (
  <div
    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 ${
      isActive ? "bg-blue-900" : "bg-gray-200"
    }`}
    onClick={onToggle}
  >
    <span
      className={`inline-block w-4 h-4 transform transition ease-in-out duration-200 ${
        isActive ? "translate-x-6 bg-white" : "translate-x-1 bg-gray-400"
      } rounded-full`}
    />
  </div>
);

const SkeletonLoader = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      <div className="h-8 bg-gray-300 rounded"></div>
      <div className="h-8 bg-gray-300 rounded"></div>
      <div className="h-8 bg-gray-300 rounded"></div>
    </div>
  </div>
);

const ErrorState = ({ error }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Error:</strong>
      <span className="block sm:inline"> {error.message}</span>
    </div>
  </div>
);

export default User;
