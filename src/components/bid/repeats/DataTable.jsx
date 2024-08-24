import React from 'react';
import { MdEmail } from 'react-icons/md';
import { BsFillPrinterFill } from 'react-icons/bs';
import { FaLink } from 'react-icons/fa';
import { format, toZonedTime } from 'date-fns-tz';
// import { ChevronDownIcon, EnvelopeIcon, PrinterIcon,EyeIcon,CheckIcon, XMarkIcon, PencilIcon } from '@heroicons/react/24/outline';


const DataTable = ({ datas }) => {
    // console.log(datas)

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

    if (datas.length === 0) {
        return <div className="text-center text-gray-500 py-4">No data available</div>;
    }
    // console.log(datas)

    return (
        <>
            {datas.map((data) => (
                // <div key={data._id} className="mx-auto flex flex-col w-[97%] shadow-md rounded-md mt-2 bg-white min-w-[1200px]">
                //     <div className="w-[100%] text-sm ps-2 mt-2 min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
                //         <div className="flex flex-col ps-2 pt-1">
                //             <div className="id text-[#0662C6] font-semibold">#{data._id}</div>
                //             <div className="text-zinc-500 text-sm">(Spot RFFQ)</div>
                //             <div className="font-semibold text-red-600">{convertToTimeDifference(data.updatedAt)} </div>
                //         </div>
                //         <div className="flex flex-col ps-2 pt-1">
                //             <div className="font-semibold">{data.createdAt.slice(0, 10)}</div>
                //             <div className="font-semibold">{formatTo12HourTime(data.createdAt)}</div>
                //             <div className="text-zinc-400 pt-2">Loading time ...</div>
                //             <div className="text-[#0662C6] font-semibold">8 July , 8:00 AM</div>
                //         </div>
                //         <div className="flex flex-col ps-2 pt-1">
                //             <div className="text-sm">
                //                 <span className="font-semibold">{data.loading_city} {data.loading_state} </span>
                //                 <span className="text-[#0662C6]">(+1 more)</span>
                //             </div>
                //             <div className="text-sinc-400 pe-4 text-[12px]">
                //                 ( {data.loading_address}) {data.loading_pincode}
                //             </div>
                //         </div>
                //         <div className="flex flex-col ps-2 pt-1">
                //             <div className="text-sm">
                //                 <span className="font-semibold">{data.unloading_city} {data.unloading_state}</span>
                //                 <span className="text-[#0662C6]">(+1 more)</span>
                //             </div>
                //             <div className="text-sinc-400 pe-4 text-[12px]">
                //                 ( {data.unloading_address}) {data.unloading_pincode}
                //             </div>
                //         </div>
                //         <div className="flex flex-col ps-2 pt-1">
                //             <div className="">Vehicle Required- {data.vehicle_size}</div>
                //             <div className="">{data.vehicle_type}- 1</div>
                //             <div className="">Equipments</div>
                //             <div className="pt-2 text-[#0662C6] font-semibold">Distance- {data.route_distance} km</div>
                //         </div>
                //         <div className="flex flex-col ps-2 pt-1">
                //             <div className="w-full flex items-center justify-end">
                //                 <MdEmail className="text-[#0662C6]  text-2xl m-1" />
                //                 <BsFillPrinterFill 
                //                     className="text-[#0662C6] text-2xl m-1 cursor-pointer" 
                //                     onClick={() => handlePrintClick(data)} 
                //                 />
                //             </div>
                //             <div className="font-semibold">Rs 85,000</div>
                //             <div className="underline text-[#0662C6] cursor-pointer text-sm">View All quotes</div>
                //         </div>
                //     </div>
                //     <div className="w-[100%] text-sm grid grid-cols-12 gap-2 min-w-[1200px]">
                //         <div className="col-span-3 mt-3 flex flex-col ps-2 justify-end pt-1">
                //             <div className="">
                //                 <span className="text-zinc-500">Contracted ID- </span>
                //                 <span className="font-semibold">{data.assigned_to}</span>
                //             </div>
                //             <div className="pt-2">
                //                 <span className="text-zinc-500">Ceiling Price - </span>
                //                 <span className="font-semibold text-[#0662C6]">{data.target_price} </span>
                //             </div>
                //         </div>
                //         <div className="col-span-4 mt-3 flex flex-col ps-2 justify-end">
                //             <div className="text-sm">
                //                 <span className="text-zinc-500">Validity Date - </span>
                //                 <span className="font-semibold text-[#0662C6]">7 Aug 2024 - 8 Sept 2024</span>
                //                 <span className="text-zinc-500"> ( 29 days) </span>
                //             </div>
                //             <div className="w-full flex items-center justify-start gap-5 mt-2">
                //                 <div className="text-sm">
                //                     <span className="text-zinc-500">Target Price - </span>
                //                     <span className="font-semibold text-[#0662C6]">7,000 Rs</span>
                //                 </div>
                //                 <div className="flex items-center">
                //                     <FaLink className="text-[#0662C6] mx-1" />
                //                     <div className="text-[#0662C6]">Attachment</div>
                //                 </div>
                //             </div>
                //         </div>
                //         <div className="col-span-2 flex flex-col ps-2 justify-end items-start mt-3">
                //             <div className="font-semibold text-[#0662C6]">T & C</div>
                //         </div>
                //         <div className="col-span-3 flex flex-col ps-2 justify-end mt-3">
                //             <button className="px-3 w-[80%] mt-2 rounded-md py-2 text-white bg-[#0662C6]">Add Offline Rates</button>
                //             <div className="pt-3">Created By- Rahul Verma</div>
                //         </div>
                //     </div>
                // </div>
                <div className=" bg-blue-50 rounded-b-lg p-4 - mt-3 relative mx-auto flex flex-col w-[97%] shadow-md rounded-md min-w-[1200px]">
                <div className="w-[100%] text-sm ps-2 mt-2 min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
                    <div className="flex flex-col ps-2 pt-1">
                        <span className="block text-black font-semibold">Qiktrack</span>
                        <span className="block text-blue-600 font-semibold">#{data._id}</span>
                        <span className="block text-red-600">{convertToTimeDifference(data.updatedAt)} </span>
                        <div className="block text-grey-500 mt-12">Remarks</div>
                    </div>

                    <div className="flex flex-col ps-2 pt-1">
                        <span className="block font-medium ml-6">{data.createdAt.slice(0, 10)}</span>
                        <span className="block ml-6">{formatTo12HourTime(data.createdAt)}</span>
                    </div>

                    <div className="flex flex-col ps-2 pt-1">
                        <span className="block font-medium ml-4">{data.loading_city} {data.loading_state} </span>
                        <span className="block text-xs text-gray-500 ml-4">  ( {data.loading_address}) {data.loading_pincode}</span>
                    </div>

                    <div className="flex flex-col ps-2 pt-1">
                        <span className="block font-medium">{data.unloading_city} {data.unloading_state}</span>
                        <span className="block text-xs text-gray-500"> ( {data.unloading_address}) {data.unloading_pincode}</span>
                    </div>

                    <div className="flex flex-col ps-2 pt-1 ">
                        <span className="block">Vehicle Required - {data.vehicle_size}</span>
                        <span className="block">{data.vehicle_type} - {data.vehicle_size}</span>
                        <span className="block">Equipments</span>
                        <a href="#" className="text-blue-600">Distance - {data.route_distance}  Km</a>
                    </div>

                    <div className="flex flex-col ps-2 pt-1 ">
                        <div className="text-lg font-semibold text-gray-700 mr-5">Rs 85,000</div>
                        <div
                        className="text-blue-600 underline text-sm "
                        //   onClick={() => setShowModal(true)}
                        >
                        View all quotes
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
                    Assigned Staff({data.user.role}, +91{data.user.phone    })
                    </span>
                </span>
                <button  className="mt-2  text-blue-500 px-3 py-1.5 mr-[-50px] text-sm rounded whitespace-nowrap">
                    Assigned Vendors
                    </button>
                <div className="mr-15px">Created By - <span className="font-semibold">{data.user.name}</span>
                    <span>( {data.createdAt.slice(0, 10)} ,  {formatTo12HourTime(data.createdAt)})</span>
                </div>
                </div>
                </div>
            ))}
            
        </>
    );
};

export default DataTable;
