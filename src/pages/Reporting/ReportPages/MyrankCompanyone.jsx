// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { CiSearch } from "react-icons/ci";

// const MyRankCompanyOne = () => {
//   const [rankData, setRankData] = useState({ bidDetails: {} });
//   console.log("rankData", rankData);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `https://qiktrack.com/api/bidsRank/6654d621de81727c499f50c0`
//         );
//         setRankData(response.data);
//         console.log("rankdata",response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="bg-gray-100 min-h-screen relative">
//       <div className="relative top-5 left-5" style={{ width: "25vw" }}>
//         <div className="relative bg-white rounded-full">
//           <input
//             type="text"
//             placeholder="Search"
//             className="pl-10 pr-4 py-1 w-full border border-gray-300 rounded-full focus:outline-none focus:border-gray-100"
//           />
//           <CiSearch
//             className="absolute left-3 top-1/2 transform -translate-y-1/2"
//             style={{ width: "16px", height: "16px", color: "#000" }}
//           />
//         </div>
//       </div>
//       {rankData && (
//         <table className="w-full mt-10">
//           <thead>
//             <tr className="bg-[#113870] text-white font-nunito">
//               <th className="px-4 py-3 border-r border-[#113870] rounded-tl-lg">S No</th>
//               <th className="px-4 py-3 border-r border-[#113870]">Company<br />Bid Number</th>
//               <th className="px-4 py-3 border-r border-[#113870]">Start Date<br />& Time</th>
//               <th className="px-4 py-3 border-r border-[#113870]">End Date<br />& Time</th>
//               <th className="px-4 py-3 border-r border-[#113870]">From city<br />To city</th>
//               <th className="px-4 py-3 border-r border-[#113870]">VehicleType<br />Size,Body</th>
//               <th className="px-4 py-3 border-r border-[#113870]">Vehicle<br />Quantity</th>
//               <th className="px-4 py-3 border-r border-[#113870]">MaterialWeight<br />(in kg)</th>
//               <th className="px-4 py-3 border-r border-[#113870]">Rank<br />price/vehicle</th>
//               <th className="px-4 py-3 border-r border-[#113870] rounded-tr-lg">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="text-md border-dashed border-b justify-start text-center font-nunito">
//               <td className="px-4 py-2 relative">
//                 <span className="inline-block w-2 h-2 bg-green-500 rounded-full absolute top-1/2 transform -translate-y-1/2 left-6"></span>
//                 1
//               </td>
//               <td className="px-4 py-2 text-blue-900">
//                 {rankData.bidDetails.company_id}<br /><span className="text-blue-500 text-xs">{rankData.bidDetails._id}</span>
//               </td>
//               <td className="px-4 py-2 text-blue-900">
//                 {new Date(rankData.bidDetails.loading_date).toLocaleDateString()}<br /><span className="text-blue-500 text-xs">{rankData.bidDetails.loading_time}</span>
//               </td>
//               <td className="px-4 py-2 text-blue-900">
//                 {new Date(rankData.bidDetails.expiry_date).toLocaleDateString()}<br /><span className="text-blue-500 text-xs">{rankData.bidDetails.expiry_time}</span>
//               </td>
//               <td className="px-4 py-2 text-green-500">
//                 {rankData.bidDetails.loading_city}
//                 <span className="text-gray-500 mx-1">&#8594;</span>
//                 <span className="text-red-500">{rankData.bidDetails.unloading_city}</span>
//               </td>
//               <td className="px-4 py-2 text-blue-900">
//                 {rankData.bidDetails.vehicle_type},{rankData.bidDetails.vehicle_size}<br /><span className="text-blue-500 text-xs">{rankData.bidDetails.body_type}</span>
//               </td>
//               <td className="px-4 py-2">{rankData.bidDetails.quantity}</td>
//               <td className="px-4 py-2">{rankData.bidDetails.material_weight}</td>
//               <td className="px-4 py-2 text-blue-900">
//                 {rankData.rank}<br /><span className="text-blue-500 text-xs">{rankData.bidDetails.target_price}</span>
//               </td>
//               <td className="px-4 py-2">{rankData.approved ? "Approved" : "Pending"}</td>
//             </tr>
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default MyRankCompanyOne;
