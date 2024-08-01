import React from 'react'
import './index.css'
import { FaArrowRight } from "react-icons/fa6";
import truck from './new/truck.svg'


const Hero = () => {
  return (
    <>
      <div className="w-full h-screen flex items-center flex-col justify-center hero bg-black" style={{
       
        backgroundColor:"#0E1C35"
      }}>
        <div className="text-[40px] md:text-[80px] text-center md:w-[80%] mx-auto text-white font-bold hero-text">Deliver Your Things Easier  </div> 
          <div className="flex items-center justify-center flex-wrap gap-3">
            <div className="text-white font-bold hero-text text-[40px] md:text-[80px]">With </div>
            <img src={truck} alt="" className="scale-[0.5]  mt-[-20px] sm:mt-[10px] md:scale-[1]" />
          </div>
         
         <p className="text-center  text-[20px] text-zinc-400 ">Lorem ipsum dolor sit, a quidem quis! Eligendi nemo corporis, provident quasi sequi quam quas dolores, ab cum itaque totam eos nobis possimus debitis?</p>
         <div className="w-full mt-[40px] flex justify-center items-center">
            <button className="px-5 py-3 rounded-full text-white bg-[#0C43FF] flex items-center">
              <span>Explore More</span>
              <FaArrowRight />
            </button>
         </div>

      </div>
      
    </>
  )
}

export default Hero
