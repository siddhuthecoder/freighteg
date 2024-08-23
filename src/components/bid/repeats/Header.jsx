import React, { useState } from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import { FiRefreshCw } from "react-icons/fi";

const Header = ({ onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleFormSubmit = () => {
    const formData = {
      searchTerm,
      selectedOption,
      startDate,
      endDate,
    };
    onSubmit(formData);
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedOption('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <>
      <div className="w-full flex min-h-[60px] flex-wrap items-center gap-2 py-2 justify-between bg-white   z-[10]">
        <div className="flex items-center mx-2 gap-2">
          <input 
            type="text" 
            placeholder='Search by ID .... ' 
            value={searchTerm}
            onChange={handleSearchChange}
            className="border focus:border-blue-600 h-[45px] rounded-md ps-2" 
          />
          <button 
            className="rounded-md h-[45px] px-3 text-white font-semibold bg-blue-600"
            onClick={handleFormSubmit}
          >
            Search
          </button>
        </div>
        <div className="  flex items-center mx-2 gap-2">
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className="block focus:text-blue-600 h-[45px] w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {/* <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="block w-full bg-white border h-[45px] border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <FaArrowRightLong className="text-4xl"/>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="block w-full bg-white border h-[45px] border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          /> */}
          <button 
            className="px-2 py-2 bg-blue-600 h-[45px] text-white rounded-md"
            onClick={handleFormSubmit}
          >
            GO
          </button>
          <button 
            className="border border-blue-600 bg-[#dbeafe] min-w-[45px] max-w-[45px] h-[45px] text-blue-600 flex justify-center items-center rounded-md"
            onClick={handleReset}
          >
            <FiRefreshCw />
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
