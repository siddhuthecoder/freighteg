import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported

const BASE_URL = 'https://freighteg.in/freightapi';

const RegisterAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gst: '',
    pan: '',
    address: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const phone = params.get('phone');
    if (phone) {
      setFormData((prevData) => ({
        ...prevData,
        phone,
      }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, password, confirmPassword, gst, pan, phone, address } = formData;

    if (!name.trim() || !password.trim() || !confirmPassword.trim()) {
      alert("Name, Password, and Confirm Password are required fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (gst.trim() && !gstRegex.test(gst.trim())) {
      alert("Invalid GST format.");
      return;
    }

    if (pan.trim() && !panRegex.test(pan.trim())) {
      alert("Invalid PAN format.");
      return;
    }

    setIsLoading(true);
    try {
      const body = {
        name,
        PAN: pan,
        GST: gst,
        password: confirmPassword,
        phone,
        address,
        role: "company",
      };

      const response = await axios.post(`${BASE_URL}/add-company`, body);
      console.log("response in register user: ", response?.data);
      
      if (response?.status === 201) {
        handleNewUserWallet(response?.data?.company_id);
      } else {
        throw new Error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error in register user: ", error);
      const errorMessage = error?.response?.data?.message || "Something went wrong. Please try again.";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewUserWallet = async (company_id) => {
    setIsLoading(true);
    try {
      const body = { company_id };
      const response = await axios.post(`${BASE_URL}/freightWalletBalance`, body);
      console.log("response new user wallet: ", response);

      if (response.status === 200) {
        alert("Registered successfully! Please Login.");
        navigate(`/loginAuth?phone=${formData.phone}`);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error in new user wallet: ", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Create a new account</h2>
        <form onSubmit={handleRegister}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phone number"
                disabled
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="gst" className="block text-sm font-medium text-gray-700">GST</label>
              <input
                type="text"
                id="gst"
                name="gst"
                value={formData.gst}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your GST number (optional)"
              />
            </div>
            <div>
              <label htmlFor="pan" className="block text-sm font-medium text-gray-700">PAN</label>
              <input
                type="text"
                id="pan"
                name="pan"
                value={formData.pan}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your PAN number (optional)"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your address (optional)"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 012.125-3.825M21 21l-3-3m-3 0a10.05 10.05 0 01-2.125-3.825 10.05 10.05 0 011.875-2.175M12 5c4.478 0 8.268 2.943 9.542 7a10.05 10.05 0 01-2.125 3.825M21 3l-3 3m-3 0a10.05 10.05 0 01-2.125 3.825 10.05 10.05 0 01-1.875 2.175M12 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 012.125-3.825" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>
          <p className="text-gray-600">ALready  Have An Account? <span onClick={() => navigate(`/phoneAuth?phone=${formData.phone}`)} className="text-blue-600 font-semibold">Sign In</span></p>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterAuth;
