import React from 'react'
import fam from './new/fam.png'
import fam2 from './new/fam2.png'
import fam3 from './new/fam3.png'

const About = () => {
  return (
    <>
      <div className="w-full flex justify-center bg-[#0E1C35] ">
      <div className="w-full flex flex-col md:w-[80%]">
            <div className="w-full grid my-5 grid-cols-1 md:grid-cols-2 ">
                <div className="flex items-center justify-center relative  ">
                    <div  className="w-[70%] max-w-[523.87]  flex ms-[40px] md:ms-[0px] mt-[70px] justify-center items-center relative" >
                      <img src={fam} className="w-[100%] h-[100%] z-[3] shadow-lg" alt="" />
                      <img src={fam2} className="w-[100%] h-[100%] absolute left-[-20px] top-[-20px] z-[2] " alt="" />
                      <img src={fam3} className="w-[100%] h-[100%] absolute left-[-40px] top-[-40px] z-[2] " alt="" />
                    </div>
                    

                </div>
                <div className="flex flex-col ps-3 md:ms-[-30px] md:mt-[50px]">
                  <div className="text-2xl md:text-[30px] font-semibold  text-[white] ">About Us</div>
                  <p className="text-zinc-400 text-[18px] md:text-[17px] ">At FreightEG, we provide a comprehensive solution for all your logistics needs, making us one of India's leading providers for top manufacturing and infrastructure companies. Our acclaimed products, including Spot Freight Negotiation, Trip Management Systems, Contract Management, Dispatch Planning, and Freight Accounting, effectively address critical logistics and supply chain challenges.</p>
                  <p className="text-zinc-400 text-[18px] md:text-[17px] ">At FreightEG, wgistics need one of India's wgistics need one of India'swgistics need one of India'swgistics need one of India'swgistics need one of India'swgistics need one of India's leading providers for top manufacturing and infrastructure companies. Our acclaimed products, including Spot Freight Negotiation, Trip Management Systems, Contract Management, Dispatch Planning, and Freight Accounting, effectively address critical logistics and supply chain challenges. </p>
                  {/* <div className="w-full flex items-center justify-center gap-5 mt-[30px]">
                    <div className="flex flex-col ">
                        <div className="text-[rgb(12,67,255)] text-3xl font-bold roboto">300+</div>
                        <div className="text-zinc-400 text-[14px]">companies helped</div>
                    </div>  
                    <div className="flex flex-col">
                        <div className="text-[rgb(12,67,255)] text-3xl font-bold roboto">230+</div>
                        <div className="text-zinc-400 text-[14px]">companies helped</div>
                    </div>  
                  </div> */}
                </div>
            </div>
      </div>
      </div>
    </>
  )
}

export default About
