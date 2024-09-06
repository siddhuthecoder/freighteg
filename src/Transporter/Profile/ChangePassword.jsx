import React, { useState } from 'react';
import axios from 'axios';
import TransportNavBar from '../TransportNavBar';
import { useSelector } from 'react-redux';
import './ChangePassword.css'; // Import your custom CSS for additional styles

const BASE_URL = 'https://freighteg.in/freightapi';

const ChangePassword = () => {
  const [show, setShow] = useState(false);
  const [otp, setOTP] = useState(["", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [load, setLoad] = useState(false);

  const user = useSelector((state) => state.login.user);

  const handleYes = async () => {
    setShow(true);
    alert(JSON.stringify(user));
    try {
      const body = { phone: user?.phone, role: user?.role };
      console.log("body", body);
      const response = await axios.post(`${BASE_URL}/forgot-password`, body);
      console.log("response for yes and change password", response);
      if (response.status === 200) {
        alert("Success", "OTP sent Successfully!");
      } else {
        alert("Sorry!", "No user found");
      }
    } catch (error) {
      console.error(error.message);
      alert("Error", "Something went wrong. Please try again.");
    }
  };

  const handleSubmit = async () => {
    const enteredOTP = otp.join("").trim();

    if (enteredOTP.length !== 4) {
      alert("Sorry", "Please enter the correct OTP!");
      return;
    }

    if (password.trim() === "" || confirmpassword.trim() === "") {
      alert("Sorry", "Please Fill the Password fields.");
      return;
    }
    if (password !== confirmpassword) {
      alert("Sorry", "Password is not the same. Check Again!");
      return;
    }
    setLoad(true);
    try {
      const body = {
        phone: user?.phone,
        otp: enteredOTP,
        newPassword: confirmpassword,
        role: user?.role,
      };
      console.log("body: ", body);
      const response = await axios.post(`${BASE_URL}/forgot-password`, body);
      console.log("response on request", response.data);
      if (response?.status === 200) {
        alert("Success", "Your Password Changed Successfully!");
        setConfirmPassword("");
        setPassword("");
        setOTP(["", "", "", ""]);
        window.location.href = "/home";
      } else {
        throw new Error("Something went wrong!! Check Your OTP.");
      }
    } catch (error) {
      console.log("catch error", error);
      const errorMessage =
        error?.response?.data?.message ||
        "Something went wrong!! Check your OTP.";
      alert("Error", errorMessage);
    } finally {
      setLoad(false);
    }
  };

  return (
    <>
      <TransportNavBar />
      <div className="change-password-container">
        <h2 className="text-2xl font-semibold py-3 text-[#1e3a8a]">Change Password</h2>
        <button className=" px-3 py-2 rounded-md text-white bg-[#1e3a8a]" onClick={handleYes}>
          Yes, I want to change my password
        </button>
        {show && (
          <div className="form-container fade-in">
            <input
              type="text"
              className="input-field"
              placeholder="Enter OTP"
              value={otp.join("")}
              onChange={(e) => setOTP(e.target.value.split("").slice(0, 4))}
            />
            <input
              type="password"
              className="input-field"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="input-field"
              placeholder="Confirm Password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className={`px-3 py-2 rounded-md text-white bg-[#1e3a8a] ${load ? "loading" : ""}`}
              onClick={handleSubmit}
              disabled={load}
              classNam
            >
              {load ? "Submitting..." : "Submit"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ChangePassword;
