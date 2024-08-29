import React, { useState ,useEffect} from 'react';
import * as XLSX from 'xlsx';
import Header from './repeats/Header';
import DataTable from './repeats/DataTable';
import Tabs from './repeats/Tabs';
import Navbar from './repeats/Navbar';

const BidLayout = ({bidData}) => {
    const  [dataHandling,setDataHandling] = useState({})
    const [filteredData, setFilteredData] = useState([]);

    
    const handleFormSubmit = (formData) => {
        console.log(formData); 
        setDataHandling(formData)
      };

      useEffect(() => {
        const { searchTerm, selectedOption, startDate, endDate } = dataHandling;
    
        const filtered = bidData.filter(item => {
          const matchesSearchTerm = searchTerm ? item._id.includes(searchTerm) : true;
          const matchesOption = selectedOption ? item.vehicle_type === selectedOption : true;
          const matchesStartDate = startDate ? new Date(item.loading_date) >= new Date(startDate) : true;
          const matchesEndDate = endDate ? new Date(item.loading_date) <= new Date(endDate) : true;
    
          return matchesSearchTerm && matchesOption && matchesStartDate && matchesEndDate;
        });
    
        setFilteredData(filtered);
      }, [dataHandling]);


      const handleDownloadClick = () => {
        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Convert the data to a worksheet
        const worksheet = XLSX.utils.json_to_sheet(filteredData);

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Bids");

        // Generate Excel file and trigger download
        XLSX.writeFile(workbook, "BidsData.xlsx");
    };
    console.log(filteredData)
      
  return (
    <>
      <Navbar />
      <Header onSubmit={handleFormSubmit} />
      <div className="w-full overflow-x-auto">
        <Tabs onDownloadClick={handleDownloadClick}  onFilterClick={() => { /* Handle filter click if needed */ }} />

      </div>
      <div className="w-full flex flex-col overflow-x-auto bg-white ">
        <div className=" bg-[#9D9D9D21] w-[97%] h-[60px] items-center ps-2 mt-2  rounded-md min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
            <div className="font-semibold md:text-lg ps-[30px]">ID</div>
            <div className="font-semibold md:text-lg ps-[30px]">Date</div>
            <div className="font-semibold md:text-lg ps-[30px]">Loading</div>
            <div className="font-semibold md:text-lg ps-[30px]">Unloading</div>
            <div className="font-semibold md:text-lg ps-[30px]">Details</div>
            <div className="font-semibold md:text-lg ps-[30px]">Best Quote</div>
        </div>
        <DataTable datas={filteredData} />
      </div>
      
      
    </>
  )
}

export default BidLayout
