import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "../pages/LoginModule/Loginpage";
import Navbar from "../components/Navbar";
import SubNavbar from "../components/SubNavbar";
import PrivateRoute from "./PrivateRoute";
import LandingPage from "../LandingPage/LandingPage";
import Login from "../pages/LoginModule/Login";
import Home from "../pages/Home";
import Live from "../pages/Live";
import Result from "../pages/Result";
import History from "../pages/History";
import Vendor from "../pages/Vendor";
import AddVendor from "../pages/AddVendor";
import User from "../pages/User";
import ViewDetails from "../pages/ViewDetails";
import UserForm from "../pages/UserForm";
import PodForm from "../pages/PodForm";
import EditForm from "../pages/EditForm";
import MyrankCompanyone from "../pages/Reporting/ReportPages/MyrankCompanyone";
import MyrankCompanyTwo from "../pages/Reporting/ReportPages/MyrankCompanyTwo";
import MyrankCompanyThree from "../pages/Reporting/ReportPages/MyrankCompanyThree";
import AssignedReqOne from "../pages/Alert/AssignedRequest/AssignedReqOne";
import AssignedReqTwo from "../pages/Alert/AssignedRequest/AssignedReqTwo";
import AssignedReqThree from "../pages/Alert/AssignedRequest/AssignedReqThree";
import PodOne from "../pages/Pod/Podpages/PodOne";
import PodTwo from "../pages/Pod/Podpages/PodTwo";
import PodThree from "../pages/Pod/Podpages/PodThree";
import CompanyOne from "../pages/NormalAdmin/CompanyOne";
import CompanyTwo from "../pages/NormalAdmin/CompanyTwo";
import AllBid from "../pages/AllBid";
import AllPodRequest from "../pages/MainPod/AllPodRequest";
import DownloadedPod from "../pages/MainPod/DownloadedPod";
import Bid from "../pages/Bid";
import TransporterLogin from "../pages/LoginModule/TransporterLogin";
import StaffNavbar from "../components/StaffNavbar";
import StaffBid from "../pages/StaffBid";
import TermsAndConditions from "../LandingPage/TermsAndConditions";
import Privacy from "../LandingPage/Privacy";

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
      <Route path="/" element={<LandingPage />} />
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
