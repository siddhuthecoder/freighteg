import React, { useEffect, useState } from 'react';
import Layer1 from './Layer1';
import Layer2 from './Layer2'
import Layer3 from './Layer3'
import Layer4 from './Layer4'
const LayerAnimation = () => {
  const sections = [
    { name: "one",component:<Layer1 /> },
    { name: "one",component:<Layer2 /> },
    { name: "one",component:<Layer3 /> },
    { name: "one",component:<Layer4 /> },
  ];

  const [opacity, setOpacity] = useState(Array(sections.length).fill(1));

  const handleScroll = () => {
    const newOpacity = sections.map((_, index) => {
      const element = document.getElementById(`section-${index}`);
      if (!element) return 1;
      const rect = element.getBoundingClientRect();
      return rect.top <= 0 ? 0.5 : 1;
    });
    setOpacity(newOpacity);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
        <div className="text-center text-3xl sm:text-5xl md:text-[35px] py-8 font-semibold">Freight <span className="text-[#0C43FF]">EG</span></div>
     
      <div className="w-full flex justify-center">
      <div className="w-full md:w-[80%] flex mb-[70px] items-center flex-col mt-5 justify-center">
        {sections.map((item, index) => (
          <div
            key={index}
            id={`section-${index}`}
            className=" sticky  shadow-xl bg-white w-full md:w-[90%]   border over  transition-opacity duration-300"
            style={{ 
              top: `${index * 10 +120}px`, 
              opacity: index !== sections.length-1 && opacity[index], 
              width: `${90 + index+5}%` 
            }}
          >
            {item.component}
          </div>
        ))}
      </div>
      </div>
     
    </>
  );
};

export default LayerAnimation;
