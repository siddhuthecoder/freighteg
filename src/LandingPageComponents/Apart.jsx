import React from 'react'
import img1 from './new/VR Array 1.png'
import img2 from './new/img2.png'
import img3 from './new/img3.png'
import './styles.css'

const Apart = () => {
  const data = [
    {
      img:img1,
      title:"Smart Freight Sourcing",
      desc:"Our intelligent freight sourcing system offers manufacturing and infrastructure companies fast, efficient, and transparent logistic solutions."
    },
    {
      img:img2,
      title:"Easy Integration",
      desc:"SuperProcure has the simplest user interface and easy integration features. It enables faster adoption across all supply chain stakeholders."
    },
    {
      img:img3,
      title:"Real-time Analytics",
      desc:"The all-in-one TMS dashboard offers visibility to insightful logistics data. This ensures real-time collaboration and decision-making much more effortless."
    },
    
  ]
  return (
    <>
      <div className="w-full flex justify-center">
      <div className="w-full md:w-[80%] mx-auto flex flex-col mt-5">
        <div className="text-center text-3xl sm:text-5xl md:text-[35px] py-3 font-semibold">What Sets us <span className="text-[#0C43FF]">Apart?</span></div>
        <p className="text-center w-[80%] max-w-[800px] mx-auto text-zinc-500 text-[13px] my-[20px]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, est nobis sint odio tempora adipisci et expedita repudiandae qui nulla deleniti numquam labore vel assumenda fuga quas, ratione tenetur voluptates.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, est nobis sint odio tempora adipisci et expedita repudiandae qui nulla deleniti numquam labore vel assumenda fuga quas, ratione tenetur voluptates.
        </p>
        <div className="w-full flex items-center mb-[30px] justify-center flex-wrap gap-3  mt-[30px]">
            {
              data.map((item) => (
                <div className="flex border w-[90%] shadow-xl max-w-[352.7px]  custom-shadow  h-[349px] rounded-[20px]   duration-150 flex-col  w-12/10 mx-auto">
                    <img src={item.img} alt="" className="mx-auto my-4" />
                    <div className="text-center font-semibold">{item.title}</div>
                    <p className="text-center px-3 sd">
                      {item.desc}
                    </p>
                </div>
              ))
            }     
        </div>
      </div>
      </div>
    </>
  )
}

export default Apart
// shadow-[rgba(50,50,93,0.25)_0px_50px_100px_-20px,rgba(0,0,0,0.3)_0px_30px_60px_-30px] 