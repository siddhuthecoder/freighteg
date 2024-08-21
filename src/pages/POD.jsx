import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import "react-datepicker/dist/react-datepicker.css";
import filter from "../assets/filter.png";
import plus from "../assets/blue.png";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const POD = () => {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    role: "",
    id: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLiveBids = async () => {
      try {
        const response = await axios.get(
          "https://qiktrack.com/api/getAllEguser"
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching live bids:", error);
      }
    };

    fetchLiveBids();
  }, []);

  console.log("pawan", data);

  const handleNavigate = () => {
    navigate("/podform");
  };

  const handleEdit = (item) => {
    console.log("Edit item:", item);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://qiktrack.com/api/deleteEguser/${id}`
      );
      console.log("Delete response:", response.data);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <nav className="bg-white-800 h-16 flex items-center justify-between px-4 static top-0 left-40 right-0 z-10 mt-3 shadow-lg rounded-l">
        {/* Left side */}
        <div className="flex space-x-5">
          <div className="text-blue-400 px-3 ">
            <p className="mb-5 ">All POD Request</p>
          </div>
          <div className="text-black-100 px-3 mt-3">Downloaded POD</div>
        </div>
        <div className="flex items-center ">
          {/* Search box */}
          <div className="relative mr-2">
            <CiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-3 py-1 w-50 bg-white text-gray-600 rounded-3xl focus:outline-none border border-gray-600"
            />
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center">
          {/* Create button */}
          <button
            onClick={() => handleNavigate()}
            className="bg-blue-900 border-2 border-white-900 text-white px-4  rounded-3xl flex"
          >
            <p className="text-white-900 mb-3">Request POD </p>
            <img src={plus} alt="plus" className="h-6 w-6 ml-2 bg-white mt-3" />
          </button>
          <span className="ml-auto mr-4">
            <img src={filter} alt="filter" className="h-6" />
          </span>
        </div>
      </nav>
      <div className="w-full h-full border-2 border-gray-200 mt-8">
        <div className="bg-blue-900 w-full h-20 mt-2 rounded-lg shadow-lg">
          <table className="table-auto w-full overflow-hidden">
            <thead>
              <tr className="h-10 w-full bg-blue-900 ">
                <th className="px-4 py-2 text-white">S.No</th>
                <th className="px-4 py-2 text-white">Name</th>
                <th className="px-4 py-2 text-white">Phone Number</th>
                <th className="px-4 py-2 text-white">Role</th>
                <th className="px-4 py-2 text-white">User ID</th>
                <th className="px-4 py-2 text-white">Password</th>
                <th className="px-4 py-2 text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="bg-gray-100">
                  <td className=" px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.phone}</td>
                  <td className="px-4 py-2">{item.role}</td>
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.password}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleEdit(item)}
                        className="ml-2 text-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="ml-2 text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default POD;
