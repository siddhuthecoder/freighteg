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
      <div className="text-center text-5xl  overflow-y-scroll font-bold text-blue-500">Scroll Effect</div>
      <div className="w-full flex mb-[70px] items-center flex-col mt-5 justify-center">
        {sections.map((item, index) => (
          <div
            key={index}
            id={`section-${index}`}
            className=" sticky  shadow-xl bg-white w-full md:w-[80%] overflow-x-scroll  border h-[80vh] over  transition-opacity duration-300"
            style={{ 
              top: `${index * 10 +120}px`, 
              opacity: opacity[index], 
              width: `${80 - index+5}%` 
            }}
          >
            {sections.component}
          </div>
        ))}
      </div>
     
    </>
  );
};

export default LayerAnimation;
