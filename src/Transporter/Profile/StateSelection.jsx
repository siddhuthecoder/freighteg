import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TransportNavBar from '../TransportNavBar';
import './StateSelection.css'; // Import the custom CSS file

const StateSelection = () => {
  const [operationalState, setOperationalState] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.login.user);

  useEffect(() => {
    const fetchStates = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://freighteg.in/freightapi/vendor/${user?.id}`);
        if (response?.status === 200) {
          const states = response?.data?.data?.operation_states;
          setOperationalState(states);
        } else {
          throw new Error("Something went wrong!!");
        }
      } catch (error) {
        console.error("Error fetching states:", error);
        alert("Error", "Something went wrong or no operational state data found!!");
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, [user?.id]);

  const handleStateChange = (index, field) => {
    const updatedStates = operationalState.map((state, i) => {
      if (i === index) {
        // Toggle the current selection for the field
        return { ...state, [field]: !state[field] };
      }
      return state;
    });
    setOperationalState(updatedStates);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `https://freighteg.in/freightapi/updateVendor/${user?.id}`,
        { operation_states: operationalState }
      );
      if (response?.status === 200) {
        alert("Success", "Updated Successfully!!");
      } else {
        throw new Error("Something went wrong!!");
      }
    } catch (error) {
      console.error("Error updating states:", error);
      alert("Sorry!!", "Something went wrong or no updated operational state data found!!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TransportNavBar />
      <div className="state-selection-container">
        <h2>State Selection</h2>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <table className="state-selection-table">
            <thead>
              <tr>
                <th>State</th>
                <th>Source</th>
                <th>Destination</th>
              </tr>
            </thead>
            <tbody>
              {operationalState.map((state, index) => (
                <tr key={state._id}>
                  <td>{state.name}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={state.source}
                      onChange={() => handleStateChange(index, 'source')}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={state.dest}
                      onChange={() => handleStateChange(index, 'dest')}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button className="update-button" onClick={handleUpdate}>Update</button>
      </div>
    </>
  );
};

export default StateSelection;
