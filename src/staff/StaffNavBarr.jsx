import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faFileInvoice, faChartBar, faCar, faTag, faIdCard } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../app/features/auth/loginSlice";
import logo from "../components/Freight Logo.png";

const routes = [
  { path: "/staff/createBid", label: "Create Bid", icon: <FontAwesomeIcon icon={faTag}  className="h-5 w-5"  /> },
  { path: "/staff/viewBid", label: "View Bid", icon: <FontAwesomeIcon icon={faFileInvoice}  className="h-5 w-5" /> },
  { path: "/staff/viewResult", label: "View Result", icon: <FontAwesomeIcon icon={faChartBar} className="h-5 w-5"  /> },
  { path: "/staff/fastag", label: "Fastag", icon: <FontAwesomeIcon icon={faTag} className="h-5 w-5"  /> },
  { path: "/staff/vahan", label: "Vaahan", icon: <FontAwesomeIcon icon={faCar} className="h-5 w-5"  /> },
  { path: "/staff/sarathi", label: "Sarathi", icon: <FontAwesomeIcon icon={faIdCard}  className="h-5 w-5" /> },
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
            {/* Left Side: Icons */}
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <Link to="#" className="font-bold text-xl">
                  <img src={logo} alt="FreightEG" className="h-8 w-auto" />
                </Link>
              </div>
            </div>

            {/* Center: Routes */}
            <div className="flex flex-grow items-center justify-center space-x-8 hidden lg:flex">
              {routes.map((route) => (
                <NavLink
                  key={route.path}
                  to={route.path}
                  isActive={() => location.pathname === route.path}
                >
                  {route.icon}
                  <span className="ml-2">{route.label}</span>
                </NavLink>
              ))}
            </div>

            {/* Right Side: Profile */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden lg:block">
                <button
                  className="bg-white bg-opacity-30 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 transition duration-300 ease-in-out hover:bg-opacity-40 px-4 py-2"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <FontAwesomeIcon icon={faUser} className="h-6 w-6 text-blue-600 mr-2" />
                  <span className="font-semibold mr-1">{user?.name}</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`h-4 w-4 transition-transform duration-300 ${
                      showDropdown ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {showDropdown && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-300 ease-in-out">
                   
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 ease-in-out"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
              <div className="lg:hidden">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="bg-white bg-opacity-20 inline-flex items-center justify-center p-2 rounded-lg text-white hover:text-white hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">Open main menu</span>
                  <FontAwesomeIcon icon={faBars} className="block h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="h-16"></div>

      {showMenu && (
        <div className="lg:hidden bg-gray-300 shadow-lg">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-100 flex items-center"
              >
                {route.icon}
                <span className="ml-2">{route.label}</span>
              </Link>
            ))}
            {/* <Link
              to="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-100 flex items-center"
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Profile
            </Link> */}
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-100 flex items-center"
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Logout
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
      className={`px-3 py-2 rounded-lg text-sm font-medium text-black flex items-center ${
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
