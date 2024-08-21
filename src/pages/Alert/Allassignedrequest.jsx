// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Allassignedrequest = () => {
//   const [selectedItem, setSelectedItem] = useState(0);

//   const data = [
//     { label: "Company 1", link: "/assignreqone" },
//     { label: "Company 2", link: "/assignreqtwo" },
//     { label: "Company 3", link: "/assignreqthree" },
//   ];

//   const handleItemClick = (index) => {
//     setSelectedItem(index);
//   };

//   return (
//     <div
//       className="flex flex-col justify-between px-3 py-5 rounded-md mx-2"
//       style={{
//         width: "8vw",
//         height: "4rem", // Define a fixed height for the container
//         top: "232px",
//         left: "207px",
//         padding: "0px",
//         gap: "20px",
//       }}
//     >
//       {data.map((item, index) => (
//         <Link to={item.link} key={index} style={{ flex: 1 }}>
//           <div
//             className={`flex items-center justify-between cursor-pointer text-xs ${selectedItem === index ? "bg-[#f0f8ff]" : "bg-[#ffffff]"
//               }`}
//             onClick={() => handleItemClick(index)}
//             style={{
//               height: "4vh", // Each button takes full height of its flex container
//               borderRadius: "40px",
//               border: "0.75px solid #dbe5f1",
//               display: "flex",
//               alignItems: "center",
//               marginLeft: "5px",
//               padding: "0 10px", // Add padding for better text alignment
//             }}
//           >
//             <div
//               style={{ fontSize: selectedItem === index ? "16px" : "18px" }}
//               className={`flex-grow ${selectedItem === index ? "text-[#00A6F6]" : "text-[#888888]"
//                 }`}
//             >
//               {item.label}
//             </div>

//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default Allassignedrequest;
