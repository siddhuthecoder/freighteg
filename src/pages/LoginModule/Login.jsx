import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { store } from "../../app/store";
import { setCredentials } from "../../app/features/auth/loginSlice";
import { toast } from "react-hot-toast";

const Login = ({ handleAuthentication, setModel }) => {
  const [formData, setFormData] = useState({
    role: "company",
    phone: "",
    password: "",
  });
  console.log(formData);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/Login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { phone, password } = formData;
    if (!phone || !password) {
      alert("Please enter your phone number and password");
      return;
    }

    try {
      const response = await fetch(
        "https://freighteg.in/freightapi/freightuser/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        // console.log(data.data)
        if (data && data.token) {
          // Store token and user details in localStorage
          localStorage.setItem("branch_id", data.id); // Store user ID
          // localStorage.setItem('branchName', data.id);


          store.dispatch(
            setCredentials({ user: data.user, token: data.token })
          );
          handleAuthentication(true);
          navigate("/open");
          toast.success("Company Login successful");
        } else {
          console.error("Authentication failed");
          alert("Authentication failed. Please try again.");
        }
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
        alert(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div
        className="absolute top-5 right-5 cursor-pointer text-gray-500 hover:text-gray-800 transition duration-300"
        onClick={() => setModel(false)}
      >
        &times;
      </div>
      <div
        className="auth-container bg-white shadow-lg rounded-lg p-8"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h1 className="font-bold text-blue-900 text-3xl mb-5">
          Hello Again! <br /> Log In Below
        </h1>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="phone"
              placeholder="+910000000000"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              placeholder="required"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
