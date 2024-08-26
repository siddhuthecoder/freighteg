import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import LeftMenu from "./LeftMenu";
import { useSelector } from "react-redux";
import { useGetBalance } from "../HelperFunction/api";
import { useDispatch } from "react-redux";
import { logOut } from "../app/features/auth/loginSlice";
import logo from "./Freight Logo.png"; // Import the logo image

const Navbar = () => {
  const { getBalance } = useGetBalance();
  const user = useSelector((state) => state.login.user);
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-gray-300 w-full z-50 text-black shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Side: Logo and Navigation Links */}
            <div className="absolute left-8 flex items-center space-x-8">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link to="#" className="font-bold text-xl">
                  <img src={logo} alt="FreightEG" className="h-8 w-auto" />
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:block text-black">
                <div className="flex items-center space-x-8 text-black">
                  <NavLink
                    to="/open"
                    isActive={() =>
                      [
                        "/open",
                        "/result",
                        "/history",
                        "/cancelled",
                        "/counter",
                      ].includes(location.pathname)
                    }
                  >
                    Bid
                  </NavLink>

                  <NavLink
                    to="/allpodrequest"
                    isActive={() =>
                      [
                        "/allpodrequest",
                        "/podform"
                      ].includes(location.pathname)
                    }
                  >
                    POD
                  </NavLink>
                  <NavLink
                    to="/allvendor"
                    isActive={() => location.pathname === "/allvendor"}
                  >
                    Vendor
                  </NavLink>
                  <NavLink
                    to="/users"
                    isActive={() => location.pathname === "/users"}
                  >
                    Users
                  </NavLink>
                  <NavLink
                    to="/branch"
                    isActive={() => location.pathname === "/branch"}
                  >
                    Branch
                  </NavLink>
                  <NavLink
                    to="/fastag"
                    isActive={() => location.pathname === "/fastag"}
                  >
                    Fastag
                  </NavLink>
                  <NavLink
                    to="/vahan"
                    isActive={() => location.pathname === "/vahan"}
                  >
                    Vaahan
                  </NavLink>
                  <NavLink
                    to="/sarathi"
                    isActive={() => location.pathname === "/sarathi"}
                  >
                    Sarathi
                  </NavLink>
                </div>
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-grow"></div>

            {/* Right Side: User Info */}
            <div className="hidden md:flex items-center space-x-4 absolute top-0 right-0 mt-2 mr-4">
              <div className="bg-white bg-opacity-30 rounded-full flex items-center text-sm focus:outline-none focus:ring-2  transition duration-300 ease-in-out hover:bg-opacity-40 px-4 py-2">
                <MdOutlineAccountBalanceWallet className="h-6 w-6 text-blue-600 mr-2" />
                <div className="flex flex-row">
                  <span className="font-semibold">
                    {getBalance?.data?.bid_balance} Bids||
                  </span>
                  <span className="font-semibold">
                    {getBalance?.data?.vendor_balance} Vendor
                  </span>
                </div>
              </div>
              <div className="relative">
                <button
                  className="bg-white bg-opacity-30 rounded-full flex items-center text-sm focus:outline-none focus:ring-2  transition duration-300 ease-in-out hover:bg-opacity-40 px-4 py-2"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <VscAccount className="h-6 w-6 text-blue-600 mr-2" />
                  <span className="font-semibold mr-1">{user?.name}</span>
                  <IoIosArrowDown
                    className={`h-4 w-4 transition-transform duration-300 ${
                      showDropdown ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {showDropdown && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-300 ease-in-out">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/contact"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                    >
                      Contact Us
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="bg-white bg-opacity-20 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                <RxHamburgerMenu className="block h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under the fixed navbar */}
      <div className="h-16"></div>

      {showMenu && <LeftMenu />}
    </>
  );
};

const NavLink = ({ to, children, isActive }) => {
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium text-black ${
        isActive()
          ? "bg-black bg-opacity-20 text-black"
          : "text-gray-black hover:bg-white hover:bg-opacity-10 hover:text-blue-400"
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;
