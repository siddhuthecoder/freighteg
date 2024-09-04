import React, { useEffect, useState } from 'react';
import TransportNavBar from '../TransportNavBar';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Companies = () => {
  const user = useSelector((state) => state.login.user);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const companyDetails = await Promise.all(
          user.company_id.map(async (companyId) => {
            const response = await axios.get(`https://freighteg.in/freightapi/get-companies/${companyId}`);
            return response.data;
          })
        );
        setCompanies(companyDetails);
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    };

    if (user.company_id) {
      fetchCompanyDetails();
    }
  }, [user.company_id]);

  return (
    <>
      <TransportNavBar />
      <div className="container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Company Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div key={company._id} className="bg-white shadow-lg rounded-lg p-6 transition transform hover:-translate-y-2 hover:shadow-xl">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">{company.name}</h2>
              <p className="text-gray-700"><strong>Address:</strong> {company.address}</p>
              <p className="text-gray-700"><strong>Phone:</strong> {company.phone}</p>
              <p className="text-gray-700"><strong>GST:</strong> {company.GST}</p>
              <p className="text-gray-700"><strong>PAN:</strong> {company.PAN}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Companies;
