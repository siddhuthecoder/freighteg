import React, { useState } from "react";
import Login from "./Login";
import TransporterLogin from "./TransporterLogin";
import StaffLogin from "./StaffLogin"; // Import StaffLogin component

const LoginPage = ({ setIsAuthenticated }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const handleClose = () => {
    setShowLogin(false);
  };

  const handleRoleSelect = (role) => {
    console.log(`Selected role: ${role}`);
    setSelectedRole(role);
    setShowLogin(true);
  };

  const handleAuthentication = () => {
    setIsAuthenticated(true, selectedRole);
  };

  const RoleCard = ({ role, icon, isSelected, onClick }) => (
    <div
      onClick={onClick}
      className={`flex flex-col items-center p-8 bg-white rounded-xl shadow-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        isSelected ? "border-4 border-blue-500 scale-105" : "hover:shadow-3xl"
      }`}
    >
      <img
        className="h-32 w-32 mb-6 transition-transform duration-300 hover:rotate-12"
        src={icon}
        alt={role}
      />
      <h1 className="text-2xl font-semibold text-blue-900">{role}</h1>
    </div>
  );

  return (
    <>
      {showLogin && (
        <div className="overlay fixed inset-0 flex items-center justify-center z-10 bg-gray-900 bg-opacity-70">
          <div className="auth-container bg-white p-10 rounded-lg shadow-2xl relative transform transition-all duration-300 scale-95 hover:scale-100">
            <button
              onClick={handleClose}
              className="close-button absolute top-3 right-3 bg-red-500 text-white rounded-full p-1 hover:bg-red-700 transition duration-300 text-xl"
              aria-label="Close"
            >
              &times;
            </button>
            {selectedRole === "Company" ? (
              <Login
                setModel={setShowLogin}
                handleAuthentication={handleAuthentication}
              />
            ) : selectedRole === "Transporter" ? (
              <TransporterLogin
                setModel={setShowLogin}
                handleAuthentication={handleAuthentication}
              />
            ) : (
              <StaffLogin
                setModel={setShowLogin}
                handleAuthentication={handleAuthentication}
              />
            )}
          </div>
        </div>
      )}

      <header className="fixed top-0 left-0 w-full flex items-center p-5 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 text-white z-50 shadow-lg">
        <img
          className="h-12 w-12 rounded-full shadow-md transition-transform duration-300 hover:scale-110"
          src="https://img.icons8.com/?size=60&id=61791&format=png"
          alt="Logo"
        />
        <h1 className="mr-auto text-3xl font-bold ml-4 tracking-wide">
          Freight EG
        </h1>
      </header>

      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 pt-24 px-4">
        <h3 className="text-5xl font-bold text-blue-900 mb-12 text-center animate-fade-in-down">
          Please Select Your Role
        </h3>
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-20">
          <RoleCard
            role="Company"
            icon="https://img.icons8.com/?size=100&id=59722&format=png"
            isSelected={selectedRole === "Company"}
            onClick={() => handleRoleSelect("Company")}
          />
          <RoleCard
            role="Transporter"
            icon="https://img.icons8.com/?size=100&id=59723&format=png"
            isSelected={selectedRole === "Transporter"}
            onClick={() => handleRoleSelect("Transporter")}
          />
          <RoleCard
            role="Staff"
            icon="https://img.icons8.com/?size=100&id=59941&format=png"
            isSelected={selectedRole === "Staff"}
            onClick={() => handleRoleSelect("Staff")}
          />
        </div>
      </main>
    </>
  );
};

export default LoginPage;
