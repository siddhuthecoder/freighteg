import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FaPhoneFlip } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { logOut } from "../app/features/auth/loginSlice";
import MiddleNav from "../components/middleNavbar/MiddleNav";

const MenuItem = ({ icon, children, onClick }) => (
  <div
    className="py-2 px-4 hover:bg-blue-100 text-blue-500 cursor-pointer w-full text-center flex items-center rounded-3xl mr-3"
    onClick={onClick}
  >
    {icon && <div className="mr-2">{icon}</div>}
    <div>{children}</div>
  </div>
);

const LeftMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <div className="relative flex flex-col h-[100vh] bg-white shadow-sm border-2 w-[9vw]">
      <div className="absolute top-4 right-4 mt-20 lg:hidden">
        <button onClick={() => setShowMenu(!showMenu)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {showMenu ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </div>

      <div
        className={`flex flex-col items-center justify-center h-[38vh] mt-16 ${
          showMenu ? "block" : "hidden lg:flex"
        }`}
      >
        <MiddleNav path={location.pathname} />
      </div>

      <div
        className={`flex flex-col items-center justify-center h-1/2 mt-40 ${
          showMenu ? "block" : "hidden lg:flex"
        }`}
      >
        <MenuItem icon={<CiSettings />}>Settings</MenuItem>
        <MenuItem icon={<CgProfile />}>Profile</MenuItem>
        <MenuItem icon={<FaPhoneFlip />}>Contact Us</MenuItem>
        <MenuItem icon={<IoIosLogOut />} onClick={handleLogout}>
          Logout
        </MenuItem>
      </div>
    </div>
  );
};

export default LeftMenu;
// import React from 'react'
// // import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { CiSettings } from "react-icons/ci";
// import { CgProfile } from "react-icons/cg";
// import { FaPhoneFlip } from "react-icons/fa6";
// import { IoIosLogOut } from "react-icons/io";
// import { useDispatch } from "react-redux";
// import { logOut } from "../app/features/auth/loginSlice";
// import MiddleNav from "../components/middleNavbar/MiddleNav";

// const LeftMenu = () => {
//   const MenuItem = ({ icon, children, onClick }) => (
//   <div
//     className="py-2 px-4 hover:bg-blue-100 text-blue-500 cursor-pointer w-full text-center flex items-center rounded-3xl mr-3"
//     onClick={onClick}
//   >
//     {icon && <div className="mr-2">{icon}</div>}
//     <div>{children}</div>
//   </div>
// );
//   return (
//     <>
//       <div className="fixed z-[1] right-0 flex flex-col ps-3 top-0 h-screen w-[260px] bg-red-600 shadow"></div>
//     </>
//   )
// }

// export default LeftMenu

