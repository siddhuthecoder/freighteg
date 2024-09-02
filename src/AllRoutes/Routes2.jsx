import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Import all your components here
import Navbar from "../components/Navbar";
import StaffNavbar from "../components/StaffNavbar";
import MainPage from "../LandingPageComponents/MainPage";
import Price from "../pages/Pricing/Price";
import About from "../pages/AboutUs/About";
import Contact from "../pages/Contact/Contact";
import HistoryPage from "../components/bid/history/History";
import Open from "../components/bid/open/Open";
import Counter from "../components/bid/counter/Counter";
import BidLayout from "../components/bid/Layout";
import ResultPage from "../components/bid/result/Result";
import Cancelled from "../components/bid/cancelled/Cancelled";
import Branch from "../components/Branch/Branch";
import Fastag from "../components/VechileInfo/Fastag";
import FastagId from "../components/VechileInfo/FastagId";
import Sarathi from "../components/VechileInfo/Sarathi";
import SarathiId from "../components/VechileInfo/VahanId";
import Vahan from "../components/VechileInfo/Vahan";
import Profile from "../components/Profile/Profile";
import Wallet from "../components/Wallet/Wallet";
import AllPodRequest from "../pages/MainPod/AllPodRequest";
import PodForm from "../pages/PodForm";
import Vendor from "../pages/Vendor";
import User from "../pages/User";
import LoginAuth from "../components/auth/Login";
import PhoneAuth from "../components/auth/Phone";
import OTPverificationAuth from "../components/auth/OTPverification.jsx";
import EnterPhoneAuth from "../components/auth/EnterPhone.jsx";
import RegisterAuth from "../components/auth/Register.jsx";
import PhoneRegister from "../components/auth/PhoneRegister.jsx";
import SignUpPhone from "../components/auth/SignUp_phone.jsx";

// const Layout = () => {
//   const user = useSelector((state) => state.login.user);

//   console.log("User in Layout:", user);

//   if (!user) {
//     return null;
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       {user?.role === "company" ? <Navbar /> : <StaffNavbar />}
//       <div className="flex-grow">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

const AllRoutes2 = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const userType = localStorage.getItem("userType"); // Get userType from localStorage

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* Common Routes */}
      <Route path="/" element={<MainPage />} />
      <Route path="/pricing" element={<Price />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Conditionally render routes based on userType */}
      {userType === "company" && (
        <>
          {/* Routes for Company */}
          <Route path="/his1" element={<HistoryPage />} />
          <Route path="/open" element={<Open />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/layout" element={<BidLayout />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/cancelled" element={<Cancelled />} />
          <Route path="/branch" element={<Branch />} />
          <Route path="/fastag" element={<Fastag />} />
          <Route path="/sarathi" element={<Sarathi />} />
          <Route path="/vahan" element={<Vahan />} />
          <Route path="/fastag/:vehicleNumber" element={<FastagId />} />
          <Route path="/vahan/:vehicleNumber" element={<SarathiId />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} />
        </>
      )}

      {userType === "staff" && (
        <>
          {/* Routes for Staff */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/allpodrequest" element={<AllPodRequest />} />
          <Route path="/podform" element={<PodForm />} />
          <Route path="/allvendor" element={<Vendor />} />
          <Route path="/users" element={<User />} />
        </>
      )}

      {/* Authentication Routes */}
      <Route path="/loginAuth" element={<LoginAuth />} />
      <Route path="/enterPhoneAuth" element={<EnterPhoneAuth />} />
      <Route path="/phoneAuth" element={<PhoneAuth />} />
      <Route path="/otp" element={<OTPverificationAuth />} />
      <Route path="/register" element={<RegisterAuth />} />
      <Route path="/phoneRegister" element={<PhoneRegister />} />
      <Route path="/signUpPhone" element={<SignUpPhone />} />
    </Routes>
  );
};

export default AllRoutes2;
