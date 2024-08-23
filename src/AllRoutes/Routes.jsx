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
import MainPage from './../LandingPageComponents/MainPage';
import History1 from "../components/bid/History";
import BidLayout from "../components/bid/Layout";
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

const AllRoutes = () => {
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
      <Route path="/" element={<MainPage />} />
      
      
      
      <Route path="/pricing" element={<Price/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/his1" element={<History1/>}/>
      <Route
        path="/login"
        element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
      />
      
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/privacy-policy" element={<Privacy />} />
      {isAuthenticated && (
        <Route element={<Layout />}>
          <Route
            path="bid"
            element={
              <PrivateRoute>
                <Bid />
              </PrivateRoute>
            }
          />
          <Route
            path="StaffBid"
            element={
              <PrivateRoute>
                <StaffBid />
              </PrivateRoute>
            }
          />
          <Route
            path="login"
            element={
              <PrivateRoute>
                <Login />
              </PrivateRoute>
            }
          />
          <Route
            path="transporterlogin"
            element={
              <PrivateRoute>
                <TransporterLogin />
              </PrivateRoute>
            }
          />
          <Route
            path="home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="live"
            element={
              <PrivateRoute>
                <Live />
              </PrivateRoute>
            }
          />
          <Route
            path="result"
            element={
              <PrivateRoute>
                <Result />
              </PrivateRoute>
            }
          />
          <Route
            path="history"
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          />
          <Route
            path="allvendor"
            element={
              <PrivateRoute>
                <Vendor />
              </PrivateRoute>
            }
          />
          <Route
            path="addvendors"
            element={
              <PrivateRoute>
                <AddVendor />
              </PrivateRoute>
            }
          />
          <Route
            path="allbid"
            element={
              <PrivateRoute>
                <AllBid />
              </PrivateRoute>
            }
          />
          <Route
            path="allpodrequest"
            element={
              <PrivateRoute>
                <AllPodRequest />
              </PrivateRoute>
            }
          />
          <Route
            path="downloadedpod"
            element={
              <PrivateRoute>
                <DownloadedPod />
              </PrivateRoute>
            }
          />
          <Route
            path="users"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />
          <Route
            path="companyone"
            element={
              <PrivateRoute>
                <CompanyOne />
              </PrivateRoute>
            }
          />
          <Route
            path="companytwo"
            element={
              <PrivateRoute>
                <CompanyTwo />
              </PrivateRoute>
            }
          />
          <Route
            path="myrankcompanyone"
            element={
              <PrivateRoute>
                <MyrankCompanyone />
              </PrivateRoute>
            }
          />
          <Route
            path="myrankcompanytwo"
            element={
              <PrivateRoute>
                <MyrankCompanyTwo />
              </PrivateRoute>
            }
          />
          <Route
            path="myrankcompanythree"
            element={
              <PrivateRoute>
                <MyrankCompanyThree />
              </PrivateRoute>
            }
          />
          <Route
            path="assignreqone"
            element={
              <PrivateRoute>
                <AssignedReqOne />
              </PrivateRoute>
            }
          />
          <Route
            path="assignreqtwo"
            element={
              <PrivateRoute>
                <AssignedReqTwo />
              </PrivateRoute>
            }
          />
          <Route
            path="assignreqthree"
            element={
              <PrivateRoute>
                <AssignedReqThree />
              </PrivateRoute>
            }
          />
          <Route
            path="podone"
            element={
              <PrivateRoute>
                <PodOne />
              </PrivateRoute>
            }
          />
          <Route
            path="podtwo"
            element={
              <PrivateRoute>
                <PodTwo />
              </PrivateRoute>
            }
          />
          <Route
            path="podthree"
            element={
              <PrivateRoute>
                <PodThree />
              </PrivateRoute>
            }
          />
          <Route
            path="viewdetails"
            element={
              <PrivateRoute>
                <ViewDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="userform"
            element={
              <PrivateRoute>
                <UserForm />
              </PrivateRoute>
            }
          />
          <Route
            path="podform"
            element={
              <PrivateRoute>
                <PodForm />
              </PrivateRoute>
            }
          />
          <Route
            path="editform"
            element={
              <PrivateRoute>
                <EditForm />
              </PrivateRoute>
            }
          />
        </Route>
      )}
      {!isAuthenticated && (
        <Route
          path="*"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
      )}
    </Routes>
  );
};

export default AllRoutes;