import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Import all your components here
import Navbar from "../components/Navbar";
import StaffNavbar from "../components/StaffNavbar.jsx";
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
import AddVendor from "../pages/AddVendor";


import LoginAuth from "../components/auth/Login";
import PhoneAuth from "../components/auth/Phone";
import OTPverificationAuth from "../components/auth/OTPverification.jsx";
import EnterPhoneAuth from "../components/auth/EnterPhone.jsx";
import RegisterAuth from "../components/auth/Register.jsx";
import PhoneRegister from "../components/auth/PhoneRegister.jsx";
import SignUpPhone from "../components/auth/SignUp_phone.jsx";
import Home from "./../pages/Home";
import History from "../components/bid/history/History.jsx";
import CreateBid from "../staff/CreateBid.jsx";
import ViewBids from "../staff/ViewBids/ViewBids.jsx";
import ViewResult from "../staff/ViewResults/ViewResult.jsx";
import ViewResultHistory from "../staff/ViewResultHistory/ViewResultHistory.jsx";
import StaffFastag from "../staff/VechileInfo/Fastag.jsx";
import StaffVahan from "../staff/VechileInfo/Vahan.jsx";
import StaffSarathi from "../staff/VechileInfo/Sarathi.jsx";
import StaffFastagId from "../staff/VechileInfo/FastagId.jsx";
import StaffVahanId from "../staff/VechileInfo/VahanId.jsx";
import ChangePassword from "./../Transporter/Profile/ChangePassword";
import Companies from "../Transporter/Profile/Companies.jsx";
import Profilee from "../Transporter/Profile/Profile.jsx";
import StateSelection from "../Transporter/Profile/StateSelection.jsx";
import VehicleSelection from "../Transporter/Profile/VehicleSelection.jsx";
import PODUpload from "../Transporter/PODUpload/PODUpload.jsx";
import NewLoad from "../Transporter/NewLoad/NewLoad.jsx";
import MyRank from "../Transporter/MyRank/MyRank.jsx";
import AssignedStaff from "../Transporter/AssignedStaff/AssignedStaff.jsx";
import Branch1 from "../branch/Branch.jsx";

//branch

import branchHistoryPage from "../branch/bid/history/History.jsx";
import BranchOpen from "../branch/bid/open/Open";
import branchBidLayout from "../branch/bid/Layout";
import branchResultPage from "../branch/bid/result/Result";
import BranchCancelled from "../branch/bid/cancelled/Cancelled";
import BranchAllPodRequest from "../branch/pages/MainPod/AllPodRequest.jsx";
import BranchCounter from '../branch/bid/counter/Counter.jsx'
import BranchHistory from "../branch/bid/history/History.jsx";
import BranchResult from "../branch/bid/result/Result";
import BranchFastag from "../branch/VechileInfo/Fastag.jsx";
import BranchFastagId from "../branch/VechileInfo/FastagId";
import BranchVahan from "../branch/VechileInfo/Vahan";
import BranchVahanId from "../branch/VechileInfo/VahanId";
import BranchSarathi from "../branch/VechileInfo/Sarathi";
import branchAllPodRequest from "../pages/MainPod/AllPodRequest";
import branchPodForm from "../branch/pages/PodForm";
import branchVendor from "../branch/pages/Vendor";
import branchUser from "../branch/pages/User";
import BranchCreateBid from "../branch/pages/CreateBid.jsx";
import TransporterCounter from "../Transporter/Counter/TransporterCounter.jsx";

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
      {userType === "Company" && (
        <>
          {/* Routes for Company */}
          <Route path="/his1" element={<HistoryPage />} />
          <Route path="/open" element={<Open />} />
          <Route path="/history" element={<History />} />
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
          <Route path="/allpodrequest" element={<AllPodRequest />} />
          <Route path="/podform" element={<PodForm />} />
          <Route path="/allvendor" element={<Vendor />} />
          <Route path="/users" element={<User />} />
          <Route path="home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="addvendors" element={<AddVendor />} />
        </>
      )}

      {userType === "Staff" && (
        <>
          <Route path="home" element={<Home />} />
          <Route path="/staff/createBid" element={<CreateBid />} />
          <Route path="/staff/viewBid" element={<ViewBids />} />
          <Route path="/staff/viewResult" element={<ViewResult />} />
          <Route
            path="/staff/viewResultHistory"
            element={<ViewResultHistory />}
          />
          <Route path="/staff/fastag" element={<StaffFastag />} />
          <Route path="/staff/vahan" element={<StaffVahan />} />
          <Route path="/staff/sarathi" element={<StaffSarathi />} />
          <Route
            path="/staff/fastag/:vehicleNumber"
            element={<StaffFastagId />}
          />
          <Route
            path="/staff/vahan/:vehicleNumber"
            element={<StaffVahanId />}
          />
        </>
      )}

      {userType === "Transporter" && (
        <>
          {/* <Route path="/profile" element={<Profile />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/allpodrequest" element={<AllPodRequest />} />
              <Route path="/podform" element={<PodForm />} />
              <Route path="/allvendor" element={<Vendor />} />
              <Route path="/users" element={<User />} /> */}
          <Route
            path="/transporter/changePassword"
            element={<ChangePassword />}
          />
          <Route path="/transporter/companies" element={<Companies />} />
          <Route path="/transporter/profile" element={<Profilee />} />
          <Route
            path="/transporter/stateSelection"
            element={<StateSelection />}
          />
          <Route
            path="/transporter/vehicleSelection"
            element={<VehicleSelection />}
          />
          <Route path="/transporter/PODUpload" element={<PODUpload />} />
          <Route path="/transporter/newLoad" element={<NewLoad />} />
          <Route path="/transporter/rank" element={<MyRank />} />
          <Route path="/transporter/Counter" element={<TransporterCounter />} />

          <Route
            path="/transporter/assignedRequest"
            element={<AssignedStaff />}
          />
        </>
      )}

      {userType === "Branch" && (
        <>
          {/* <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/allpodrequest" element={<AllPodRequest />} />
          <Route path="/podform" element={<PodForm />} />
          <Route path="/allvendor" element={<Vendor />} />
          <Route path="/users" element={<User />} /> */}
          <Route path="/branch/layout" element={<BidLayout />} />
          <Route path="/branch/open" element={<BranchOpen />} />
          <Route path="/branch/result" element={<BranchResult />} />
          <Route path="/branch/history" element={<BranchHistory />} />
          <Route path="/branch/counter" element={<BranchCounter />} />
          <Route path="/branch/cancelled" element={<BranchCancelled />} />
          <Route path="/branch/vendor" element={<Open />} />
          <Route path="/branch/staff" element={<Open />} />
          <Route path="/branch/pod" element={<BranchAllPodRequest  />} />
          <Route path="/branch/historypod" element={<Open />} />
          <Route path="/branch/fastag" element={<BranchFastag />} />
          <Route path="/branch/fastag/:id" element={<BranchFastagId />} />
          <Route path="/branch/vahan" element={<BranchVahan />} />
          <Route path="/branch/vahan" element={<BranchVahanId />} />
          <Route path="/branch/sarathi" element={<BranchSarathi />} />
          <Route
            path="/branch/fastag/:vehicleNumber"
            element={<StaffFastagId />}
          />
          <Route
            path="/branch/vahan/:vehicleNumber"
            element={<StaffVahanId />}
          />
          <Route path="/branch/createBid" element={<BranchCreateBid />} />
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
