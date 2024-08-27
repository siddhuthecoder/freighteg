import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './../Navbar';

const FastagId = () => {
  const { vehicleNumber } = useParams(); // Access the vehicleNumber parameter from the URL

  return (
      <>
     <Navbar/>
    <div>
      <h1>Fastag Information</h1>
      <p>Vehicle Number: {vehicleNumber}</p>
      {/* Add logic to use the vehicleNumber as needed */}
    </div>
      </>
  );
};

export default FastagId;
