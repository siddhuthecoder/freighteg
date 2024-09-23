import React, { useState } from 'react';
import { format, toZonedTime } from 'date-fns-tz';
import AssignedVendorsModal from '../repeats/AssignedVendorsModal';
import ViewQuotesModal from '../repeats/ViewQuotesModal';
import { IoMdMail } from "react-icons/io";
import { MdLocalPrintshop } from "react-icons/md";
import { useSelector } from 'react-redux';

const QuotesModal = ({ showModal, setShowModal, counterdata }) => {
    if (!showModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6 relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowModal(false)}
                >
                    X
                </button>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Counter Info</h2>
                <div className="max-h-60 overflow-y-auto space-y-4">
                    <div className="flex justify-between items-center p-4 border rounded-md">
                        <span className="text-gray-800 font-medium">
                            Target Price :  {counterdata.target_price}
                        </span>
                        <span className="text-gray-800">
                            Counter Price : {counterdata.counters["counter_price"]}
                        </span>
                        <div className="space-x-2">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">
                                Call Vendor
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md text-sm ${
                                    counterdata.counters["accepted"]
                                    ? "bg-green-500 text-white"
                                    : "bg-orange-500 text-white"
                                }`}
                            >
                                {counterdata.counters["accepted"] ? "Accepted" : "Pending"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CounterTable = ({ datas }) => {
    const [isAssignedVendorsModalOpen, setAssignedVendorsModalOpen] = useState(false);
    const [isViewQuotesModalOpen, setViewQuotesModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    // const [showModal, setShowModal] = useState(false);
    const user = useSelector((state) => state.login.user);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [showModal, setShowModal] = useState(false);
    const [counterdata, setcounterdata] = useState(null);

    const handleCounterInfoClick = (data) => {
      setcounterdata(data);
      setShowModal(true);
    };

    const convertToTimeDifference = (updatedAt) => {
        const now = new Date();
        const updatedDate = new Date(updatedAt);
        const diffInMs = now - updatedDate;
        const diffInMinutes = Math.floor(diffInMs / 60000);
        const days = Math.floor(diffInMinutes / (24 * 60));
        const hours = Math.floor((diffInMinutes % (24 * 60)) / 60);
        const minutes = diffInMinutes % 60;
        return `${days}d ${hours}hr ${minutes}min`;
    };

    const formatTo12HourTime = (utcDate) => {
        const timeZone = "Asia/Kolkata";
        const zonedDate = toZonedTime(new Date(utcDate), timeZone);
        return format(zonedDate, "hh:mm a", { timeZone });
    };

    const handlePrintClick = (data) => {
        // Process and format only the required data
        const formattedData = {
            bidNo: data.bidNo,
            name: user?.name,
            remarks: data.bid_remarks,
            loadingDate: data.loading_date.slice(0, 10), // YYYY-MM-DD
            loadingTime: formatTo12HourTime(data.loading_date), // hh:mm a
            loadingLocation: `${data.loading_city} (${data.loading_state})`,
            loadingAddress: `${data.loading_address} (${data.loading_pincode})`,
            unloadingLocation: `${data.unloading_city} (${data.unloading_state})`,
            unloadingAddress: `${data.unloading_address} (${data.unloading_pincode})`,
            vehicleDetails: {
                quantity: data.quantity,
                type: data.vehicle_type,
                size: data.vehicle_size,
                bodyType: data.body_type,
            },
            materialDetails: {
                type: data.material_type,
                weight: `${data.material_weight} Mt`,
            },
            distance: `${data.route_distance} Km`,
            // minimumPrice: getMinimumVendorPrice(data) || 0,
            targetPrice: `${data.target_price} Rs`,
            assignedStaff: `${data.assignedToUser?.name}, +91${data.assignedToUser?.phone}`,
            createdBy: `${data.createdByUser?.name}`,
            createdAt: `${data.createdAt.slice(0, 10)}, ${formatTo12HourTime(data.createdAt)}`,
        };
    
        // Convert formatted data to JSON string
        const dataStr = JSON.stringify(formattedData, null, 2);
        
        // Create a blob and download it
        const blob = new Blob([dataStr], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `data-${data.bidNo}.txt`; // Saving the file as JSON
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleAssignedVendorsClick = (data) => {
        setSelectedData(data);
        setAssignedVendorsModalOpen(true);
    };

    const handleViewQuotesClick = (data) => {
        setSelectedData(data);
        setViewQuotesModalOpen(true);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = datas.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(datas.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (!datas || datas.length === 0) {
        return <div className="text-center text-gray-500 py-4">No data available</div>;
    }

    return (
        <>
            {currentItems.map((data) => (
                <div
                    key={data.bidNo}
                    className="bg-blue-50 rounded-b-lg p-4 mt-3 relative mx-auto flex flex-col w-[97%] shadow-md rounded-md min-w-[1200px]"
                >
                    <div className="w-[100%] text-sm mt-2 min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
                        <div className="flex flex-col pt-1">
                            <span className="block text-black font-semibold">{user?.name}</span>
                            <span className="block text-blue-600 font-semibold">#{data.bidNo}</span>
                            <span className="block text-red-600">{convertToTimeDifference(data.updatedAt)}</span>
                            <div className="block text-grey-500 mt-12">Remarks</div>
                        </div>
                        <div className="flex flex-col pt-1">
                            <span className="block font-medium ml-6">{data.loading_date.slice(0, 10)}</span>
                            <span className="block ml-6">{formatTo12HourTime(data.loading_date)}</span>
                        </div>
                        <div className="flex flex-col pt-1">
                            <span className="block font-medium ml-4">
                                {data.loading_city} ({data.loading_state})
                            </span>
                            <span className="block text-xs text-gray-500 ml-4">
                            {data.loading_address}   ( {data.loading_pincode})
                            </span>
                        </div>
                        <div className="flex flex-col pt-1">
                            <span className="block font-medium">
                                {data.unloading_city} ({data.unloading_state})
                            </span>
                            <span className="block text-xs text-gray-500">
                            {data.unloading_address} ({data.unloading_pincode}) 
                            </span>
                        </div>
                        <div className="flex flex-col pt-1">
                            
                            <span className="block">Vehicle Quantity - {data.quantity}</span>
                            <span className="block">
                               Vehicle Type-  {data.vehicle_type} 
                            </span>
                            <span className="block">
                               Vehicle Size-  {data.vehicle_size} ({data.body_type})
                            </span>
                            <span className="block">
                                Material type-  {data.material_type} ({data.material_weight}Mt)
                                </span>
                            {/* <span className="block">Equipments</span> */}
                            <a href="#" className="text-blue-600">
                                Distance - {data.route_distance} Km
                            </a>
                        </div>
                        
                        <div className="flex flex-col pt-1">
                            <div className="w-full flex items-center justify-end gap-3" >
                                <IoMdMail className='text-2xl text-blue-600 cursor-pointer'/>
                                <MdLocalPrintshop className='text-2xl text-blue-600 cursor-pointer' onClick={() => handlePrintClick(data)} />
                            </div>
                            <div className="text-lg font-semibold text-gray-700 mr-5"> {data.counters.counter_number}</div>
                            <div
                                className="text-blue-600 text-sm cursor-pointer"
                                onClick={() =>handleCounterInfoClick(data)}
                            >
                                Counter Info (<span>{data.counters.counter_number.split(' ')[1]}</span>)

                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-2 border-t pt-2 text-sm text-gray-600">
                        <span className="block text-xs text-gray-500">
                            Target Price - {data.target_price}Rs
                            <span className="gap-8 text-grey-600 text-sm font-semibold ml-5 px-3 py-1 rounded-lg">
                                {data.assignedToUser?.name} ({data.assignedToUser?.role}, +91
                                {data.createdByUser?.phone})
                            </span>
                        </span>
                        <div className="mr-15px">
                            Created By - <span className="font-semibold">{data.createdByUser?.name}</span>
                            <span>
                                ({data.createdAt.slice(0, 10)}, {formatTo12HourTime(data.createdAt)})
                            </span>
                        </div>
                    </div>
                </div>
            ))}

            {isAssignedVendorsModalOpen && selectedData && (
                <AssignedVendorsModal
                    data={selectedData}
                    onClose={() => setAssignedVendorsModalOpen(false)}
                />
            )}
            {isViewQuotesModalOpen && selectedData && (
                <ViewQuotesModal
                    data={selectedData}
                    onClose={() => setViewQuotesModalOpen(false)}
                />
            )}
              <QuotesModal
        showModal={showModal}
        setShowModal={setShowModal}
        counterdata={counterdata}
      />

            {/* Pagination Controls */}
            {/* <div className="flex justify-center mt-4">
                <button
                    className={`px-4 py-2 mr-2 border rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="px-4 py-2">{currentPage} / {totalPages}</span>
                <button
                    className={`px-4 py-2 ml-2 border rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div> */}
        </>
    );
};

export default CounterTable;
