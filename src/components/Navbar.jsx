import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import {  FaPencilAlt, FaStore, FaUsers, FaBuilding, FaTag, FaCar, FaBook, FaWallet } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RiAuctionFill } from "react-icons/ri";

import { logOut } from "../app/features/auth/loginSlice";
import logo from "./Freight Logo.png"; // Import the logo image

const routes = [
  { path: "/open", name: "Bid", icon: <RiAuctionFill className="h-5 w-5" /> },
  { path: "/allpodrequest", name: "POD", icon: <FaPencilAlt className="h-5 w-5" /> },
  { path: "/allvendor", name: "Vendor", icon: <FaStore className="h-5 w-5" /> },
  { path: "/users", name: "Users", icon: <FaUsers className="h-5 w-5" /> },
  { path: "/branch", name: "Branch", icon: <FaBuilding className="h-5 w-5" /> },
  { path: "/fastag", name: "Fastag", icon: <FaTag className="h-5 w-5" /> },
  { path: "/vahan", name: "Vahan", icon: <FaCar className="h-5 w-5" /> },
  { path: "/sarathi", name: "Sarathi", icon: <FaBook className="h-5 w-5" /> },
  { path: "/wallet", name: "Wallet", icon: <FaWallet className="h-5 w-5" /> }
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
      <nav className="fixed top-0 left-0 right-0 bg-white w-full z-50 text-black shadow-lg">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Side: Logo */}
            <div className="flex items-center space-x-8">
              <Link to="#" className="font-bold text-xl">
                <img src={logo} alt="FreightEG" className="h-8 w-auto" />
              </Link>
            </div>

            {/* Center: Navigation Links for Desktop */}
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

            {/* Right Side: User Info and Mobile Menu Button */}
            <div className="flex items-center space-x-4">
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
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:hidden">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="bg-gray-700 hover:bg-gray-600 inline-flex items-center justify-center p-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">Open main menu</span>
                  <RxHamburgerMenu className="block h-6 w-6" aria-hidden="true" />
                </button>
              </div>
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
            {routes.map(({ path, name, icon }) => (
              <Link
                key={path}
                to={path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 flex items-center space-x-2"
              >
                {icon}
                <span>{name}</span>
              </Link>
            ))}
            <Link
              to="/transporter/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 flex items-center space-x-2"
            >
              <VscAccount className="h-5 w-5" />
              <span>Profile</span>
            </Link>
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
      className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
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
