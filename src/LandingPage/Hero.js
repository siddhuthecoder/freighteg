import React from "react";

const Hero = () => {
  return (
    <div className="bg-gray-100 py-36">
      <div className="max-w-18xl mx-auto px-8 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-6xl font-bold text-gray-900">
            Next generation <br></br>Freight Bidding Software
          </h1>
          <p className="mt-2 text-4xl text-gray-700">
            for Fleet Owners & Transport Contractors
          </p>
          <div className="mt-6">
            <button className="bg-blue-600 text-2xl text-white px-10 py-5 rounded-full mt-10">
              Talk to our Experts
            </button>
          </div>
        </div>
        <div className="mt-8 lg:mt-0 lg:w-1/2 flex justify-center">
          <img
            src="http://www.qikbuk.com/img/who_we_are.png"
            alt="Illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
