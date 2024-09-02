import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import img1 from '../../assets/phone.png';

function PhoneAuth() {
  const [phone, setPhone] = useState('');
  const [existsIn, setExistsIn] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCreateAccountPrompt, setShowCreateAccountPrompt] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending request to check phone...");
      const response = await axios.post('https://freighteg.in/freightapi/check-phone', { phone });

      const data = response.data;
      console.log("Response received:", data);

      if (data.existsIn.length === 1) {
        localStorage.setItem('userType', data.existsIn[0]);
        console.log("User Type:", data.existsIn[0]);
        navigate(`/loginAuth?phone=${phone}`);  // Redirect with phone number as query parameter
      } else if (data.existsIn.length > 1) {
        console.log("Multiple user types found, opening modal...");
        setExistsIn(data.existsIn);
        setShowModal(true); // This should trigger the modal to open
      } else if (data.existsIn.length === 0) {
        console.log("Phone not associated with any user type, prompting for account creation...");
        setShowCreateAccountPrompt(true); // Trigger account creation prompt
      }
    } catch (error) {
      console.error('Error occurred:', error);
      alert('An error occurred while checking the phone number. Please try again.');
    }
  };

  const handleOptionSelect = (option) => {
    localStorage.setItem('userType', option);
    setShowModal(false);
    console.log("Selected User Type:", option);
    navigate(`/loginAuth?phone=${phone}`);  // Redirect with phone number as query parameter
  };

  const handleOtpSent = async () => {
    try {
      const body = { phone };
      console.log("Sending OTP to:", phone);
      const response = await axios.post('https://freighteg.in/freightapi/send-otp', body);

      if (response.status === 200) {
        alert("Success! OTP sent successfully.");
        navigate(`/otp?phone=${phone}`);  // Redirect to OTP page with phone number as query parameter
      } else {
        alert("Error: Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert("Error: Something went wrong. Please try again.");
    }
  };

  const handleCreateAccount = () => {
    setShowCreateAccountPrompt(false);
    handleOtpSent();  // Send OTP and navigate to OTP page
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
          <h2 className="text-2xl font-semibold mb-2">Sign In</h2>
          <p className="text-gray-600 mb-6">Enter your mobile number to continue the process</p>
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
            Next
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">Don't Have An Account? <span onClick={() => navigate("/signUpPhone")} className="text-blue-600 font-semibold">Sign Up</span></p>
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

      {/* Prompt for account creation */}
      {showCreateAccountPrompt && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-semibold mb-4">Create an Account</h3>
            <p className="mb-4">This phone number is not associated with any account. Would you like to create a new account?</p>
            <button 
              onClick={handleCreateAccount}
              className="block w-full py-2 mb-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Yes, Create Account
            </button>
            <button 
              onClick={() => setShowCreateAccountPrompt(false)}
              className="w-full py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhoneAuth;
