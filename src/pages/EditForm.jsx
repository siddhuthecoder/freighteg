import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { TfiWidgetized } from "react-icons/tfi";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles
import axios from "axios";

// import { useNavigate } from "react-router-dom";

const EditForm = () => {
  const { id } = useParams();
  console.log(id, "id");
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    role: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://qiktrack.com/api/getEguser/${id}`
        );
        setUserData(response.data);
        console.log(userData, "userdata"); // Set the user data in the state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://qiktrack.com/api/updateEguser/${id}`, userData);
      alert("Data successfully updated");
      navigate("/users");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <>
      <nav className="bg-white-800 h-16 flex items-center justify-between px-4 static top-0 left-40 right-0 z-10 mt-2 shadow-lg rounded-l">
        <div className="flex items-center">
          {/* Menu items */}
          <div className="flex items-center space-x-4">
            <Link
              to="/live"
              className="text-white-600 hover:text-white hover:bg-red-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Live
            </Link>
            <Link
              to="/result"
              className="text-white-600 hover:text-white hover:bg-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Result
            </Link>
            <Link
              to="/history"
              className="text-white-600 hover:text-white hover:bg-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              History
            </Link>
          </div>
        </div>
        {/* Left side */}
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
          {/* Menu items */}

          {/* Create button */}
          <button class="flex items-center bg-blue-900 text-white px-4 py-2 rounded-l-full">
            <span class="flex items-center">Create</span>
            <span class="bg-blue-900 text-white px-2 py-1 ml-2">
              <TfiWidgetized />
            </span>
          </button>
        </div>
      </nav>
      <div className="w-full h-full border-gray-200">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center mt-10"
        >
          <div className="border-2 border-green-200 shadow-lg rounded-lg w-full max-w-lg p-4">
            {/* First Row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-sm mb-1 ">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full bg-gray-300 h-10 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone" className="text-sm mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full bg-gray-300 h-10 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="role" className="text-sm mb-1">
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  value={userData.role}
                  onChange={handleChange}
                  placeholder="Role"
                  className="w-full bg-gray-300 h-10 rounded-md"
                />
              </div>
            </div>
            {/* Second Row */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col">
                <label htmlFor="userId" className="text-sm mb-1">
                  User ID
                </label>
                <input
                  type="text"
                  id="userId"
                  value={userData.id}
                  onChange={handleChange}
                  placeholder="User ID"
                  className="w-full bg-gray-300 h-10 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="text-sm mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={userData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full bg-gray-300 h-10 rounded-md"
                />
              </div>
            </div>
            {/* Create Button */}
            <div className="flex justify-end mt-4">
              <button
                // onClick={() => handleCreateClick()}
                type="submit"
                className="bg-blue-900 text-white py-2 px-6 rounded-lg text-sm"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditForm;
