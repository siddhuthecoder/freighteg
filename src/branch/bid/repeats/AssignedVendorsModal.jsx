// AssignedVendorsModal.js
import React, { useEffect } from 'react';

const AssignedVendorsModal = ({ data, onClose }) => {
    useEffect(()=>{
   
    },[])
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Assigned Vendors</h2>
                {/* Display the assigned vendors data */}
                <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Close</button>
            </div>
        </div>
    );
};

export default AssignedVendorsModal;




