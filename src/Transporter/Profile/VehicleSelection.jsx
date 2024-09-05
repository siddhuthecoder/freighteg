import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import TransportNavBar from '../TransportNavBar';
import './VehicleSelection.css'; // Import the custom CSS file

const VehicleSelection = () => {
  const [operationalVehicle, setOperationalVehicle] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.login.user);

  // List of original vehicles
  const originalVehicles = [
    "Tata Ace",
    "Bolero Pick Up",
    "Truck 10FT/407",
    "Truck 14FT/709",
    "Truck 17FT/909",
    "Truck 18FT",
    "Truck 19FT/1109",
    "Truck 20FT/1109",
    "Truck 22FT",
    "Truck 24FT",
    "Truck 32FT SXL",
    "Truck 32FT MXL",
    "Torus",
    "Trailer 20FT",
    "Trailer 34FT",
    "Trailer 40FT"
  ];

  useEffect(() => {
    const fetchVehicle = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://freighteg.in/freightapi/vendor/${user?.id}`);
        if (response?.status === 200) {
          const vehicleData = response?.data?.data?.vehicle_type;
          
          // Create an array that includes all original vehicles, 
          // marking them as selected or not based on user data.
          const updatedVehicleTypeData = originalVehicles.map((vehicle) => ({
            label: vehicle,
            status: vehicleData.includes(vehicle) // Selected if in user's vehicle list
          }));

          setOperationalVehicle(updatedVehicleTypeData);
        } else {
          throw new Error("Something went wrong!!");
        }
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
        alert("Error", "Something went wrong or no operational vehicle data found!!");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [user?.id]);

  const handleVehicleChange = (index) => {
    const updatedVehicles = operationalVehicle.map((vehicle, i) => {
      if (i === index) {
        // Toggle the status of the selected vehicle
        return { ...vehicle, status: !vehicle.status };
      }
      return vehicle;
    });
    setOperationalVehicle(updatedVehicles);
  };

  const handleUpdate = async () => {
    setLoading(true);
    const selectedVehicles = operationalVehicle
      .filter((vehicle) => vehicle.status)
      .map((vehicle) => vehicle.label);

    try {
      const response = await axios.patch(
        `https://freighteg.in/freightapi/updateVendor/${user?.id}`,
        { vehicle_type: selectedVehicles }
      );
      if (response?.status === 200) {
        alert("Success", "Updated Successfully!!");
      } else {
        throw new Error("Something went wrong!!");
      }
    } catch (error) {
      console.error("Error updating vehicle data:", error);
      alert("Sorry!!", "Something went wrong or no updated operational vehicle data found!!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TransportNavBar />
      <div className="vehicle-selection-container">
        <h2>Vehicle Selection</h2>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <ul className="vehicle-selection-list">
            {operationalVehicle.map((vehicle, index) => (
              <li key={vehicle.label} className="vehicle-item">
                <label>
                  <input
                    type="checkbox"
                    checked={vehicle.status}
                    onChange={() => handleVehicleChange(index)}
                  />
                  {vehicle.label}
                </label>
              </li>
            ))}
          </ul>
        )}
        <button className="update-button" onClick={handleUpdate}>Update</button>
      </div>
    </>
  );
};

export default VehicleSelection;
