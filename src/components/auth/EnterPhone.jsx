import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import img1 from '../../assets/phone.png';

function EnterPhoneAuth() {
  const [phone, setPhone] = useState('');
  const [existsIn, setExistsIn] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(navigate(`/otp?phone=${phone}`))
 
  };

  const handleOptionSelect = (option) => {
    localStorage.setItem('userType', option);
    setShowModal(false);
    console.log("Selected User Type:", option);
    navigate(`/loginAuth?phone=${phone}`);  // Redirect with phone number as query parameter
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="text-center">
          <img 
            src={img1} 
            alt="OTP Verification"
            className="mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2">OTP verification</h2>
          <p className="text-gray-600 mb-6">We will send you a one-time password to your mobile number</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="phone">
              Enter Your Phone
            </label>
            <input 
              type="text" 
              id="phone" 
              name="phone" 
              value={phone} 
              onChange={handleChange}
              placeholder="+91 9398848215"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
            />
          </div>
          <button 
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send OTP
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">Already Have An Account? <a href="/signin" className="text-blue-600 font-semibold">Sign In</a></p>
        </div>
      </div>

      {/* Modal for selecting the user type */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-semibold mb-4">Select Your Account Type</h3>
            {existsIn.map((option, index) => (
              <button 
                key={index}
                onClick={() => handleOptionSelect(option)}
                className="block w-full py-2 mb-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {option}
              </button>
            ))}
            <button 
              onClick={() => setShowModal(false)}
              className="w-full mt-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EnterPhoneAuth;
