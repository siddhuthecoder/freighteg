// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Allreporting from "../../pages/Reporting/Allreporting";
// import Allassignedrequest from "../../pages/Alert/Allassignedrequest";
// import AllPod from "../../pages/Pod/AllPod";
// import AllBid from "../../pages/AllBid";
// import AllPOD from "../../pages/MainPod/AllPODButton";

// const MiddleNav = ({ path }) => {
//   console.log("dataforleftmenu", path);
//   const [isActive, setIsActive] = useState("");
//   const location = useLocation();

//   return (
//     <>
//       {location.pathname == "/companyone" ||
//       location.pathname == "/companytwo" ? (
//         <div className="flex flex-col justify-start">
//           <Link to="/companyone">
//             <button
//               className={`flex items-center justify-center px-3 font-nunito rounded-3xl py-1 w-[8rem] ml-2 ${
//                 isActive === "Company1"
//                   ? "bg-[#E7F7FF] text-blue-500 border border-gray-200"
//                   : "text-blue-900"
//               }`}
//               onClick={() => setIsActive("Company1")}
//             >
//               Company 1
//             </button>
//           </Link>
//           <Link to="/companytwo">
//             <button
//               className={`flex items-center justify-center px-3 font-nunito rounded-3xl mt-2 py-1 w-[8rem] ml-2 ${
//                 isActive === "Company2"
//                   ? "bg-[#E7F7FF] text-blue-500 border border-gray-200"
//                   : "text-blue-900"
//               }`}
//               onClick={() => setIsActive("Company2")}
//             >
//               Company 2
//             </button>
//           </Link>
//         </div>
//       ) : location.pathname == "/myrankcompanyone" ||
//         location.pathname == "/myrankcompanyone" ||
//         location.pathname == "/myrankcompanytwo" ||
//         location.pathname == "/myrankcompanythree" ? (
//         <Allreporting />
//       ) : location.pathname == "/ assignreqone" ||
//         location.pathname == "/assignreqone" ||
//         location.pathname == "/assignreqtwo" ||
//         location.pathname == "/assignreqthree" ? (
//         <Allassignedrequest />
//       ) : location.pathname == "/podone" ||
//         location.pathname == "/podtwo" ||
//         location.pathname == "/podthree" ? (
//         <AllPod />
//       ) : location.pathname == "/" ||
//         location.pathname == "/live" ||
//         location.pathname == "/result" ||
//         location.pathname == "/history" ? (
//         <AllBid />
//       ) : location.pathname == "/allpodrequest" ||
//         location.pathname == "/downloadedpod" ? (
//         <AllPOD />
//       ) : location.pathname == "/bid" ? (
//         <AllBid />
//       ) : (
//         <h1></h1>
//       )}
//     </>
//   );
// };

// export default MiddleNav;
