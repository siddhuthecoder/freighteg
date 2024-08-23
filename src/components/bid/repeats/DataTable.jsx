import React from 'react'
import { MdEmail } from "react-icons/md";
import { BsFillPrinterFill } from "react-icons/bs";
import { FaLink } from "react-icons/fa";




const DataTable = () => {
  return (
    <>
      <div className="w-full flex flex-col overflow-x-auto">
        <div className=" bg-[#9D9D9D21] w-[97%] h-[60px] items-center ps-2 mt-2  rounded-md min-w-[1200px] mx-auto grid grid-cols-6 gap-2">
            <div className="font-semibold md:text-lg">ID</div>
            <div className="font-semibold md:text-lg">Date</div>
            <div className="font-semibold md:text-lg">Loading</div>
            <div className="font-semibold md:text-lg">Unloading</div>
            <div className="font-semibold md:text-lg">Details</div>
            <div className="font-semibold md:text-lg">Best Quote</div>
        </div>
        <div className="mx-auto flex flex-col w-[97%]  shadow-md rounded-md mt-2  bg-white min-w-[1200px]">
            <div className=" w-[100%] text-sm  ps-2 mt-2 bg  min-w-[1200px]   mx-auto grid grid-cols-6 gap-2">
                <div className="flex flex-col  ps-2 pt-1">
                    <div className="id text-[#0662C6] font-semibold">#2345677</div>
                    <div className="text-zinc-500 text-sm">(Spot RFFQ)</div>
                    <div className="font-semibold text-red-600">2d 14hr 45min </div>
                </div>
                <div className="flex flex-col  ps-2 pt-1">
                    <div className="font-semibold">8th July 2024</div>
                    <div className="font-semibold">8:00 AM</div>
                    <div className="text-zinc-400 pt-2">Loading time ...</div>
                    <div className="text-[#0662C6] font-semibold">8 July , 8:00 AM</div>
                </div>
                <div className="flex flex-col  ps-2 pt-1">
                    <div className="text-sm">
                        <span className="font-semibold">Kolkata , West Bengal </span>
                        <span className="text-[#0662C6]">(+1 more)</span>
                    </div>
                    <div className="text-sinc-400 pe-4 text-[12px]">
                    ( XYZ Warehouse
                    Gurgaon, Haryana
                    12345)
                    </div>
                </div>
                <div className="flex flex-col  ps-2 pt-1">
                    <div className="text-sm">
                        <span className="font-semibold">Kolkata , West Bengal </span>
                        <span className="text-[#0662C6]">(+1 more)</span>
                    </div>
                    <div className="text-sinc-400 pe-4 text-[12px]">
                        ( XYZ Warehouse
                        Gurgaon, Haryana
                        12345)
                    </div>
                </div>
                <div className="flex flex-col  ps-2 pt-1">
                    <div className="">Vehicle Required- 1</div>
                    <div className="">Vehicle Type- 1</div>
                    <div className="">Equipments</div>
                    <div className="pt-2 text-[#0662C6] font-semibold">Distance- 1500 Km</div>
                </div>
                <div className="flex flex-col  ps-2 pt-1 ">
                    <div className="w-full flex items-center justify-end">
                        <MdEmail className='text-[#0662C6] text-2xl m-1' />
                        <BsFillPrinterFill className='text-[#0662C6] text-2xl m-1' />
                    </div>
                    <div className="font-semibold">Rs 85,000</div>
                    <div className="underline text-[#0662C6] cursor-pointer text-sm">View All quotes</div>
                </div>
            </div>
            <div className="w-[100%] text-sm grid grid-cols-12 gap-2 min-w-[1200px]">
                <div className="col-span-3 mt-3 flex flex-col ps-2 justify-end pt-1 ">
                    <div className="">
                        <span className="text-zinc-500">Contracted ID- </span>
                        <span className="font-semibold">54367</span>
                    </div>
                    <div className="pt-2">
                        <span className="text-zinc-500">Ceiling Price - </span>
                        <span className="font-semibold text-[#0662C6]">3,000 Rs </span>
                    </div>
                </div>
                <div className="col-span-4 mt-3 flex flex-col ps-2 justify-end  ">
                    <div className="text-sm">
                        <span className="text-zinc-500">Validity Date -  </span>
                        <span className="font-semibold text-[#0662c6]">7 Aug 2024  -  8 sept 2024</span>
                        <span className="text-zinc-500"> ( 29 days) </span>
                    </div>
                    <div className="w-full flex items-center justify-start gap-5 mt-2">
                        <div className="text-sm">
                            <span className="text-zinc-500">Target Price -  </span>
                            <span className="font-semibold text-[#0662c6]">7,000 Rs</span>
                        </div>
                        <div className="flex items-center">
                            <FaLink className="text-[#0662c6]  mx-1" />
                            <div className="text-[#0662c6]">Attachment</div>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 flex flex-col ps-2 justify-end items-start  mt-3 ">
                    <div className="font-semibold text-[#0662c6] ">T & C</div>
                </div>
                <div className="col-span-3 flex flex-col ps-2 justify-end mt-3 ">
                    <button className="px-3 w-[80%] mt-2 rounded-md  py-2 text-white bg-[#0662c6]">Add Offfline Rates </button>
                    <div className="pt-3">Created By- Rahul Verma</div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default DataTable
