import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles
import filter from "../assets/filter.png";
import axios from "axios";
const ViewDetails = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchLiveBids = async () => {
      try {
        const response = await axios.get(
          "https://qiktrack.com/api/getLiveBids"
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching live bids:", error);
      }
    };

    fetchLiveBids();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const tableData = [
    {
      sno: 1,
      bidNumber: 123456,
      created: "2024-02-27",
      startDate: "2024-02-28",
      bidTime: "10:00 AM",
      timeRemaining: "1 day",
      fromCity: "City A",
      toCity: "City B",
      vehicleType: "Truck",
      material: "Goods",
      weight: "500 kg",
      response: "Yes",
      assignStaff: "John Doe",
      detailsLink: "/details/123456",
    },
    {
      sno: 2,
      bidNumber: 12345634,
      created: "2024-02-28",
      startDate: "2024-02-18",
      bidTime: "10:00 PM",
      timeRemaining: "2 day",
      fromCity: "City C",
      toCity: "City D",
      vehicleType: "Truck",
      material: "Goods",
      weight: "5000 kg",
      response: "Yes",
      assignStaff: "YAYAY",
      detailsLink: "/details/123456",
    },
    // Add more data as needed
  ];

  return (
    <>
      <nav className="bg-white-800 h-16 flex items-center justify-between px-4 absolute top-0 left-40 right-0 z-10 mt-16 shadow-lg rounded-l">
        {/* Left side */}
        <div className="flex items-center ">
          {/* Search box */}
          <input
            type="text"
            placeholder="Search"
            className="bg-white text-gray-600 px-4 py-2 rounded-full focus:outline-none border border-gray-600"
          />
        </div>
        {/* Right side */}
        <div className="flex items-center">
          {/* Menu items */}
          <div className="flex items-center space-x-4">
            <Link
              to="/live"
              className="text-gray-600 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Live
            </Link>
            <Link
              to="/result"
              className="text-gray-600 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Result
            </Link>
            <Link
              to="/history"
              className="text-gray-600 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              History
            </Link>
          </div>
          {/* Create button */}
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
            Create
          </button>
        </div>
      </nav>
      <div className="w-full h-full border-2 border-red-900">
        <div className="w-full h-10 border-2 border-green-900 mt-16 flex">
          <div className="w-1/2 border-2 h-10 border-black flex space-x-6">
            <span className="text-md ml-2">Live (30)</span>
            <span className="text-green-800 text-md">Responded (20)</span>
            <span className="text-red-800 text-md">Unresponded (30)</span>
          </div>
          <div className="w-1/2 border-2 h-10 border-blue-900 flex space-x-6">
            <span className="text-md ml-32">Bill Created</span>
            <span className=" text-md">Today</span>
            <span className=" text-md">Yesterday</span>
            <div className="relative">
              <span
                className="cursor-pointer"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <span className="bg-blue-500 text-white px-1 py-1 rounded-md mt-1">
                  Calendar
                </span>
              </span>
              {showCalendar && (
                <div className="absolute top-full left-0 z-6 bg-white border border-gray-300">
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
              )}
            </div>
            <span>
              <img src={filter} alt="filter" className="h-6" />
            </span>
          </div>
        </div>
        <div className="bg-blue-900 w-full h-20 mt-2 rounded-lg shadow-lg">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-2 py-2">S.No</th>
                <th className="px-2 py-2">Bid Number</th>
                <th className="px-2 py-2">Created</th>
                <th className="px-2 py-2">Start Date</th>
                <th className="px-2 py-2">Bid Time</th>
                <th className="px-2 py-2">Time Remaining</th>
                <th className="px-2 py-2">From City</th>
                <th className="px-2 py-2">To City</th>
                <th className="px-2 py-2">Vehicle Type</th>
                <th className="px-2 py-2">Material</th>
                <th className="px-2 py-2">Weight</th>
                <th className="px-2 py-2">Response</th>
                <th className="px-2 py-2">Assign Staff</th>
                <th className="px-2 py-2">Details</th>
              </tr>
            </thead>
            <tbody className="mt-10">
              {tableData.map((item, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td className="px-2 py-4">{item.sno}</td>
                    <td className="px-2 py-4">{item.bidNumber}</td>
                    <td className="px-2 py-4">{item.created}</td>
                    <td className="px-2 py-4">{item.startDate}</td>
                    <td className="px-2 py-4">{item.bidTime}</td>
                    <td className="px-2 py-4">{item.timeRemaining}</td>
                    <td className="px-2 py-4">{item.fromCity}</td>
                    <td className="px-2 py-4">{item.toCity}</td>
                    <td className="px-2 py-4">{item.vehicleType}</td>
                    <td className="px-2 py-4">{item.material}</td>
                    <td className="px-2 py-4">{item.weight}</td>
                    <td className="px-2 py-4">{item.response}</td>
                    <td className="px-2 py-4">{item.assignStaff}</td>
                    <td className="px-2 py-4">
                      <Link to={item.detailsLink}>View</Link>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="14" className="border-t"></td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewDetails;
