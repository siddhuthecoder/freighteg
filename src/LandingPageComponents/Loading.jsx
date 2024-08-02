import React from 'react'
import truck from './new/truck.svg'
const Loading = () => {
  return (
    <div className="body">
        <div className="wrap" style={{
            overflow:"hidden"
        }}>
        {/* <img className="image truck-img" src={"https://learndesigntutorial.com/wp-content/uploads/2021/03/truck.png"} alt="" /> */}
        <img className="image truck-img  scale-[0.8] sm:scale-[1] " src={truck} alt=""  />
        
        <img className="image box-img md:scale-[1.2]" src="https://learndesigntutorial.com/wp-content/uploads/2021/03/box.png" alt="" />
        <img className="image box-img box-img2 scale-[1.2]" src="https://learndesigntutorial.com/wp-content/uploads/2021/03/box.png" alt="" />
    </div>
    </div>
  )
}

export default Loading
