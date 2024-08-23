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
      // const bidData = [
      //   {
      //     "_id": "66c4d23faaf20bee82518bf7",
      //     "company_id": "665580f353ccced94082681b",
      //     "branch_id": "66c066837d7b083d83c1236d",
      //     "loading_city": "Ankleshwar",
      //     "loading_state": "Gujarat",
      //     "loading_address": "Test",
      //     "loading_pincode": 258741,
      //     "unloading_city": "Bilāspur",
      //     "unloading_state": "Haryana",
      //     "unloading_address": "Test",
      //     "unloading_pincode": 211210,
      //     "route_distance": 960,
      //     "vehicle_type": "Truck 20FT/1109",
      //     "vehicle_size": "9MT",
      //     "body_type": "Close Body",
      //     "quantity": 1,
      //     "is_cng": false,
      //     "material_type": "Food",
      //     "material_weight": 9,
      //     "loading_date": "2024-08-22T13:00:00.000Z",
      //     "loading_time": "06:30 PM",
      //     "expiry_date": "2024-08-21T18:00:00.000Z",
      //     "expiry_time": "06:30 PM",
      //     "target_price": 25000,
      //     "bid_remarks": "Na",
      //     "created_by": "669dae7a05b20689c41f417b",
      //     "assigned_to": "669dae7a05b20689c41f417b",
      //     "assigned_transporter": [
      //       "668d168060d1af2a06fa2ab4",
      //       "66927eaf95a6a1720da2f48a",
      //       "669be1276d77579092b9aa96",
      //       "669be1f26d77579092b9b435",
      //       "66a0cdbadb44d79096a21b0a",
      //       "66a0cf70db44d79096a2296f",
      //       "66b70af0e4b9ccf3b27dbea4",
      //       "66b7262be4b9ccf3b27defdc",
      //       "66ba18ace4b9ccf3b2878b79",
      //       "66bc68951d328044d2415986",
      //       "66c1f6627d7b083d83c3bde4"
      //     ],
      //     "responded_by": [
      //       "668d168060d1af2a06fa2ab4"
      //     ],
      //     "isActive": false,
      //     "isDeleted": false,
      //     "createdAt": "2024-08-20T17:28:31.087Z",
      //     "updatedAt": "2024-08-21T16:42:45.633Z",
      //     "bidNo": "200824-00020",
      //     "__v": 0
      //   },
      //   {
      //     "_id": "66c4d23faaf20bee82518bf8",
      //     "company_id": "665580f353ccced94082681c",
      //     "branch_id": "66c066837d7b083d83c1236e",
      //     "loading_city": "Ahmedabad",
      //     "loading_state": "Gujarat",
      //     "loading_address": "Main Street",
      //     "loading_pincode": 382345,
      //     "unloading_city": "Surat",
      //     "unloading_state": "Gujarat",
      //     "unloading_address": "Market Road",
      //     "unloading_pincode": 394107,
      //     "route_distance": 270,
      //     "vehicle_type": "Truck 22FT/1613",
      //     "vehicle_size": "10MT",
      //     "body_type": "Open Body",
      //     "quantity": 2,
      //     "is_cng": true,
      //     "material_type": "Electronics",
      //     "material_weight": 8,
      //     "loading_date": "2024-08-23T10:00:00.000Z",
      //     "loading_time": "10:30 AM",
      //     "expiry_date": "2024-08-22T18:00:00.000Z",
      //     "expiry_time": "06:00 PM",
      //     "target_price": 15000,
      //     "bid_remarks": "Urgent",
      //     "created_by": "669dae7a05b20689c41f417c",
      //     "assigned_to": "669dae7a05b20689c41f417c",
      //     "assigned_transporter": [
      //       "668d168060d1af2a06fa2ab5",
      //       "66927eaf95a6a1720da2f48b",
      //       "669be1276d77579092b9aa97",
      //       "669be1f26d77579092b9b436",
      //       "66a0cdbadb44d79096a21b0b"
      //     ],
      //     "responded_by": [
      //       "668d168060d1af2a06fa2ab5"
      //     ],
      //     "isActive": true,
      //     "isDeleted": false,
      //     "createdAt": "2024-08-21T12:15:45.000Z",
      //     "updatedAt": "2024-08-22T16:42:45.633Z",
      //     "bidNo": "200824-00021",
      //     "__v": 0
      //   },
      //   {
      //     "_id": "66c4d23faaf20bee82518bf9",
      //     "company_id": "665580f353ccced94082681d",
      //     "branch_id": "66c066837d7b083d83c1236f",
      //     "loading_city": "Vadodara",
      //     "loading_state": "Gujarat",
      //     "loading_address": "GIDC Area",
      //     "loading_pincode": 390010,
      //     "unloading_city": "Rajkot",
      //     "unloading_state": "Gujarat",
      //     "unloading_address": "Industrial Estate",
      //     "unloading_pincode": 360002,
      //     "route_distance": 350,
      //     "vehicle_type": "Truck 14FT/407",
      //     "vehicle_size": "7MT",
      //     "body_type": "Close Body",
      //     "quantity": 1,
      //     "is_cng": false,
      //     "material_type": "Textiles",
      //     "material_weight": 5,
      //     "loading_date": "2024-08-24T08:00:00.000Z",
      //     "loading_time": "08:30 AM",
      //     "expiry_date": "2024-08-23T14:00:00.000Z",
      //     "expiry_time": "02:00 PM",
      //     "target_price": 18000,
      //     "bid_remarks": "Standard Delivery",
      //     "created_by": "669dae7a05b20689c41f417d",
      //     "assigned_to": "669dae7a05b20689c41f417d",
      //     "assigned_transporter": [
      //       "668d168060d1af2a06fa2ab6",
      //       "66927eaf95a6a1720da2f48c",
      //       "669be1276d77579092b9aa98"
      //     ],
      //     "responded_by": [
      //       "668d168060d1af2a06fa2ab6"
      //     ],
      //     "isActive": true,
      //     "isDeleted": false,
      //     "createdAt": "2024-08-22T11:28:31.087Z",
      //     "updatedAt": "2024-08-23T16:42:45.633Z",
      //     "bidNo": "200824-00022",
      //     "__v": 0
      //   },
      //   {
      //     "_id": "66c4d23faaf20bee82518bfa",
      //     "company_id": "665580f353ccced94082681e",
      //     "branch_id": "66c066837d7b083d83c12370",
      //     "loading_city": "Pune",
      //     "loading_state": "Maharashtra",
      //     "loading_address": "Bhosari MIDC",
      //     "loading_pincode": 411026,
      //     "unloading_city": "Mumbai",
      //     "unloading_state": "Maharashtra",
      //     "unloading_address": "Andheri East",
      //     "unloading_pincode": 400069,
      //     "route_distance": 150,
      //     "vehicle_type": "Container 32FT",
      //     "vehicle_size": "12MT",
      //     "body_type": "Close Body",
      //     "quantity": 3,
      //     "is_cng": true,
      //     "material_type": "Automobiles",
      //     "material_weight": 12,
      //     "loading_date": "2024-08-25T14:00:00.000Z",
      //     "loading_time": "02:30 PM",
      //     "expiry_date": "2024-08-24T18:00:00.000Z",
      //     "expiry_time": "06:00 PM",
      //     "target_price": 22000,
      //     "bid_remarks": "Express Delivery",
      //     "created_by": "669dae7a05b20689c41f417e",
      //     "assigned_to": "669dae7a05b20689c41f417e",
      //     "assigned_transporter": [
      //       "668d168060d1af2a06fa2ab7",
      //       "66927eaf95a6a1720da2f48d"
      //     ],
      //     "responded_by": [
      //       "668d168060d1af2a06fa2ab7"
      //     ],
      //     "isActive": true,
      //     "isDeleted": false,
      //     "createdAt": "2024-08-23T13:28:31.087Z",
      //     "updatedAt": "2024-08-24T16:42:45.633Z",
      //     "bidNo": "200824-00023",
      //     "__v": 0
      //   },
      //   {
      //     "_id": "66c4d23faaf20bee82518bfb",
      //     "company_id": "665580f353ccced94082681f",
      //     "branch_id": "66c066837d7b083d83c12371",
      //     "loading_city": "Bangalore",
      //     "loading_state": "Karnataka",
      //     "loading_address": "Electronic City",
      //     "loading_pincode": 560100,
      //     "unloading_city": "Mysore",
      //     "unloading_state": "Karnataka",
      //     "unloading_address": "Hebbal Industrial Area",
      //     "unloading_pincode": 570016,
      //     "route_distance": 140,
      //     "vehicle_type": "Truck 22FT/1613",
      //     "vehicle_size": "10MT",
      //     "body_type": "Open Body",
      //     "quantity": 2,
      //     "is_cng": false,
      //     "material_type": "Furniture",
      //     "material_weight": 7,
      //     "loading_date": "2024-08-26T16:00:00.000Z",
      //     "loading_time": "04:30 PM",
      //     "expiry_date": "2024-08-25T18:00:00.000Z",
      //     "expiry_time": "06:00 PM",
      //     "target_price": 20000,
      //     "bid_remarks": "Handle with Care",
      //     "created_by": "669dae7a05b20689c41f417f",
      //     "assigned_to": "669dae7a05b20689c41f417f",
      //     "assigned_transporter": [
      //       "668d168060d1af2a06fa2ab8",
      //       "66927eaf95a6a1720da2f48e"
      //     ],
      //     "responded_by": [
      //       "668d168060d1af2a06fa2ab8"
      //     ],
      //     "isActive": false,
      //     "isDeleted": false,
      //     "createdAt": "2024-08-24T14:28:31.087Z",
      //     "updatedAt": "2024-08-25T16:42:45.633Z",
      //     "bidNo": "200824-00024",
      //     "__v": 0
      //   },
      //   {
      //     "_id": "66c4d23faaf20bee82518bfc",
      //     "company_id": "665580f353ccced940826820",
      //     "branch_id": "66c066837d7b083d83c12372",
      //     "loading_city": "Hyderabad",
      //     "loading_state": "Telangana",
      //     "loading_address": "Hitech City",
      //     "loading_pincode": 500081,
      //     "unloading_city": "Vijayawada",
      //     "unloading_state": "Andhra Pradesh",
      //     "unloading_address": "Benz Circle",
      //     "unloading_pincode": 520010,
      //     "route_distance": 270,  
      //     "vehicle_type": "Truck 24FT/1613",
      //     "vehicle_size": "12MT",
      //     "body_type": "Close Body",
      //     "quantity": 1,
      //     "is_cng": false,
      //     "material_type": "Chemicals",
      //     "material_weight": 11,
      //     "loading_date": "2024-08-27T08:00:00.000Z",
      //     "loading_time": "08:30 AM",
      //     "expiry_date": "2024-08-26T18:00:00.000Z",
      //     "expiry_time": "06:00 PM",
      //     "target_price": 30000,
      //     "bid_remarks": "Hazardous",
      //     "created_by": "669dae7a05b20689c41f4180",
      //     "assigned_to": "669dae7a05b20689c41f4180",
      //     "assigned_transporter": [
      //       "668d168060d1af2a06fa2ab9",
      //       "66927eaf95a6a1720da2f48f"
      //     ],
      //     "responded_by": [
      //       "668d168060d1af2a06fa2ab9"
      //     ],
      //     "isActive": true,
      //     "isDeleted": false,
      //     "createdAt": "2024-08-25T10:28:31.087Z",
      //     "updatedAt": "2024-08-26T16:42:45.633Z",
      //     "bidNo": "200824-00025",
      //     "__v": 0
      //   },
      //   {
      //     "_id": "66c4d23faaf20bee82518bfd",
      //     "company_id": "665580f353ccced940826821",
      //     "branch_id": "66c066837d7b083d83c12373",
      //     "loading_city": "Chennai",
      //     "loading_state": "Tamil Nadu",
      //     "loading_address": "Guindy Industrial Estate",
      //     "loading_pincode": 600032,
      //     "unloading_city": "Coimbatore",
      //     "unloading_state": "Tamil Nadu",
      //     "unloading_address": "Peelamedu",
      //     "unloading_pincode": 641004,
      //     "route_distance": 510,
      //     "vehicle_type": "Truck 22FT/1613",
      //     "vehicle_size": "10MT",
      //     "body_type": "Open Body",
      //     "quantity": 2,
      //     "is_cng": true,
      //     "material_type": "Construction Materials",
      //     "material_weight": 9,
      //     "loading_date": "2024-08-28T10:00:00.000Z",
      //     "loading_time": "10:30 AM",
      //     "expiry_date": "2024-08-27T18:00:00.000Z",
      //     "expiry_time": "06:00 PM",
      //     "target_price": 25000,
      //     "bid_remarks": "Urgent",
      //     "created_by": "669dae7a05b20689c41f4181",
      //     "assigned_to": "669dae7a05b20689c41f4181",
      //     "assigned_transporter": [
      //       "668d168060d1af2a06fa2aba",
      //       "66927eaf95a6a1720da2f490"
      //     ],
      //     "responded_by": [
      //       "668d168060d1af2a06fa2aba"
      //     ],
      //     "isActive": true,
      //     "isDeleted": false,
      //     "createdAt": "2024-08-26T12:28:31.087Z",
      //     "updatedAt": "2024-08-27T16:42:45.633Z",
      //     "bidNo": "200824-00026",
      //     "__v": 0
      //   },
      //   {
      //     "_id": "66c4d23faaf20bee82518bfe",
      //     "company_id": "665580f353ccced940826822",
      //     "branch_id": "66c066837d7b083d83c12374",
      //     "loading_city": "Kolkata",
      //     "loading_state": "West Bengal",
      //     "loading_address": "Salt Lake City",
      //     "loading_pincode": 700064,
      //     "unloading_city": "Durgapur",
      //     "unloading_state": "West Bengal",
      //     "unloading_address": "Industrial Area",
      //     "unloading_pincode": 713203,
      //     "route_distance": 160,
      //     "vehicle_type": "Truck 14FT/407",
      //     "vehicle_size": "7MT",
      //     "body_type": "Close Body",
      //     "quantity": 1,
      //     "is_cng": false,
      //     "material_type": "Pharmaceuticals",
      //     "material_weight": 6,
      //     "loading_date": "2024-08-29T14:00:00.000Z",
      //     "loading_time": "02:30 PM",
      //     "expiry_date": "2024-08-28T18:00:00.000Z",
      //     "expiry_time": "06:00 PM",
      //     "target_price": 20000,
      //     "bid_remarks": "Temperature Controlled",
      //     "created_by": "669dae7a05b20689c41f4182",
      //     "assigned_to": "669dae7a05b20689c41f4182",
      //     "assigned_transporter": [
      //       "668d168060d1af2a06fa2abb",
      //       "66927eaf95a6a1720da2f491"
      //     ],
      //     "responded_by": [
      //       "668d168060d1af2a06fa2abb"
      //     ],
      //     "isActive": true,
      //     "isDeleted": false,
      //     "createdAt": "2024-08-27T14:28:31.087Z",
      //     "updatedAt": "2024-08-28T16:42:45.633Z",
      //     "bidNo": "200824-00027",
      //     "__v": 0
      //   },
      //   {
      //     "_id": "66c4d23faaf20bee82518bff",
      //     "company_id": "665580f353ccced940826823",
      //     "branch_id": "66c066837d7b083d83c12375",
      //     "loading_city": "Surat",
      //     "loading_state": "Gujarat",
      //     "loading_address": "Udhna",
      //     "loading_pincode": 394210,
      //     "unloading_city": "Navsari",
      //     "unloading_state": "Gujarat",
      //     "unloading_address": "GIDC",
      //     "unloading_pincode": 396424,
      //     "route_distance": 40,
      //     "vehicle_type": "Truck 12FT/407",
      //     "vehicle_size": "6MT",
      //     "body_type": "Open Body",
      //     "quantity": 1,
      //     "is_cng": false,
      //     "material_type": "Garments",
      //     "material_weight": 5,
      //     "loading_date": "2024-08-30T08:00:00.000Z",
      //     "loading_time": "08:30 AM",
      //     "expiry_date": "2024-08-29T18:00:00.000Z",
      //     "expiry_time": "06:00 PM",
      //     "target_price": 10000,
      //     "bid_remarks": "Fragile",
      //     "created_by": "669dae7a05b20689c41f4183",
      //     "assigned_to": "669dae7a05b20689c41f4183",
      //     "assigned_transporter": [
      //       "668d168060d1af2a06fa2abc",
      //       "66927eaf95a6a1720da2f492"
      //     ],
      //     "responded_by": [
      //       "668d168060d1af2a06fa2abc"
      //     ],
      //     "isActive": true,
      //     "isDeleted": false,
      //     "createdAt": "2024-08-28T14:28:31.087Z",
      //     "updatedAt": "2024-08-29T16:42:45.633Z",
      //     "bidNo": "200824-00028",
      //     "__v": 0
      //   },
      //   {
      //     "_id": "66c4d23faaf20bee82518c00",
      //     "company_id": "665580f353ccced940826824",
      //     "branch_id": "66c066837d7b083d83c12376",
      //     "loading_city": "Pune",
      //     "loading_state": "Maharashtra",
      //     "loading_address": "Hinjawadi",
      //     "loading_pincode": 411057,
      //     "unloading_city": "Mumbai",
      //     "unloading_state": "Maharashtra",
      //     "unloading_address": "Andheri East",
      //     "unloading_pincode": 400069,
      //     "route_distance": 120,
      //     "vehicle_type": "Truck 16FT/709",
      //     "vehicle_size": "8MT",
      //     "body_type": "Close Body",
      //     "quantity": 2,
      //     "is_cng": true,
      //     "material_type": "Electronics",
      //     "material_weight": 10,
      //     "loading_date": "2024-08-31T08:00:00.000Z",
      //     "loading_time": "08:30 AM",
      //     "expiry_date": "2024-08-30T18:00:00.000Z",
      //     "expiry_time": "06:00 PM",
      //     "target_price": 15000,
      //     "bid_remarks": "Handle with Care",
      //     "created_by": "669dae7a05b20689c41f4184",
      //     "assigned_to": "669dae7a05b20689c41f4184",
      //     "assigned_transporter": [
      //       "668d168060d1af2a06fa2abd",
      //       "66927eaf95a6a1720da2f493"
      //     ],
      //     "responded_by": [
      //       "668d168060d1af2a06fa2abd"
      //     ],
      //     "isActive": true,
      //     "isDeleted": false,
      //     "createdAt": "2024-08-29T14:28:31.087Z",
      //     "updatedAt": "2024-08-30T16:42:45.633Z",
      //     "bidNo": "200824-00029",
      //     "__v": 0
      //   },
      //   {
      //     "_id": "66c4d23faaf20bee82518c01",
      //     "company_id": "665580f353ccced940826825",
      //     "branch_id": "66c066837d7b083d83c12377",
      //     "loading_city": "Jaipur",
      //     "loading_state": "Rajasthan",
      //     "loading_address": "Sitapura Industrial Area",
      //     "loading_pincode": 302022,
      //     "unloading_city": "Udaipur",
      //     "unloading_state": "Rajasthan",
      //     "unloading_address": "Sukher",
      //     "unloading_pincode": 313001,
      //     "route_distance": 400,
      //     "vehicle_type": "Truck 22FT/1613",
      //     "vehicle_size": "10MT",
      //     "body_type": "Open Body",
      //     "quantity": 1,
      //     "is_cng": false,
      //     "material_type": "Marble",
      //     "material_weight": 12,
      //     "loading_date": "2024-09-01T08:00:00.000Z",
      //     "loading_time": "08:30 AM",
      //     "expiry_date": "2024-08-31T18:00:00.000Z",
      //     "expiry_time": "06:00 PM",
      //     "target_price": 18000,
      //     "bid_remarks": "Heavy Load",
      //     "created_by": "669dae7a05b20689c41f4185",
      //     "assigned_to": "669dae7a05b20689c41f4185",
      //     "assigned_transporter": [
      //       "668d168060d1af2a06fa2abe",
      //       "66927eaf95a6a1720da2f494"
      //     ],
      //     "responded_by": [
      //       "668d168060d1af2a06fa2abe"
      //     ],
      //     "isActive": true,
      //     "isDeleted": false,
      //     "createdAt": "2024-08-30T14:28:31.087Z",
      //     "updatedAt": "2024-08-31T16:42:45.633Z",
      //     "bidNo": "200824-00030",
      //     "__v": 0
      //   }
      // ]
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
    
      
  return (
    <>
      <Navbar />
      <Header onSubmit={handleFormSubmit} />
      <div className="w-full overflow-x-auto">
        <Tabs onDownloadClick={handleDownloadClick}  onFilterClick={() => { /* Handle filter click if needed */ }} />

      </div>
      <div className="w-full flex flex-col overflow-x-auto">
        <div className=" bg-[#9D9D9D21] w-[97%] h-[60px] items-center ps-2 mt-2  rounded-md min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
            <div className="font-semibold md:text-lg">ID</div>
            <div className="font-semibold md:text-lg">Date</div>
            <div className="font-semibold md:text-lg">Loading</div>
            <div className="font-semibold md:text-lg">Unloading</div>
            <div className="font-semibold md:text-lg">Details</div>
            <div className="font-semibold md:text-lg">Best Quote</div>
        </div>
        <DataTable datas={filteredData} />
      </div>
      
      
    </>
  )
}

export default BidLayout
