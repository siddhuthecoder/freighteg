import React, { useState } from "react";
// import vectorIcons from "../assets/Vector.png";
import MiddleNav from "../components/middleNavbar/MiddleNav";
import { useLocation, useNavigate } from "react-router-dom";
import { CiSettings } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FaPhoneFlip } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { logOut } from "../app/features/auth/loginSlice";

const LeftMenu = () => {
  const [activeItem, setActiveItem] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("param", location.pathname);

  const handleClick = (index) => {
    setActiveItem(index);
  };
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    console.log("saurabh");
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <div className="relative flex flex-col h-[100vh] bg-white text-white-200 shadow-sm border-2 w-[9vw]">
      <div className="lg:show absolute top-4 right-4 mt-20">
        <button onClick={() => setShowMenu(!showMenu)}>
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
        </button>
      </div>

      <div
        className={`flex flex-col items-center justify-center h-[38vh] ${
          showMenu ? "block" : "hidden lg:flex"
        }`}
        style={{
          fontFamily: "Poppins",
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: "24px",
          letterSpacing: "0em",
          textAlign: "center",
          marginTop: "60px",
        }}
      >
        <MiddleNav path={location.pathname} />
      </div>

      <div
        className={`flex flex-col items-center justify-center h-1/2 mt-40 ${
          showMenu ? "block" : "hidden lg:flex"
        }`}
      >
        <div className="h-20 mt-40"></div>

        <div>
          <MenuItem
            icon={<CiSettings />}
            style={{
              fontSize: "inherit",
              fontFamily: "inherit",
              textAlign: "inherit",
            }}
          >
            Settings
          </MenuItem>
        </div>
        <div>
          <MenuItem
            icon={<CgProfile />}
            style={{
              fontSize: "inherit",
              fontFamily: "inherit",
              textAlign: "inherit",
            }}
          >
            Profile
          </MenuItem>
        </div>
        <div>
          <MenuItem
            icon={<FaPhoneFlip />}
            style={{
              fontSize: "inherit",
              fontFamily: "inherit",
              textAlign: "inherit",
            }}
          >
            Contact Us
          </MenuItem>
        </div>
        <div onClick={handleLogout}>
          <MenuItem
            icon={<IoIosLogOut />}
            style={{
              fontSize: "inherit",
              fontFamily: "inherit",
              textAlign: "inherit",
            }}
          >
            Logout
          </MenuItem>
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, children }) => {
  return (
    <div className="py-2 px-4 hover:bg-blue-100 text-blue-500 cursor-pointer w-full text-center flex items-center rounded-3xl mr-3">
      {icon && <div className="mr-2 bg-blue-100">{icon}</div>}

      <div>{children}</div>
    </div>
  );
};

export default LeftMenu;
