import React from 'react';
import Header from '../../LandingPageComponents/Header';


const Contact = () => {
  return (
      <>
      <Header/>
    <div className="flex justify-center  items-center min-h-screen  bg-gray-100 p-9">
      <div className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-[#0C43FF] p-6">
          <h2 className="text-2xl font-bold text-white">Contact Information</h2>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Contact Person</h3>
            <p className="text-gray-600">Sunder Yadav</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
            <p className="text-gray-600">9671966994</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Email</h3>
            <p className="text-gray-600">qiktrack@gmail.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Office Address</h3>
            <p className="text-gray-600">428/38 Pyramid House, Sector -33, Gurgaon, Haryana 122001</p>
          </div>
        </div>
      </div>
    </div>
      </>
  );
}

export default Contact;
