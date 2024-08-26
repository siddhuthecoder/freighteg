import React, { useState } from 'react';
import { format, toZonedTime } from 'date-fns-tz';
import AssignedVendorsModal from '../repeats/AssignedVendorsModal';
import ViewQuotesModal from '../repeats/ViewQuotesModal';
import { IoMdMail } from "react-icons/io";
import { MdLocalPrintshop } from "react-icons/md";

const CancelledTable = ({ datas }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isAssignedVendorsModalOpen, setAssignedVendorsModalOpen] = useState(false);
    const [isViewQuotesModalOpen, setViewQuotesModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const itemsPerPage = 5;
    const totalPages = Math.ceil(datas.length / itemsPerPage);

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
        const dataStr = JSON.stringify(data, null, 2);
        const blob = new Blob([dataStr], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `data-${data._id}.txt`; // Save as a .txt file
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

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = datas.slice(startIndex, startIndex + itemsPerPage);

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
                            <span className="block text-black font-semibold">Qiktrack</span>
                            <span className="block text-blue-600 font-semibold">#{data.bidNo}</span>
                            <span className="block text-red-600">{convertToTimeDifference(data.expiry_date)}</span>
                            <div className="block text-grey-500 mt-12">Remarks :  {data.bid_remarks}</div>
                        </div>
                        <div className="flex flex-col pt-1">
                            <span className="block font-medium ml-6">{data.createdAt.slice(0, 10)}</span>
                            <span className="block ml-6">{formatTo12HourTime(data.createdAt)}</span>
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
                            Material type-  {data.material_type}
                            </span>
                            <span className="block">
                            Material weight-  {data.material_weight}
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
                            <div className="text-lg font-semibold text-gray-700 mr-5">Rs 85,000</div>
                            <div
                                className="text-blue-600 underline text-sm cursor-pointer"
                                onClick={() => handleViewQuotesClick(data)}
                            >
                                View all quotes
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-2 border-t pt-2 text-sm text-gray-600">
                        <span className="block text-xs text-gray-500">
                            Target Price - {data.target_price}Rs
                            <span className="gap-8 text-grey-600 text-sm font-semibold ml-5 px-3 py-1 rounded-lg">
                               Assigned Staff  ({data.assignedToUser?.name}, +91
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

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-white bg-blue-600 rounded disabled:bg-gray-400"
                >
                    Previous
                </button>
                <span className="px-4 py-2 text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-white bg-blue-600 rounded disabled:bg-gray-400"
                >
                    Next
                </button>
            </div>

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
        </>
    );
};

export default CancelledTable;
