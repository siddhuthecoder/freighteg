import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import PodTable from "./PodTable";
import PodAddForm from "../PodAddForm";

const AllPodRequest = () => {
  const [showPodAddForm, setShowPodAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  return (
    <>
<nav
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        }}
        className="bg-gray-100 h-[8vh] flex items-center justify-between px-4 static top-0 left-0 right-0 z-10"
      >
        <div className="flex items-center space-x-4">
          <button
            className="md:hidden flex items-center p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <Link
            to="/"
            className="text-xl font-semibold text-blue-600"
          >
            Brand
          </Link>
        </div>

        <ul className={`flex gap-8 md:flex ${isMobileMenuOpen ? 'block' : 'hidden'} md:flex`}>
          <li>
            <Link
              to="/allpodrequest"
              className={`${
                location.pathname === "/allpodrequest"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              } px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out`}
            >
              Live POD
            </Link>
          </li>
          <li>
            <Link
              to="/podform"
              className={`${
                location.pathname === "/podform"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              } px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out`}
            >
              History POD
            </Link>
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <FiSearch
              className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
              aria-label="Search Icon"
            />
            <input
              type="text"
              placeholder="Search users"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150 ease-in-out"
              aria-label="Search Users"
            />
          </div>
          <button
            onClick={() => setShowPodAddForm(true)}
            className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-full hover:bg-blue-700 transition duration-150 ease-in-out"
            aria-label="Request POD"
          >
            <FaUserPlus className="mr-2" />
            <span>Request POD</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-100 border-t border-gray-300">
          <ul>
            <li>
              <Link
                to="/allpodrequest"
                className={`${
                  location.pathname === "/allpodrequest"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                } block px-4 py-2 text-sm font-medium transition duration-150 ease-in-out`}
              >
                Live POD
              </Link>
            </li>
            <li>
              <Link
                to="/podform"
                className={`${
                  location.pathname === "/podform"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                } block px-4 py-2 text-sm font-medium transition duration-150 ease-in-out`}
              >
                History POD
              </Link>
            </li>
          </ul>
        </div>
      )}

      {showPodAddForm && (
        <PodAddForm onClose={() => setShowPodAddForm(false)} />
      )}

      <div className="bg-gray-100 h-[85%]">
        <PodTable />
      </div>
    </>
  );
};

export default AllPodRequest;
