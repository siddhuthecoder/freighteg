import React from "react";
import { Link } from "react-router-dom";

const Live = () => {
  const tableData = [
    {
      sNo: 1,
      bidNumber: "BID123",
      created: "01/01/2023",
      startDate: "01/02/2023",
      bidTime: "10:00 AM",
      timeRemaining: "2 hours",
      fromCity: "City A",
      toCity: "City B",
      vehicleType: "Truck",
      material: "Material X",
      weight: "1000 kg",
      response: "Yes",
      assignStaff: "John Doe",
    },
    // Add more data objects as needed
  ];
  return (
    <div
      className="top-0 z-10 left-40 right-0"
      style={{ height: "100vh", width: "100%", border: "2px solid red" }}
    >
      <div>
        <nav className="bg-gray-800 h-16 flex items-center justify-between px-4 absolute top-0 left-20 right-0 z-10 mt-16">
          {/* Left side */}
          <div className="flex items-center">
            {/* Search box */}
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-700 text-white px-4 py-2 rounded-full focus:outline-none"
            />
            {/* Live text and result */}
            <div className="ml-4 text-white">
              <span>
                <Link to="/live">Live</Link>
              </span>
              <span className="mx-2">|</span>
              <span>Result</span>
              <span className="mx-2">|</span>
              <span>History</span>
            </div>
          </div>
          {/* Right side */}
          <div className="flex items-center">
            {/* Menu items */}
            <div className="flex items-center space-x-4">
              <Link
                to="/menu1"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Menu 1
              </Link>
              <Link
                to="/menu2"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Menu 2
              </Link>
              <Link
                to="/menu3"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Menu 3
              </Link>
            </div>
            {/* Create button */}
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
              Create
            </button>
          </div>
        </nav>

        {/* Live menu */}

        <div className="flex border border-yellow-500 mt-16">
          {" "}
          {/* Adjusted positioning */}
          <div className="w-1/2 h-10 border border-white-500 flex p-2 ml-2 space-x-2">
            <span className="text-black">Live(30)</span>
            <span className="text-green-600">Responded (30)</span>
            <span className="text-red-500">Responded (30)</span>
          </div>
          <div className="w-1/2 h-16 border border-black-500 flex items-center space-x-2 ">
            {/* First menu group */}
            <div className="flex items-center ">
              <span>Bid</span>
              <span>Created</span>
            </div>

            {/* Second menu group */}
            <div className="flex items-center ">
              <span>Today</span>
              <span>Yesterday</span>
            </div>

            {/* Calendar dropdown */}
            <div className="relative">
              <button className="bg-gray-200 text-black px-2 py-2 rounded-full focus:outline-none">
                Calendar
              </button>
              {/* Dropdown content */}
              <div className="absolute top-full left-0 bg-white border rounded mt-1 hidden">
                {/* Dropdown content here */}
                Calendar
              </div>
            </div>

            {/* Filter Icon */}
            <button>Filter</button>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="mt-2 p-4">
        <table className="table-auto w-['85%'] overflow-hidden">
          <thead>
            <tr className="h-10 w-full bg-blue-900">
              <th className="px-2 py-2">S.No</th>
              <th className="px-4 py-2">Bid Number</th>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">Bid Time</th>
              <th className="px-4 py-2">Time Remaining</th>
              <th className="px-4 py-2">From City</th>
              <th className="px-4 py-2">To City</th>
              <th className="px-4 py-2">Vehicle Type</th>
              <th className="px-4 py-2">Material</th>
              <th className="px-4 py-2">Weight</th>
              <th className="px-4 py-2">Response</th>
              <th className="px-4 py-2">Assign Staff</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index} className="bg-gray-100">
                <td className="border px-2 py-2">{item.sNo}</td>
                <td className="border px-4 py-2">{item.bidNumber}</td>
                <td className="border px-4 py-2">{item.created}</td>
                <td className="border px-4 py-2">{item.startDate}</td>
                <td className="border px-4 py-2">{item.bidTime}</td>
                <td className="border px-4 py-2">{item.timeRemaining}</td>
                <td className="border px-4 py-2">{item.fromCity}</td>
                <td className="border px-4 py-2">{item.toCity}</td>
                <td className="border px-4 py-2">{item.vehicleType}</td>
                <td className="border px-4 py-2">{item.material}</td>
                <td className="border px-4 py-2">{item.weight}</td>
                <td className="border px-4 py-2">{item.response}</td>
                <td className="border px-4 py-2">{item.assignStaff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Live;
