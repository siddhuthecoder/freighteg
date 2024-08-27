import React from 'react';

const BranchModal = ({
  isOpen,
  onClose,
  name,
  contactPerson,
  phone,
  password,
  newPassword,
  onNameChange,
  onContactPersonChange,
  onPhoneChange,
  onPasswordChange,
  onNewPasswordChange,
  onSubmit,
  isEditing
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? 'Edit Branch' : 'Create Branch'}
        </h2>
        <input
          type="text"
          placeholder="Branch Name"
          value={name}
          onChange={onNameChange}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Contact Person"
          value={contactPerson}
          onChange={onContactPersonChange}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={onPhoneChange}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
          className="border p-2 mb-2 w-full"
        />
        {isEditing && (
          <input
            type="password"
            placeholder="New Password (optional)"
            value={newPassword}
            onChange={onNewPasswordChange}
            className="border p-2 mb-2 w-full"
          />
        )}
        <div className="flex justify-between">
          <button
            onClick={onSubmit}
            className="bg-blue-500 text-white px-4 py-2"
          >
            {isEditing ? 'Update Branch' : 'Create Branch'}
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BranchModal;
