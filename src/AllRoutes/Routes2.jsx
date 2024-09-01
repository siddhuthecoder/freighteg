import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import StaffNavbar from "../components/StaffNavbar";
import LandingPage from "../LandingPage1/LandingPage";
import Privacy from "../LandingPage1/Privacy";
import TermsAndConditions from "../LandingPage1/TermsAndConditions";
import About from "../pages/AboutUs/About";
import AddVendor from "../pages/AddVendor";
import AssignedReqOne from "../pages/Alert/AssignedRequest/AssignedReqOne";
import AssignedReqThree from "../pages/Alert/AssignedRequest/AssignedReqThree";
import AssignedReqTwo from "../pages/Alert/AssignedRequest/AssignedReqTwo";
import AllBid from "../pages/AllBid";
import Bid from "../pages/Bid";
import Contact from "../pages/Contact/Contact";
import EditForm from "../pages/EditForm";
import History from "../pages/History";
import Home from "../pages/Home";
import Live from "../pages/Live";
import Login from "../pages/LoginModule/Login";
import LoginPage from "../pages/LoginModule/Loginpage";
import TransporterLogin from "../pages/LoginModule/TransporterLogin";
import AllPodRequest from "../pages/MainPod/AllPodRequest";
import DownloadedPod from "../pages/MainPod/DownloadedPod";
import CompanyOne from "../pages/NormalAdmin/CompanyOne";
import CompanyTwo from "../pages/NormalAdmin/CompanyTwo";
import PodOne from "../pages/Pod/Podpages/PodOne";
import PodThree from "../pages/Pod/Podpages/PodThree";
import PodTwo from "../pages/Pod/Podpages/PodTwo";
import PodForm from "../pages/PodForm";
import Price from "../pages/Pricing/Price";
import MyrankCompanyone from "../pages/Reporting/ReportPages/MyrankCompanyone";
import MyrankCompanyThree from "../pages/Reporting/ReportPages/MyrankCompanyThree";
import MyrankCompanyTwo from "../pages/Reporting/ReportPages/MyrankCompanyTwo";
import Result from "../pages/Result";
import StaffBid from "../pages/StaffBid";
import User from "../pages/User";
import UserForm from "../pages/UserForm";
import Vendor from "../pages/Vendor";
import ViewDetails from "../pages/ViewDetails";
import PrivateRoute from "./PrivateRoute";
import MainPage from "./../LandingPageComponents/MainPage";
import HistoryPage from "../components/bid/history/History";
import BidLayout from "../components/bid/Layout";
import Open from "../components/bid/open/Open";
import Counter from "../components/bid/counter/Counter";
import Cancelled from "../components/bid/cancelled/Cancelled";
import ResultPage from "../components/bid/result/Result";
import Branch from "../components/Branch/Branch";
import { FaS } from "react-icons/fa6";

import Fastag from "../components/VechileInfo/Fastag";
import FastagId from "../components/VechileInfo/FastagId";
import Sarathi from "../components/VechileInfo/Sarathi";
import SarathiId from "../components/VechileInfo/VahanId";
import Vahan from "../components/VechileInfo//Vahan";
import Profile from "../components/Profile/Profile";
import Wallet from "../components/Wallet/Wallet";

import LoginAuth from "../components/auth/Login";
import PhoneAuth from "../components/auth/Phone";
import OTPverificationAuth from "../components/auth/OTPverification.jsx";
import EnterPhoneAuth from "../components/auth/EnterPhone.jsx";
import RegisterAuth from "../components/auth/Register.jsx";
import PhoneRegister from "../components/auth/PhoneRegister.jsx";

const Layout = () => {
  const user = useSelector((state) => state.login.user);

  console.log("User in Layout:", user);

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {user?.role === "company" ? <Navbar /> : <StaffNavbar />}
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

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

  const user = useSelector((state) => state.login.user);
  const token = useSelector((state) => state.login.token);

  useEffect(() => {
    console.log("User:", user);
    console.log("Token:", token);
  }, [user, token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* <Route path="/" element={<LandingPage />} /> */}
      {/* Route for all */}
      <Route path="/" element={<MainPage />} />
      <Route path="/pricing" element={<Price />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
{/* Route for all */}

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
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/wallet' element={<Wallet/>}/>

      <Route path='/loginAuth' element={<LoginAuth />}/>
      <Route path='/enterPhoneAuth' element={<EnterPhoneAuth />}/>
      <Route path='/phoneAuth' element={<PhoneAuth />}/>
      <Route path='/otp' element={<OTPverificationAuth />}/>
      <Route path='/register' element={<RegisterAuth />}/>
      <Route path='/phoneRegister' element={<PhoneRegister />}/>
      

      <Route path="/profile" element={<Profile />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="allpodrequest" element={<AllPodRequest />} />
      <Route path="podform" element={<PodForm />} />
      <Route path="allvendor" element={<Vendor />} />
      <Route path="users" element={<User />} />
      

    </Routes>
  );
};

export default AllRoutes2;
