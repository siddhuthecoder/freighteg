import React,{useState,useEffect} from 'react';
import { MdEmail } from 'react-icons/md';
import { BsFillPrinterFill } from 'react-icons/bs';
import { FaLink } from 'react-icons/fa';
import { format, toZonedTime } from 'date-fns-tz';
// import { ChevronDownIcon, EnvelopeIcon, PrinterIcon,EyeIcon,CheckIcon, XMarkIcon, PencilIcon } from '@heroicons/react/24/outline';
import ViewQuotesModal from '../repeats/ViewQuotesModal';
import AssignedVendorsModal from '../repeats/AssignedVendorsModal';
import { IoMdMail } from "react-icons/io";
import { MdLocalPrintshop } from "react-icons/md";

const QuotesModal = ({ showModal, setShowModal }) => {
    const vendors = [
      { name: 'shayam', Vendorrate: 'Rs 82,000' },
      { name: 'Mohan',  Vendorrate: 'Rs 85,000' },
      { name: 'Lucky', Vendorrate: 'Rs 90,000' }, 
      { name: 'Aniket', Vendorrate: 'Rs 92,000' }, 
    ];
  
    if (!showModal) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6 relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowModal(false)}
          >
            {/* <XMarkIcon className="h-6 w-6" /> */}
            <div className="">X</div>
          </button>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex justify-between">Vendor Name
          <h2 className="text-xl font-semibold text-gray-800 mb-4 mr-15">Vendor Price</h2>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 mr-20 ml-15">Target Price
            </h2>
          </h2>
  
          {/* Vendor list container with max height and scrollbar */}
          <div className="max-h-60 overflow-y-auto space-y-4">
            {vendors.map((vendor, index) => (
              <div key={index} className="flex justify-between items-center p-4 border rounded-md">
                <span className="text-gray-800 font-medium">{vendor.name}</span>
                <span className="text-gray-800">{vendor.Vendorrate}</span>
                <span className="text-gray-800 mr-10">{vendor.Vendorrate}</span>

                
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

const VendorDetailsModal = ({ showVendorDetailsModal, setShowVendorDetailsModal, vendorDetails }) => {
    if (!showVendorDetailsModal) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6 relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowVendorDetailsModal(false)}
          >
            {/* <XMarkIcon className="h-6 w-6" /> */}
            <div className="">X</div>
          </button>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Vendor Details</h2>
  
          <div className="overflow-y-auto max-h-96 space-y-2">
            {Object.entries(vendorDetails).map(([key, value], index) => (
              <div key={index} className="flex justify-between items-center p-2 border-b">
                <span className="text-blue-600 font-medium">{key}</span>
                <span className="text-gray-800">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };


  
  const VehicleInfoModal = ({ showVehicleModal, setShowVehicleModal }) => {
    const vendors = [
      { name: 'JH45R4567'},
      { name: 'Gj03R6798' },
      { name: 'MH90Y3456'}, 
      { name: 'KL56Y7834' }, 
    ];
  
    if (!showVehicleModal) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6 relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowVehicleModal(false)}
          >
            {/* <XMarkIcon className="h-6 w-6" /> */}
            <div className="">X</div>
          </button>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex justify-between">Vehicle Number
          <h2 className="text-xl font-semibold text-gray-800 mb-4 mr-20 ">Action</h2>

          </h2>
         

  
          {/* Vendor list container with max height and scrollbar */}
          <div className="max-h-60 overflow-y-auto space-y-4">
            {vendors.map((vendor, index) => (
              <div key={index} className="flex justify-between items-center p-4 border rounded-md">
                <span className="text-gray-800 font-medium">{vendor.name}</span>
                <span className="text-gray-800">{vendor.rate}</span>
                <div className="space-x-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">Saarthi</button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md text-sm">Fastag Tracking</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };


  const vendorDetails = {
    "Vendor Name": "Qikbuk",
    "Owner Name": "Sunder",
    "Vendor Number": "1234567890",
    "Supervisor Name": "Vinod",
    "Supervisor Number": "9818604556",
    "Pan Number": "EUJPS7582A",
    "GST Number": "038476R7389292",
    "Address": "Test 6",
    "Code": "222223",
  };


const HistoryTable = ({ datas }) => {
    // console.log(datas)
    const [isAssignedVendorsModalOpen, setAssignedVendorsModalOpen] = useState(false);
    const [isViewQuotesModalOpen, setViewQuotesModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showVendorsModal, setShowVendorsModal] = useState(false);
    const [showVendorDetailsModal, setShowVendorDetailsModal] = useState(false);
    const [showVehicleModal, setShowVehicleModal] = useState(false); 
  


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
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `data-${data._id}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url); // Clean up the URL object
    };

    const handleAssignedVendorsClick = (data) => {
        setSelectedData(data);
        setAssignedVendorsModalOpen(true);
    };

    const handleViewQuotesClick = (data) => {
        setSelectedData(data);
        setViewQuotesModalOpen(true);
    };




    if (datas.length === 0) {
        return <div className="text-center text-gray-500 py-4">No data available</div>;
    }
    // console.log(datas)

    return (
        <>
            {datas.map((data) => (
                <div className=" bg-blue-50 rounded-b-lg p-4 - mt-3 relative mx-auto flex flex-col w-[97%] shadow-md rounded-md min-w-[1200px]">
                <div className="w-[100%] text-sm  mt-2 min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
                    <div className="flex flex-col  pt-1">
                        <span className="block text-black font-semibold">Qiktrack</span>
                        <span className="block text-blue-600 font-semibold">#{data.bidNo}</span>
                        <span className="block text-red-600">{convertToTimeDifference(data.updatedAt)} </span>
                        <div className="block text-grey-500 mt-12">Remarks</div>
                    </div>

                    <div className="flex flex-col  pt-1">
                        <span className="block font-medium ml-6">{data.createdAt.slice(0, 10)}</span>
                        <span className="block ml-6">{formatTo12HourTime(data.createdAt)}</span>
                    </div>

                    <div className="flex flex-col  pt-1">
                        <span className="block font-medium ml-4">{data.loading_city} {data.loading_state} </span>
                        <span className="block text-xs text-gray-500 ml-4">  ( {data.loading_address}) {data.loading_pincode}</span>
                    </div>

                    <div className="flex flex-col  pt-1">
                        <span className="block font-medium">{data.unloading_city} {data.unloading_state}</span>
                        <span className="block text-xs text-gray-500"> ( {data.unloading_address}) {data.unloading_pincode}</span>
                    </div>

                    <div className="flex flex-col  pt-1 ">
                        <span className="block">Vehicle Required - {data.quantity}</span>
                        <span className="block">{data.vehicle_type} - {data.vehicle_size}</span>
                        <span className="block">Equipments</span>
                        <a href="#" className="text-blue-600">Distance - {data.route_distance}  Km</a>
                    </div>

                    <div className="flex flex-col  pt-1 ">
                            <div className="w-full flex items-center justify-end gap-3" >
                                <IoMdMail className='text-2xl text-blue-600 cursor-pointer'/>
                                <MdLocalPrintshop className='text-2xl text-blue-600 cursor-pointer' onClick={() => handlePrintClick(data)} />
                            </div>
                        <div className="text-lg font-semibold text-gray-700 mr-5">Rs 85,000</div>
                        <div
                        className="text-blue-600 underline text-sm cursor-pointer" onClick={() => setShowVendorDetailsModal(true)}
                        //   onClick={() => setShowModal(true)}
                        >
                        Vendor Info
                        </div>

                        <div className="absolute top-0 right-[-100px] mt-1 mr-1 flex space-x-2">
                        {/* <EnvelopeIcon className="h-5 w-5 text-blue-600" />
                        <PrinterIcon className="h-5 w-5 text-blue-600 cursor-pointer"/>
                        <PencilIcon className="h-5 w-5 text-blue-600 cursor-pointer" /> */}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2 border-t pt-2 text-sm text-gray-600">

                <span className="block text-xs text-gray-500">Target Price - {data.target_price}Rs
                    
                <span className=" gap-8 text-grey-600 text-sm font-semibold ml-5 px-3 py-1 rounded-lg">
                    {data.assignedToUser.name}({data.assignedToUser.role}, +91{data.createdByUser.phone })
                    </span>
                </span>
                <div className="text-blue-600 cursor-pointer" onClick={()=>setShowVehicleModal(true)} >Vehicle Info</div>
                <div className="text-blue-600 cursor-pointer"  onClick={() => setShowModal(true)}>Responses</div>
                <div className="mr-15px">Created By - <span className="font-semibold">{data.createdByUser.name}</span>
                    <span>( {data.createdAt.slice(0, 10)} ,  {formatTo12HourTime(data.createdAt)})</span>
                </div>
                </div>
                </div>
            ))}

                {isAssignedVendorsModalOpen && (
                    <AssignedVendorsModal data={selectedData} onClose={() => setAssignedVendorsModalOpen(false)} />
                )}
                {isViewQuotesModalOpen && (
                    <ViewQuotesModal data={selectedData} onClose={() => setViewQuotesModalOpen(false)} />
                )}
                <QuotesModal showModal={showModal} setShowModal={setShowModal} />
                <VehicleInfoModal showVehicleModal={showVehicleModal} setShowVehicleModal={setShowVehicleModal} />
                <VendorDetailsModal showVendorDetailsModal={showVendorDetailsModal} setShowVendorDetailsModal={setShowVendorDetailsModal} vendorDetails={vendorDetails} />
                            
        </>
    );
};

export default HistoryTable;
