import React, { useState, useEffect } from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import { FiRefreshCw } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = ({ onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const user = useSelector((state) => state.login.user.user);
  const [selectedOption, setSelectedOption] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch branch data from the API
    const fetchBranchData = async () => {
      try {
        const response = await fetch(`https://freighteg.in/freightapi/getbranches/company/${user.id}`);
        const data = await response.json();
        console.log(data)
        // Map the data to the options array
        const branchOptions = [
          { label: 'ALL', value: 'ALL' }, // Add "ALL" option
          ...data.map(branch => ({
            label: branch.name,
            value: branch._id
          })),
        ];
        setOptions(branchOptions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching branch data:', error);
        setLoading(false);
      }
    };

    fetchBranchData();
  }, [user?.id]);

  useEffect(() => {
    // Set the default selected option based on localStorage
    const storedBranch = localStorage.getItem('branchName') || 'ALL';
    setSelectedOption(storedBranch);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOptionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);

    // Update localStorage based on the selected option
    if (selectedValue === 'ALL') {
      localStorage.removeItem('branch_id'); // Remove branch_id if "ALL" is selected
    } else {
      localStorage.setItem('branch_id', selectedValue);
    }
    // Update branchName in localStorage with the selectedValue (branch ID)
    localStorage.setItem('branchName', selectedValue);

    window.location.reload(); // Reload the page to apply the change
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
    window.location.reload(); // This will reload the entire page
  };

  return (
    <div className="w-full flex min-h-[60px] flex-wrap items-center gap-2 py-2 justify-between bg-white z-[10]">
      <div className="flex items-center mx-2 gap-2">
        <input 
          type="text" 
          placeholder="Search by ID .... " 
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
      <div className="flex items-center mx-2 gap-2">
       
       <Link to="/branch/createBid" ><button 
          className="px-2 py-2 bg-blue-600 h-[45px] text-white rounded-md"
          onClick={handleFormSubmit}
        >
          ADD 
        </button>
        </Link>
        <button 
          className="border border-blue-600 bg-[#dbeafe] min-w-[45px] max-w-[45px] h-[45px] text-blue-600 flex justify-center items-center rounded-md"
          onClick={handleReset}
        >
          <FiRefreshCw />
        </button>
      </div>
    </div>
  );
};

export default Header;
