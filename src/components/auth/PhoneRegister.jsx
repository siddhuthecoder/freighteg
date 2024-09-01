import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import img1 from '../../assets/phone.png';

function PhoneRegister() {
  const [phone, setPhone] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
    // navigate(`/registerAuth?phone=${phone}`);
    navigate("/otp")
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
          <h2 className="text-2xl font-semibold mb-2">Register</h2>
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
            SUBMIT
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-600">Already Have An Account? <span onClick={() => navigate("/loginAuth")} className="text-blue-600 font-semibold">Sign In</span></p>
        </div>
      </div>


    </div>
  );
}

export default PhoneRegister;
