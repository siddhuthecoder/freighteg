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

  return (
    <>
      <TransportNavBar />
      <div className="pod-upload-container">
        <nav className="pod-nav">
          <button className={activeTab === 'pending' ? 'active' : ''} onClick={() => setActiveTab('pending')}>Pending</button>
          <button className={activeTab === 'history' ? 'active' : ''} onClick={() => setActiveTab('history')}>History</button>
        </nav>

        {activeTab === 'pending' && (
          <div className="pod-list">
            <h2 className="pod-title">Pending PODs</h2>
            {pendingPODs.map((pod) => (
              <div className="pod-item" key={pod._id}>
                <p><strong>LR Number:</strong> {pod.lrNumber}</p>
                <p><strong>Vehicle Number:</strong> {pod.vehicleNumber}</p>
                <button className="upload-button" onClick={() => document.getElementById(`file-input-${pod._id}`).click()}>
                  Upload File
                </button>
                <input
                  type="file"
                  id={`file-input-${pod._id}`}
                  style={{ display: 'none' }}
                  onChange={(event) => handleFileUpload(pod._id, event)}
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="pod-list">
            <h2 className="pod-title">History PODs</h2>
            {historyPODs.map((pod) => (
              <div className="pod-item" key={pod._id}>
                <p><strong>LR Number:</strong> {pod.lrNumber}</p>
                <p><strong>Vehicle Number:</strong> {pod.vehicleNumber}</p>
                {pod.documents.map((doc, index) => (
                  <button className="view-button" key={index} onClick={() => openImageModal(doc)}>
                    View Document
                  </button>
                ))}
              </div>
            ))}
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
