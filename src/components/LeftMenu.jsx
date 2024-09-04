// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { CiSettings } from "react-icons/ci";
// import { CgProfile } from "react-icons/cg";
// import { FaPhoneFlip } from "react-icons/fa6";
// import { IoIosLogOut } from "react-icons/io";
// import { useDispatch } from "react-redux";
// import { logOut } from "../app/features/auth/loginSlice";
// import MiddleNav from "../components/middleNavbar/MiddleNav";

// const MenuItem = ({ icon, children, onClick }) => (
//   <div
//     className="py-2 px-4 hover:bg-blue-100 text-blue-500 cursor-pointer w-full text-center flex items-center rounded-3xl mr-3"
//     onClick={onClick}
//   >
//     {icon && <div className="mr-2">{icon}</div>}
//     <div>{children}</div>
//   </div>
// );

// const LeftMenu = () => {
//   const [showMenu, setShowMenu] = useState(false);
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logOut());
//     navigate("/login");
//   };

//   return (
//     <div className="relative flex flex-col h-[100vh] bg-white shadow-sm border-2 w-[9vw]">
//       <div className="absolute top-4 right-4 mt-20 lg:hidden">
//         <button onClick={() => setShowMenu(!showMenu)}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             {showMenu ? (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             ) : (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16m-7 6h7"
//               />
//             )}
//           </svg>
//         </button>
//       </div>

//       <div
//         className={`flex flex-col items-center justify-center h-[38vh] mt-16 ${
//           showMenu ? "block" : "hidden lg:flex"
//         }`}
//       >
//         <MiddleNav path={location.pathname} />
//       </div>

//       <div
//         className={`flex flex-col items-center justify-center h-1/2 mt-40 ${
//           showMenu ? "block" : "hidden lg:flex"
//         }`}
//       >
//         <MenuItem icon={<CiSettings />}>Settings</MenuItem>
//         <MenuItem icon={<CgProfile />}>Profile</MenuItem>
//         <MenuItem icon={<FaPhoneFlip />}>Contact Us</MenuItem>
//         <MenuItem icon={<IoIosLogOut />} onClick={handleLogout}>
//           Logout
//         </MenuItem>
//       </div>
//     </div>
//   );
// };

// export default LeftMenu;
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CiSettings } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';
import { FaPhoneFlip } from 'react-icons/fa6';
import { IoIosLogOut } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { logOut } from '../app/features/auth/loginSlice';
import MiddleNav from '../components/middleNavbar/MiddleNav';
import { Link } from 'react-router-dom';
import { VscAccount } from "react-icons/vsc";
import { IoIosArrowDown } from "react-icons/io";

const LeftMenu = ({tabs,user}) => {
  const [isOpen, setIsOpen] = useState(true); // State to manage menu visibility

  const MenuItem = ({ icon, children, onClick }) => (
    <div
      className="py-2 px-4 hover:bg-blue-100 text-blue-500 cursor-pointer w-full text-center flex items-center rounded-3xl mr-3"
      onClick={onClick}
    >
      {icon && <div className="mr-2">{icon}</div>}
      <div>{children}</div>
    </div>
  );

  const handleClose = () => {
    setIsOpen(false); // Set menu visibility to false
  };


  function truncateText(text, maxLength = 15) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  return (
    <>
      {isOpen && ( // Conditionally render the menu based on state
        <div className="fixed z-[100] left-0 flex flex-col justify-between ps-3 top-0 h-screen w-[260px] bg-white shadow">
          <div className="flex flex-col">
            <div className="w-full flex items-center justify-end">
              <button
                className="rounded-md bg-red-200 text-red-600 px-3 py-1 m-2"
                onClick={handleClose} // Handle close button click
              >
                Close
              </button>
            </div>
            <div className="w-full flex flex-col">
              {tabs.map((item) => (
                <Link to={item.path} className="hover:bg-blue-200 mx-3 py-3 ps-2 rounded-md hover:text-blue-600 flex items-center text-zinc-500 font-semibold">
                      {item.label}
                </Link>
              ) )}
            </div>
          </div>

          <button
                  className="bg-white shadow-md border bg-opacity-30 mx-3 mb-3 rounded-full flex items-center text-sm focus:outline-none focus:ring-2  transition duration-300 ease-in-out hover:bg-opacity-40 px-4 py-2"
                  // onClick={() => setShowDropdown(!showDropdown)}
                >
                  <VscAccount className="h-6 w-6 text-blue-600 mr-2" />
                  <span className="font-semibold mr-1">{truncateText(user?.name)}</span>
                  <IoIosArrowDown
                    className={`h-4 w-4 transition-transform duration-300 `}
                  />
                </button>
          {/* Include other menu content here */}
        </div>
      )}
    </>
  );
};

export default LeftMenu;
