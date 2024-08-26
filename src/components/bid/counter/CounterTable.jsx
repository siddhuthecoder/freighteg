import React, { useState } from 'react';
import { format, toZonedTime } from 'date-fns-tz';
import AssignedVendorsModal from '../repeats/AssignedVendorsModal';
import ViewQuotesModal from '../repeats/ViewQuotesModal';
import { IoMdMail } from "react-icons/io";
import { MdLocalPrintshop } from "react-icons/md";


const QuotesModal = ({ showModal, setShowModal }) => {
    const vendors = [
      { name: 'Vendor 1', rate: 'Rs 80,000' },
      { name: 'Vendor 2', rate: 'Rs 82,000' },
      { name: 'Vendor 3', rate: 'Rs 85,000' },
      { name: 'Vendor 4', rate: 'Rs 90,000' }, 
      { name: 'Vendor 5', rate: 'Rs 92,000' }, 
    ];
  
    if (!showModal) return null;
  
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 p-4 md:p-6 relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowModal(false)}
          >
            <div>X</div>
          </button>
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Vendor Quotes</h2>
      
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left text-xs md:text-sm font-semibold text-gray-700 border">Vendor Name</th>
                  <th className="p-2 text-left text-xs md:text-sm font-semibold text-gray-700 border">Rate</th>
                  <th className="p-2 text-left text-xs md:text-sm font-semibold text-gray-700 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2 text-xs md:text-sm text-gray-800 border">{vendor.name}</td>
                    <td className="p-2 text-xs md:text-sm text-gray-800 border">{vendor.rate}</td>
                    <td className="p-2 text-xs md:text-sm text-gray-800 border">
                      <div className="flex space-x-2">
                        <button className="bg-blue-200 text-blue-600 px-2 py-1   rounded-md text-xs md:text-sm">
                          Counter
                        </button>
                        <button className="bg-green-200 text-green-600 px-2 py-1 md:px-4 md:py-2 rounded-md text-xs md:text-sm">
                          Assign Bid
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      
    );
  };

const CounterTable = ({ datas }) => {
    const [isAssignedVendorsModalOpen, setAssignedVendorsModalOpen] = useState(false);
    const [isViewQuotesModalOpen, setViewQuotesModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [showModal, setShowModal] = useState(false);

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

    if (!datas || datas.length === 0) {
        return <div className="text-center text-gray-500 py-4">No data available</div>;
    }

    console.log(datas)

    return (
        <>
            {datas.map((data) => (
                <div
                    key={data.bidNo}
                    className="bg-blue-50 rounded-b-lg p-4 mt-3 relative mx-auto flex flex-col w-[97%] shadow-md rounded-md min-w-[1200px]"
                >
                    <div className="w-[100%] text-sm mt-2 min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
                        <div className="flex flex-col pt-1">
                            <span className="block text-black font-semibold">Qiktrack</span>
                            <span className="block text-blue-600 font-semibold">#{data.bidNo}</span>
                            <span className="block text-red-600">{convertToTimeDifference(data.updatedAt)}</span>
                            <div className="block text-grey-500 mt-12">Remarks</div>
                        </div>
                        <div className="flex flex-col pt-1">
                            <span className="block font-medium ml-6">{data.createdAt.slice(0, 10)}</span>
                            <span className="block ml-6">{formatTo12HourTime(data.createdAt)}</span>
                        </div>
                        <div className="flex flex-col pt-1">
                            <span className="block font-medium ml-4">
                                {data.loading_city} {data.loading_state}
                            </span>
                            <span className="block text-xs text-gray-500 ml-4">
                                ({data.loading_address}) {data.loading_pincode}
                            </span>
                        </div>
                        <div className="flex flex-col pt-1">
                            <span className="block font-medium">
                                {data.unloading_city} {data.unloading_state}
                            </span>
                            <span className="block text-xs text-gray-500">
                                ({data.unloading_address}) {data.unloading_pincode}
                            </span>
                        </div>
                        <div className="flex flex-col pt-1">
                            
                            <span className="block">Vehicle Required - {data.quantity}</span>
                            <span className="block">
                                {data.vehicle_type} - {data.vehicle_size}
                            </span>
                            <span className="block">Equipments</span>
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
                                className="text-blue-600 underline text-sm cursor-pointer"
                                onClick={() => setShowModal(true)}
                            >
                                Counter Info(3)
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
            <QuotesModal showModal={showModal} setShowModal={setShowModal} />
        </>
    );
};

export default CounterTable;
