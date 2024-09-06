import React, { useState, useEffect } from 'react';
import TransportNavBar from '../TransportNavBar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './PODUpload.css'; // Import the CSS file for styles

const PODUpload = () => {
  const user = useSelector((state) => state.login.user);
  const [activeTab, setActiveTab] = useState('pending');
  const [pendingPODs, setPendingPODs] = useState([]);
  const [historyPODs, setHistoryPODs] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (user) {
      axios.get(`https://freighteg.in/freightapi/pod/pending/${user?.id}`)
        .then((response) => setPendingPODs(response.data.pods))
        .catch((error) => console.error(error));

      axios.get(`https://freighteg.in/freightapi/pod/history/${user?.id}`)
        .then((response) => setHistoryPODs(response.data.pods))
        .catch((error) => console.error(error));
    }
  }, [user]);

  const handleFileUpload = (podId, event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      console.log(`Uploading file for POD ID: ${podId}`);
    }
  };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  console.log(pendingPODs)

  return (
    <>
      <TransportNavBar />
      <div className="pod-upload-container">
      <div className="flex gap-8 my-2">
          <div
            onClick={() => setActiveTab("pending")}
            className={`cursor-pointer ${
              activeTab === "pending"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            } px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out`}
          >
            Live POD
          </div>
          <div
            to="/branch/podform"
            className={`cursor-pointer ${
              activeTab === "history"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"
            } px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out`}
            onClick={() => setActiveTab("history")}
          >
            History POD
          </div>
        </div>

        {activeTab === 'pending' && (
          <div className="container mx-auto p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="text-left py-3 px-4 uppercase text-nowrap font-semibold text-sm">Lr Number</th>
                  <th className="text-left py-3 px-4 uppercase text-nowrap font-semibold text-sm">Vehicle Number</th>
                  <th className="text-left py-3 px-4 uppercase text-nowrap font-semibold text-sm">Status</th>
                  <th className="text-center py-3 px-4 uppercase text-nowrap font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingPODs.map((user, index) => (
                  <tr
                    key={index}
                    className={`border-t ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                  >
                    <td className="text-left py-3 px-4">{user.lrNumber}</td>
                    <td className="text-left py-3 px-4">{user.vehicleNumber}</td>
                    <td className="text-left py-3 px-4">
                      {user.approved?(
                        <span className="px-2 py-1 bg-green-200 rounded-md text-green-600">Approved</span>
                      ):(
                        <span className="px-2 py-1 bg-red-200 rounded-md text-red-600">Not Approved</span>
                      )
                      }
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="flex items-center justify-center gap-4">
                        <button className="text-blue-600 hover:text-blue-800">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <i className="fas fa-trash"></i>
                        </button>
                        <label className="inline-flex relative items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={user.isActive}
                            readOnly
                          />
                          <div className="w-10 h-5 bg-gray-200 rounded-full peer-checked:bg-blue-600"></div>
                          <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white border rounded-full transform peer-checked:translate-x-5"></div>
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="container mx-auto p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="text-left py-3 px-4 uppercase text-nowrap font-semibold text-sm">Lr Number</th>
                  <th className="text-left py-3 px-4 uppercase text-nowrap font-semibold text-sm">Vehicle Number</th>
                  <th className="text-left py-3 px-4 uppercase text-nowrap font-semibold text-sm">Status</th>
                  <th className="text-center py-3 px-4 uppercase text-nowrap font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {historyPODs.map((user, index) => (
                  <tr
                    key={index}
                    className={`border-t ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                  >
                    <td className="text-left py-3 px-4">{user.lrNumber}</td>
                    <td className="text-left py-3 px-4">{user.vehicleNumber}</td>
                    <td className="text-left py-3 px-4">
                      {user.approved?(
                        <span className="px-2 py-1 bg-green-200 rounded-md text-green-600 w-[120px]">Approved</span>
                      ):(
                        <span className="px-2 py-1 bg-red-200 rounded-md text-red-600">Not Approved</span>
                      )
                      }
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="flex items-center justify-center gap-4">
                        <button className="text-blue-600 hover:text-blue-800">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <i className="fas fa-trash"></i>
                        </button>
                        <label className="inline-flex relative items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={user.isActive}
                            readOnly
                          />
                          <div className="w-10 h-5 bg-gray-200 rounded-full peer-checked:bg-blue-600"></div>
                          <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white border rounded-full transform peer-checked:translate-x-5"></div>
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        )}

        {selectedImage && (
          <div className="modal" onClick={closeModal}>
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <img src={selectedImage} alt="POD Document" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PODUpload;
