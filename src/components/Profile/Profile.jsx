import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Navbar from '../Navbar';

const Profile = () => {
  const user = useSelector((state) => state.login.user);
  const userId = user?.id;
  const [companyDetails, setCompanyDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      axios
        .get(`https://freighteg.in/freightapi/get-companies/${userId}`, {
          headers: {
            Authorization: `Bearer your_dummy_access_token`, // Replace with the actual token if needed
          },
        })
        .then((response) => {
          setCompanyDetails(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError('Failed to fetch company details');
          setLoading(false);
        });
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-center mb-4">{companyDetails?.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded">
              <h2 className="text-xl font-semibold">Company Information</h2>
              <p><strong>Company ID:</strong> {companyDetails?._id}</p>
              <p><strong>Address:</strong> {companyDetails?.address}</p>
              <p><strong>Role:</strong> {companyDetails?.role}</p>
              <p><strong>Phone:</strong> {companyDetails?.phone}</p>
              <p><strong>GST:</strong> {companyDetails?.GST}</p>
              <p><strong>PAN:</strong> {companyDetails?.PAN}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded">
              <h2 className="text-xl font-semibold">Account Information</h2>
              <p><strong>Password Hash:</strong> {companyDetails?.password}</p>
              <p><strong>Is Active:</strong> {companyDetails?.isActive ? 'Yes' : 'No'}</p>
              <p><strong>Is Deleted:</strong> {companyDetails?.isDeleted ? 'Yes' : 'No'}</p>
              <p><strong>Created At:</strong> {new Date(companyDetails?.createdAt).toLocaleString()}</p>
              <p><strong>Updated At:</strong> {new Date(companyDetails?.updatedAt).toLocaleString()}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-blue-50 p-4 rounded">
              <h2 className="text-xl font-semibold">Additional Settings</h2>
              <p><strong>Allow Auto Bid:</strong> {companyDetails?.allowAutoBid ? 'Enabled' : 'Disabled'}</p>
              <p><strong>Auto Assign:</strong> {companyDetails?.auto_assign ? 'Enabled' : 'Disabled'}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded">
              <h2 className="text-xl font-semibold">Authentication Details</h2>
              <p><strong>Login Token:</strong> {companyDetails?.login_token}</p>
              <p><strong>OTP:</strong> {companyDetails?.otp}</p>
              <p><strong>OTP Expiry:</strong> {new Date(companyDetails?.otpExpiry).toLocaleString()}</p>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded mt-4">
            <h2 className="text-xl font-semibold">Bidding Information</h2>
            <p><strong>Bids Used:</strong> {companyDetails?.bidsUsed}</p>
            <p><strong>Max Bids Allowed:</strong> {companyDetails?.maxBid}</p>
            <p><strong>Subscription Plan:</strong> {companyDetails?.subscriptionPlan}</p>
            <p><strong>Subscription Expiry:</strong> {new Date(companyDetails?.subscriptionExpiryDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
