import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { RxHamburgerMenu } from "react-icons/rx";
import LeftMenu from "./LeftMenu";
import { useSelector } from "react-redux";

const SubNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userDetails = useSelector((state) => state.login.user);
  const location = useLocation(); // Get current location
  console.log("userdetails", userDetails);
  return (
    <>
      <nav className="bg-white-800 shadow-sm w-full">
        <div className="flex items-center justify-between h-16 w-full border-2">
          <div className="md:hidden">
            <button onClick={() => setShowMenu(!showMenu)}>
              <RxHamburgerMenu />
            </button>
          </div>
          <div className="show md:block w-full mr-10">
            <div className="flex items-center justify-end space-x-4 w-full">
              {/* Spacer */}
              <div className="flex-grow"></div>
              {/* Menu Items */}
              <div className="flex items-center space-x-4">
                <NavLink
                  to="/companyone"
                  isActive={() => location.pathname === "/companyone"}
                >
                  New Load
                </NavLink>
                <NavLink
                  to="/myrankcompanyone"
                  isActive={() => location.pathname === "/myrankcompanyone"}
                >
                  My Rank
                </NavLink>
                <NavLink
                  to="/assignreqone"
                  isActive={() => location.pathname === "/assignreqone"}
                >
                  Assigned Request
                </NavLink>
                <NavLink
                  to="/podone"
                  isActive={() => location.pathname === "/podone"}
                >
                  POD
                </NavLink>
                <div className="flex text-gray-600  px-3 py-2 rounded-md text-sm font-medium h-auto">
                  {userDetails?.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {showMenu && <LeftMenu />}
    </>
  );
};

const NavLink = ({ to, children, isActive }) => {
  const location = useLocation();

  return (
    <Link
      to={to}
      className={`px-1 py-2 text-sm font-medium ${
        isActive() && location.pathname === to
          ? "border-b-2 border-[#00A6F6] text-[#00A6F6]"
          : "text-gray-600"
      }`}
    >
      {children}
    </Link>
  );
};

export default SubNavbar;
