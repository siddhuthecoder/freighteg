import React, { useState, useEffect } from 'react';
import axios from 'axios';
import img1 from '../../assets/phone.png';
import { useNavigate, useLocation } from 'react-router-dom';

const BASE_URL = 'https://your-api-url.com'; // Replace with your actual API URL

const OTPverificationAuth = () => {
  const [otp, setOtp] = useState(Array(4).fill(''));
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const phoneFromUrl = params.get('phone');
    setPhone(phoneFromUrl);
  }, [location]);

  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, '');
    if (!isNaN(value) && value.length === 1) {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move to the next input field automatically
      if (element.nextSibling) {
        element.nextSibling.focus();
      }
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join('').trim();

    if (enteredOtp.length !== 4) {
      alert("Please enter the correct OTP!");
      return;
    }

    setLoading(true);
    try {
      const body = { phone, otp: enteredOtp };
      console.log("body", body);
      const response = await axios.post(`${BASE_URL}/verify`, body);
      console.log("response for verify otp", response);

      if (response.status === 200) {
        alert("Number is Verified. Please add your Details!");
        navigate(`/register?phone=${phone}`);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error.message);
      alert("Error: Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full text-center">
        <div className="mb-6">
          <img src={img1} alt="OTP Verification" className="mx-auto" />
        </div>
        <h2 className="text-lg font-semibold mb-4">OTP Verification</h2>
        <p className="text-gray-500 mb-6">Enter the OTP sent to <strong>+91 {phone}</strong></p>
        <div className="flex justify-center mb-4 space-x-2">
          {otp.map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="w-10 h-10 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={otp[index]}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
              disabled={loading} // Disable input fields while loading
            />
          ))}
        </div>
        <p className="text-sm text-gray-400 mb-6">
          Didn’t you receive the OTP? <span className="text-blue-500 cursor-pointer">Resend OTP</span>
        </p>
        <button
          onClick={handleSubmit}
          className={`w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
        <p className="text-sm text-gray-400 mt-4">
          Already have an account? <span onClick={() => navigate(`/phoneAuth?phone=${phone}`)}  className="text-blue-500 cursor-pointer">Sign In</span>
        </p>
      </div>
    </div>
  );
};

export default OTPverificationAuth;
