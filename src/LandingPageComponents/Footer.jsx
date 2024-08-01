import React from 'react'
import logo from './new/logo.png';
import { FaAngleRight } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";


const Footer = () => {

    const solutions = [
        {
            name:"Freight Sourcing",
            link:""
        },
        {
            name:"Indent Allocation",
            link:""
        },
        {
            name:"In Plant Logistics",
            link:""
        },
        {
            name:"Shipment Tracking",
            link:""
        },
        {
            name:"Proof of Delivery",
            link:""
        },
        {
            name:"Freight Accounting",
            link:""
        },
        {
            name:"Indian Freight Index",
            link:""
        }
    ]

    const industry = [
        {
            name:"Metal & Pipes Logistics",
            link:""
        },
        {
            name:"FMCG, FMCD & FMEG Logistics",
            link:""
        },
        {
            name:"Chemicals Logistics",
            link:""
        },
        {
            name:"EPC & Construction Logistics",
            link:""
        },
        {
            name:"Engineering & Heavy Machinery Logistics",
            link:""
        },
        {
            name:"Agriculture & Animal Feeds",
            link:""
        },
    ]

    const resources = [
        {
            name:"Case Studies",
            link:""
        },
        {
            name:"Blogs",
            link:""
        },
        {
            name:"Certification Courses",
            link:""
        },
        {
            name:"Pricing",
            link:""
        },
    ]

    const company = [
        {
            name:"About Us",
            link:""
        },
        {
            name:"TMS",
            link:""
        },
        {
            name:"Career",
            link:""
        },  
        {
            name:"Terms of Use",
            link:""
        },
        {
            name:"Disclaimer",
            link:""
        },
        
    ]
  return (
    <>
      <div className="w-full flex justify-center">
      <div className="flex flex-col w-full bg-[#0E1C35] ">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className=" ps-3 flex flex-col  mt-3">
            <div className="logo text-2xl font-bold py-3  flex items-center">
                <img src={logo} className="w-[35px] h-[35px]" alt="Logo" />
                <div className="flex flex-col ms-2">
                    <div className="font-bold text-white text-2xl">Freight-EG</div>
                    <div className="text-zinc-300 text-[10px] mt-[-10px]">Effortless Transport solutions</div>
                </div>
            </div>
            <div className="mt-2 text-white">Contact Info</div>
            <div className="text-zinc-400 hover:text-white duration-150">428/38 Pyramid House, Rajiv Colony, <br /> Sector -33, Gurgaon, Haryana 122001</div>
            <div className="text-zinc-400 hover:text-white duration-150 mt-4">+91 96719 66994</div>
            <div className="text-zinc-400 hover:text-white duration-150 mt-4">hello@freighteg.com</div>

        </div>
        <div className=" ps-3 flex flex-col">
            <div className="text-4xl mt-4 text-[white]">Industry</div>
            {
                industry.map((item) => (
                    <div className="text-zinc-400 my    my-2 cursor-pointer hover:text-[#0c43FF] flex items-center gap-1">
                        {/* <FaAngleRight /> */}
                        <span>{item.name}</span>
                    </div>
                ))
            }
        </div>
        <div className=" ps-3 flex flex-col">
            <div className="text-4xl mt-4 text-[white]">Solutions</div>
            {
                solutions.map((item) => (
                    <div className="text-zinc-400 my-2 cursor-pointer hover:text-[#0c43FF] flex items-center gap-1">
                        {/* <FaAngleRight /> */}
                        <span>{item.name}</span>
                    </div>
                ))
            }
        </div>
        
        <div className=" ps-3 flex flex-col">
            <div className="text-4xl mt-4  text-[white]">Company</div>
            {
                company.map((item) => (
                    <div className="text-zinc-400 my-2 cursor-pointer hover:text-[#0c43FF] flex items-center gap-1">
                        {/* <FaAngleRight /> */}
                        <span>{item.name}</span>
                    </div>
                ))
            }
        </div>
      </div>
      <div className="w-[90%] max-w-[1200px] mx-auto h-[2px] bg-zinc-500"></div>
      <div className="w-full flex  ">

        <div className="w-[100%] max-w-[1200px] mx-auto flex items-center justify-around     md:justify-between flex-wrap-reverse ">
            <div className="text-white text-center hover:text-white pt-[40px]">© 2019 Lift Media. All Rights Reserved. </div>
            <div className="flex items-center mt-4">
                <div className="w-[30px] mx-2 h-[30px] text-white  rounded-full border-white border flex justify-center items-center">
                    <FaFacebookF />
                </div>
                <div className="w-[30px] mx-2 h-[30px] text-white  rounded-full border-white border flex justify-center items-center">
                    <FaLinkedinIn />
                </div>
                <div className="w-[30px] mx-2 h-[30px] text-white  rounded-full border-white border flex justify-center items-center">
                    <FaTwitter />
                </div>
            </div>
        </div>
      </div>
      </div>
      </div>
    </>
  )
}

export default Footer
