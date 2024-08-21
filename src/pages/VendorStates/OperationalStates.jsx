import React from "react";

const OperationalStatesModal = ({ isOpen, onClose, operationalStates }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full transition-transform duration-300 transform scale-95">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Operational States
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl focus:outline-none"
          >
            &times;
          </button>
        </div>
        <div className="h-64 overflow-y-auto">
          <ul className="list-disc pl-5 space-y-2">
            {operationalStates.map((state, index) => (
              <li key={index} className="text-gray-700 text-sm">
                {state.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OperationalStatesModal;
