// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { CiSearch } from "react-icons/ci";
// import { TfiWidgetized } from "react-icons/tfi";
// import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// const EditForm = () => {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [data, setData] = useState([]);
//   const navigate = useNavigate();

//   const [userData, setUserData] = useState({
//     name: "",
//     phone: "",
//     role: "",
//     id: "",
//     password: "",
//   });

//   useEffect(() => {
//     const fetchLiveBids = async () => {
//       try {
//         const response = await axios.get(
//           "https://qiktrack.com/api/getAllEguser"
//         );
//         setData(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error fetching live bids:", error);
//       }
//     };

//     fetchLiveBids();
//   }, []);
//   console.log("pawan", data);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "https://qiktrack.com/api/addEguser",
//         userData
//       );
//       console.log(response.data);
//       alert("Data successfully created.");
//       navigate("/users");
//     } catch (error) {
//       console.error("Error adding user:", error);
//     }
//   };
//   return (
//     <>
//       {/* <nav className="bg-white-800 h-16 flex items-center justify-between px-4 static top-0 left-40 right-0 z-10 mt-2 shadow-lg rounded-l">
//                 <div className="flex items-center">

//                     <div className="flex items-center space-x-4">
//                         <Link
//                             to="/live"
//                             className="text-white-600 hover:text-white hover:bg-red-900 px-3 py-2 rounded-md text-sm font-medium"
//                         >
//                             Live
//                         </Link>
//                         <Link
//                             to="/result"
//                             className="text-white-600 hover:text-white hover:bg-gray-900 px-3 py-2 rounded-md text-sm font-medium"
//                         >
//                             Result
//                         </Link>
//                         <Link
//                             to="/history"
//                             className="text-white-600 hover:text-white hover:bg-gray-900 px-3 py-2 rounded-md text-sm font-medium"
//                         >
//                             History
//                         </Link>

//                     </div>

//                 </div>

//                 <div className="flex items-center ">

//                     <div className="relative mr-2">
//                         <CiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5" />
//                         <input
//                             type="text"
//                             placeholder="Search"
//                             className="pl-10 pr-3 py-1 w-50 bg-white text-gray-600 rounded-3xl focus:outline-none border border-gray-600"
//                         />
//                     </div>
//                 </div>

//                 <div className="flex items-center">

//                     <button class="flex items-center bg-blue-900 text-white px-4 py-2 rounded-l-full">
//                         <span class="flex items-center">
//                             Create
//                         </span>
//                         <span class="bg-blue-900 text-white px-2 py-1 ml-2">
//                             <TfiWidgetized />
//                         </span>
//                     </button>
//                 </div>
//             </nav> */}
//       <div className="w-full h-full border-gray-200">
//         <form
//           onSubmit={handleSubmit}
//           className="flex flex-col items-center mt-10"
//         >
//           <div className="border-2 border-green-200 shadow-lg rounded-lg w-full max-w-lg p-4">
//             <div className="grid grid-cols-3 gap-4">
//               <div className="flex flex-col">
//                 <label htmlFor="name" className="text-sm mb-1">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   value={userData.name}
//                   onChange={(e) =>
//                     setUserData({ ...userData, name: e.target.value })
//                   }
//                   placeholder="Name"
//                   className="w-full bg-gray-300 h-10 rounded-md"
//                 />
//               </div>

//               <div className="flex flex-col">
//                 <label htmlFor="phone" className="text-sm mb-1">
//                   Phone Number
//                 </label>
//                 <input
//                   type="text"
//                   id="phone"
//                   value={userData.phone}
//                   onChange={(e) =>
//                     setUserData({ ...userData, phone: e.target.value })
//                   }
//                   placeholder="Phone Number"
//                   className="w-full bg-gray-300 h-10 rounded-md"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="role" className="text-sm mb-1">
//                   Role
//                 </label>
//                 <input
//                   type="text"
//                   id="role"
//                   value={userData.role}
//                   onChange={(e) =>
//                     setUserData({ ...userData, role: e.target.value })
//                   }
//                   placeholder="Role"
//                   className="w-full bg-gray-300 h-10 rounded-md"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4 mt-4">
//               <div className="flex flex-col">
//                 <label htmlFor="userId" className="text-sm mb-1">
//                   User ID
//                 </label>
//                 <input
//                   type="text"
//                   id="userId"
//                   value={userData.id}
//                   onChange={(e) =>
//                     setUserData({ ...userData, id: e.target.value })
//                   }
//                   placeholder="User ID"
//                   className="w-full bg-gray-300 h-10 rounded-md"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="password" className="text-sm mb-1">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   value={userData.password}
//                   onChange={(e) =>
//                     setUserData({ ...userData, password: e.target.value })
//                   }
//                   placeholder="Password"
//                   className="w-full bg-gray-300 h-10 rounded-md"
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end mt-4">
//               <button
//                 type="submit"
//                 className="bg-blue-900 text-white py-2 px-6 rounded-lg text-sm"
//               >
//                 Create
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default EditForm;
