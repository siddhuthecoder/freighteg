import React from 'react'
import img1 from './new/VR Array 1.png'
import img2 from './new/img2.png'
import img3 from './new/img3.png'

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
      <div className="w-full flex flex-col mt-5">
        <div className="text-center text-3xl sm:text-5xl md:text-[60px] py-4 font-semibold">What Sets us <span className="text-[#0C43FF]">Apart?</span></div>
        <p className="text-center w-[80%] max-w-[800px] mx-auto text-zinc-500">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, est nobis sint odio tempora adipisci et expedita repudiandae qui nulla deleniti numquam labore vel assumenda fuga quas, ratione tenetur voluptates.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, est nobis sint odio tempora adipisci et expedita repudiandae qui nulla deleniti numquam labore vel assumenda fuga quas, ratione tenetur voluptates.
        </p>
        <div className="w-full flex items-center justify-start flex-wrap gap-3">
            {
              data.map((item) => (
                <div className="flex border w-[90%] max-w-[330px] rounded-md  flex-col shadow-lg w-12/10 mx-auto">
                    <img src={item.img} alt="" className="mx-auto my-4" />
                    <div className="text-center font-semibold">{item.title}</div>
                    <p className="text-center px-3">
                      {item.desc}
                    </p>
                </div>
              ))
            }     
        </div>
      </div>
    </>
  )
}

export default Apart
