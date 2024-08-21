import React from 'react'
import { Link } from 'react-router-dom'

const MenuSecondary = () => {
  return (
    <div>
         <nav className="bg-gray-800 h-16 flex items-center justify-between px-4 absolute top-0 left-40 right-0 z-10 mt-16">
        {/* Left side */}
        <div className="flex items-center">
          {/* Search box */}
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-500 text-white px-4 py-2 rounded-full focus:outline-none"
          />
          {/* Live text and result */}
          <div className="ml-4 text-white">
            <span>Live Text</span>
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
              className="text-white hover:bg-gray-500 px-3 py-2 rounded-md text-sm font-medium"
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
    </div>
  )
}

export default MenuSecondary