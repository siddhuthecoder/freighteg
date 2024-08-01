import React,{useState} from 'react'

const Layer1 = () => {
  const [tab,setTab] = useState("Top Products")
  const tabs = [
    {
      name:"Top Products",
    },
    {
      name:"On Website / App",
    },
    {
      name:"",
    },
    {
      name:"",
    },
  ]
  return (
    <>
      <div className="w-full flex flex-col ">
        <div className="font-semibold text-2xl">Accept Payments</div>
        <div className="w-full flex items-center ms-4 justify-start overflow-x-auto gap-3">
          <div className="tab cursor-pointer hover:text-blue-500">Top Products</div>
          <div className="tab cursor-pointer hover:text-blue-500">Top Products</div>
          <div className="tab cursor-pointer hover:text-blue-500">Top Products</div>
          <div className="tab cursor-pointer hover:text-blue-500">Top Products</div>
          <div className="tab cursor-pointer hover:text-blue-500">Top Products</div>
        </div>
      </div>
    </>
  )
}

export default Layer1
