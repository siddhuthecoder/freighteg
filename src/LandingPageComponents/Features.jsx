import React from 'react'
import { FaGavel } from "react-icons/fa";
import { FaRoute } from "react-icons/fa";
import { FaCommentDollar } from "react-icons/fa6";
import { FaShareAlt } from "react-icons/fa";
import img1 from './new/eclipse.png'



const Features = () => {
    const left = [
        {
            title:"Freight Sourcing and Reverse Auctions",
            desc:"Find, negotiate, and quickly source freight providers' details. Use our transparent and collaborative bidding process.",
            icon:FaGavel
        },
        {
            title:"In-Plant Vehicle Movement and Optimization",
            desc:"Optimize in-plant vehicle movement through advanced truck reporting, load scheduling, and plant optimization solutions.",
            icon:FaRoute
        },
       
        {
            title:"Realtime Communication & Collaboration",
            desc:"Collaborate across all communication channels through email, text, and push notifications using a unified platform to make faster decisions.",
            icon:FaCommentDollar
        },
        {
            title:"NEWS SHARING",
            desc:"Let your friends read the news you intend to share with them. et your friends read the news you intend to share with them.",
            icon:FaShareAlt
        },


       
        
    ]

    const right = [
        {
            title:"Contract Guided Online Indenting",
            desc:"Easily create e-indents for your transport service provider from the list of contracted vendors from to facilitate quick vehicle placements.",
            icon:FaGavel
        },
        {
            title:"Unified and Integrated Platform",
            desc:"SuperProcure TMS has one integrated solution to ensure minimal to zero errors in payment documentation, billings, waybills, etc.",
            icon:FaRoute
        },
       
        {
            title:"Dashboards and Analytics",
            desc:"Get real-time analytics on vendor performance, dispatch, & delivery details to take complete control over your transport operations.",
            icon:FaCommentDollar
        },
        {
            title:"POLLS",
            desc:"Participate in Polls on different issues and contribute your opinion to country wide taken stats.",
            icon:FaShareAlt
        },


       
        
    ]
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="text-center text-3xl sm:text-5xl md:text-[60px] py-4 font-semibold">QikTrack Top <span className="text-[#0C43FF]">Features & Capabilities</span></div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className=" flex flex-col">
                {
                    left.map((item) => (
                        <div className="flex my-3 flex-row-reverse md:flex-row">
                            <div className="flex flex-col">
                                <div className="font-semibold text-[#0c43FF] text-2xl pb-3 text-left md:text-right">{item.title}</div>
                                <div className="text-zinc-400 text-[12px] text-left md:text-right">{item.desc}</div>
                            </div>
                            <item.icon className="text-4xl mx-3  text-[black]" />
                        </div>
                    ))
                }
            </div>
            <div className=" flex justify-center items-center">
                <img src={img1} alt="" />
            </div>
            <div className=" flex flex-col">
                {
                    right.map((item) => (
                        <div className="flex my-3 flex-row-reverse">
                            <div className="flex flex-col">
                                <div className="font-semibold text-[#0c43FF] text-2xl pb-3 text-left md:text-;eft">{item.title}</div>
                                <div className="text-zinc-400 text-[12px] text-left md:text-left">{item.desc}</div>
                            </div>
                            <item.icon className="text-4xl mx-3  text-[black]" />
                        </div>
                    ))
                }
            </div>
        </div>
      </div>
    </>
  )
}

export default Features
