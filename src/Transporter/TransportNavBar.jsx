import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../app/features/auth/loginSlice";
import logo from "../components/Freight Logo.png"; // Import the logo image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RiLogoutBoxFill } from "react-icons/ri";
import {
  faLock,
  faBuilding,
  faMapMarkerAlt,
  faCar,
  faUpload,
  faPlus,
  faStar,
  faClipboardList,
} from '@fortawesome/free-solid-svg-icons';

const routes = [
  // { path: "/transporter/changePassword", name: "Change Password", icon: <FontAwesomeIcon icon={faLock} className="h-5 w-5" /> },
  // { path: "/transporter/companies", name: "Companies", icon: <FontAwesomeIcon icon={faBuilding} className="h-5 w-5" /> },
  // { path: "/transporter/stateSelection", name: "State Selection", icon: <FontAwesomeIcon icon={faMapMarkerAlt} className="h-5 w-5" /> },
  // { path: "/transporter/vehicleSelection", name: "Vehicle Selection", icon: <FontAwesomeIcon icon={faCar} className="h-5 w-5" /> },
  { path: "/transporter/newLoad", name: "New Load", icon: <FontAwesomeIcon icon={faPlus} className="h-5 w-5" /> },
  { path: "/transporter/rank", name: "My Rank", icon: <FontAwesomeIcon icon={faStar} className="h-5 w-5" /> },
  { path: "/transporter/assignedRequests", name: "Assigned Requests", icon: <FontAwesomeIcon icon={faClipboardList} className="h-5 w-5" /> },
  { path: "/transporter/PODUpload", name: "POD Upload", icon: <FontAwesomeIcon icon={faUpload} className="h-5 w-5" /> },
];
const routes1 = [
  { path: "/transporter/changePassword", name: "Change Password", icon: <FontAwesomeIcon icon={faLock} className="h-5 w-5" /> },
  { path: "/transporter/companies", name: "Companies", icon: <FontAwesomeIcon icon={faBuilding} className="h-5 w-5" /> },
  { path: "/transporter/stateSelection", name: "State Selection", icon: <FontAwesomeIcon icon={faMapMarkerAlt} className="h-5 w-5" /> },
  { path: "/transporter/vehicleSelection", name: "Vehicle Selection", icon: <FontAwesomeIcon icon={faCar} className="h-5 w-5" /> },
  { path: "/transporter/newLoad", name: "New Load", icon: <FontAwesomeIcon icon={faPlus} className="h-5 w-5" /> },
  { path: "/transporter/rank", name: "My Rank", icon: <FontAwesomeIcon icon={faStar} className="h-5 w-5" /> },
  { path: "/transporter/assignedRequests", name: "Assigned Requests", icon: <FontAwesomeIcon icon={faClipboardList} className="h-5 w-5" /> },
  { path: "/transporter/PODUpload", name: "POD Upload", icon: <FontAwesomeIcon icon={faUpload} className="h-5 w-5" /> },
];

const Navbar = () => {
  const user = useSelector((state) => state.login.user);
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/phoneAuth");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white w-full z-50 text-gray-900 shadow-md">
        <div className="max-w-9xl mx-auto sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left Side: Logo */}
            <div className="flex">
              <div className="flex-shrink-0">
                <Link to="#">
                  <img src={logo} alt="FreightEG" className="h-8 w-auto" />
                </Link>
              </div>
            </div>

            {/* Center: Navigation Links */}
            <div className="hidden lg:flex items-center space-x-4">
              {routes.map(({ path, name, icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  isActive={() => location.pathname === path}
                >
                  {icon}
                  <span className="ml-2">{name}</span>
                </NavLink>
              ))}
            </div>

            {/* Right Side: User Info */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="relative">
                <button
                  className="bg-gray-200 rounded-full flex items-center text-sm px-4 py-2 transition duration-300 ease-in-out hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <VscAccount className="h-6 w-6 text-gray-800 mr-2" />
                  <span className="font-semibold">{user?.name}</span>
                  <IoIosArrowDown
                    className={`h-4 w-4 transition-transform ${
                      showDropdown ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {showDropdown && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    <Link
                      to="/transporter/changePassword"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                    <FontAwesomeIcon icon={faLock} className="h-3 w-3 mr-2" />
                      Change Password
                    </Link>
                    <Link
                      to="/transporter/companies"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faBuilding} className="h-3 w-3 mr-2" />
                      Companies
                    </Link><Link
                      to="/transporter/stateSelection"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="h-3 w-3 mr-2" />
                      State Selection
                    </Link><Link
                      to="/transporter/vehicleSelection"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faCar} className="h-3 w-3 mr-2" />
                      Vehicle Selection
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                    <>
                    
                      
                      Logout
                    </>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="bg-gray-200 inline-flex items-center justify-center p-2 rounded-lg text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <RxHamburgerMenu className="block h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under the fixed navbar */}
      <div className="h-16"></div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="lg:hidden bg-white shadow-lg">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {routes1.map(({ path, name, icon }) => (
              <Link
                key={path}
                to={path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 flex items-center space-x-2"
              >
                {icon}
                <span>{name}</span>
              </Link>
            ))}
            {/* <Link
              to="/transporter/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 flex items-center space-x-2"
            >
              <VscAccount className="h-5 w-5" />
              <span>Profile</span>
            </Link> */}
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 flex items-center space-x-2"
            >
              <VscAccount className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const NavLink = ({ to, children, isActive }) => {
  return (
    <Link
      to={to}
      className={`flex items-center px-2 py-2 rounded-lg text-sm font-medium ${
        isActive()
          ? "bg-black bg-opacity-20 text-black"
          : "text-black hover:bg-white hover:bg-opacity-10 hover:text-blue-400"
      } transition duration-300 ease-in-out`}
    >
      {children}
    </Link>
  );
};

export default Navbar;
