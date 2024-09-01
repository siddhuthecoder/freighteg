import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setAuthData } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const RegisterAuth = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

     navigate(`/loginAuth?phone=${"6303738847"}`); 

    // try {
    //   const response = await fetch('https://freighteg.in/freightapi/freightuser/register', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       phone: formData.phone,
    //       password: formData.password,
    //     }),
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log(data);
    //     navigate(`/loginAuth?phone=${"6303738847"}`); 
    //     // dispatch(setAuthData({ user: data, token: data.token }));

    //     alert('Registration successful!');
    //     // Navigate to a different page or perform other actions here
    //   } else {
    //     alert('Registration failed. Please check your details.');
    //   }
    // } 

    // catch (error) {
    //   console.error('Error registering:', error);
    //   alert('An error occurred. Please try again.');
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Create a new account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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
          <div className="mb-4">
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.05 10.05 0 012.125-3.825M21 21l-3-3m-3 0a10.05 10.05 0 003-3m3 0a10.05 10.05 0 00-3-3M3 3l3 3m0 0a10.05 10.05 0 013-3m3 0a10.05 10.05 0 00-3 3m0 0l3 3m0 0a10.05 10.05 0 00-3 3m0 0l3 3m0 0a10.05 10.05 0 003 3m3 0a10.05 10.05 0 003-3m0 0l3 3" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Re-enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Register now
          </button>
          <div className="mt-6 text-center">
            <p className="text-sm">Already Have An Account? <span href="#" className="text-blue-500" onClick={()=> navigate(`/loginAuth?phone=${"6303738847"}`)}> Sign In</span></p>
            </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterAuth;
