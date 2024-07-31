import React from 'react'
import './index.css'

const Hero = () => {
  return (
    <>
      <div className="w-full h-screen flex items-center flex-col justify-center hero bg-black" style={{
       
        backgroundColor:"#0E1C35"
      }}>
        <div className="text-[40px] md:text-[80px] text-center md:w-[80%] mx-auto text-white font-bold hero-text">Deliver Your Things Easier  <br />with 
          <span className="text-white ps-3 logo-text">
           Freight-EG
          </span>
         </div>
         <p className="text-center text-zinc-400">Lorem ipsum dolor sit, a quidem quis! Eligendi nemo corporis, provident quasi sequi quam quas dolores, ab cum itaque totam eos nobis possimus debitis?</p>

      </div>
      
    </>
  )
}

export default Hero
