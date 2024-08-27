import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './../Navbar';
const SarathiId = () => {
  const { vehicleNumber,  dob } = useParams(); // Access the parameters from the URL

  return (
    <>
     <Navbar/>
    <div>
      <h1>Sarathi Information</h1>
      <p>Vehicle Number 1: {vehicleNumber}</p>
      {/* <p>Vehicle Number 2: {vehicleNumber2}</p> */}
      <p>Date of Birth: {dob}</p>
      {/* Add logic to use the parameters as needed */}
    </div>
    </>
  );
};

export default SarathiId;
