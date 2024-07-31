import React from 'react'
import fam from './new/fam.png'

const About = () => {
  return (
    <>
      <div className="w-full flex flex-col bg-[#0E1C35]">
            <div className="w-full grid my-5 grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex items-center justify-center">
                    <img src={fam} alt="" className="w-[80%] h-[50vh]" />
                </div>
                <div className="flex flex-col ps-3 ms-2">
                  <div className="text-3xl md:text-[50px] font-semibold text-[#0C43FF] ">About Us</div>
                  <p className="text-zinc-400 text-[18px] md:text-[25px] ">At FreightEG, we provide a comprehensive solution for all your logistics needs, making us one of India's leading providers for top manufacturing and infrastructure companies. Our acclaimed products, including Spot Freight Negotiation, Trip Management Systems, Contract Management, Dispatch Planning, and Freight Accounting, effectively address critical logistics and supply chain challenges.</p>
                  <div className="w-full flex items-center justify-start gap-5 mt-[30px]">
                    <div className="flex flex-col">
                        <div className="text-[rgb(12,67,255)] text-5xl font-bold">300+</div>
                        <div className="text-zinc-400">companies helped</div>
                    </div>  
                    <div className="flex flex-col">
                        <div className="text-[rgb(12,67,255)] text-5xl font-bold">230+</div>
                        <div className="text-zinc-400">companies helped</div>
                    </div>  
                  </div>
                </div>
            </div>
      </div>
    </>
  )
}

export default About
