import React from 'react'
import { FaGavel } from "react-icons/fa";
import { FaRoute } from "react-icons/fa";
import { FaCommentDollar } from "react-icons/fa6";
import { FaShareAlt } from "react-icons/fa";
import img1 from './new/eclipse.png'
import f1 from './new/f1.png'
import f2 from './new/f2.png'
import f3 from './new/f3.png'
import f4 from './new/f4.png'
import f5 from './new/f5.png'
import f6 from './new/f6.png'
import f7 from './new/f7.png'
import f8 from './new/f8.png'



const Features = () => {
    const left = [
        {
            title:"Freight Sourcing and Reverse Auctions",
            desc:"Find, negotiate, and quickly source freight providers' details. Use our transparent and collaborative bidding process.",
            icon:f1
        },
        {
            title:"In-Plant Vehicle Movement and Optimization",
            desc:"Optimize in-plant vehicle movement through advanced truck reporting, load scheduling, and plant optimization solutions.",
            icon:f2
        },
       
        {
            title:"Realtime Communication & Collaboration",
            desc:"Collaborate across all communication channels through email, text, and push notifications using a unified platform to make faster decisions.",
            icon:f3
        },
       


       
        
    ]

    const right = [
        {
            title:"Contract Guided Online Indenting",
            desc:"Easily create e-indents for your transport service provider from the list of contracted vendors from to facilitate quick vehicle placements.",
            icon:f5
        },
        {
            title:"Unified and Integrated Platform",
            desc:"SuperProcure TMS has one integrated solution to ensure minimal to zero errors in payment documentation, billings, waybills, etc.",
            icon:f6
        },
       
        {
            title:"Dashboards and Analytics",
            desc:"Get real-time analytics on vendor performance, dispatch, & delivery details to take complete control over your transport operations.",
            icon:f7
        },
      


       
        
    ]
  return (
    <>
      <div className="w-full flex justify-center">
      <div className="w-full md:w-[80%] mx-auto flex flex-col my-[40px]">
        <div className="text-center text-3xl sm:text-5xl md:text-[35px] py-4 pb-10 font-semibold">QikTrack Top <span className="text-[#0C43FF]">Features & Capabilities</span></div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className=" flex flex-col">
                {
                    left.map((item) => (
                        <div className="flex my-3 flex-row-reverse md:flex-row">
                            <div className="flex flex-col">
                                <div className="font-semibold text-[rgb(19,_38,_68)]  text-2xl pb-3 text-left md:text-right">{item.title}</div>
                                <div className="text-zinc-400 text-[12px] text-left md:text-right">{item.desc}</div>
                            </div>
                            <img src={item.icon} alt="" className="w-[30px] h-[30px] mx-3" />
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
                        <div className="flex my-3 flex-row-1    reverse">
                            <div className="flex flex-col">
                                <div className="font-semibold text-[rgb(19,_38,_68)]  text-2xl pb-3 text-left md:text-;eft">{item.title}</div>
                                <div className="text-zinc-400 text-[12px] text-left md:text-left">{item.desc}</div>
                            </div>
                            <img src={item.icon} alt="" className="w-[30px] h-[30px] mx-3" />
                        </div>
                    ))
                }
            </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Features
