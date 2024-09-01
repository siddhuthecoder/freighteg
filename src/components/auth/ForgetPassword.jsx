import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlinePhone } from 'react-icons/md';

const Modal = ({ isOpen, onClose, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="relative bg-white p-4 md:p-8 rounded-lg shadow-lg w-[90%] max-w-md h-[90vh] max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-3xl"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 md:mb-6 text-[#2D3748]">Terms and Conditions</h2>
        <p className="text-base text-[#4A5568] mb-6 leading-relaxed">
          Disclaimer for Adding Companies/Users on FastagTracking.com
          When adding a company or user to our platform, FastagTracking.com, the following use cases and terms apply:

          <br /><br />

          <strong>Use Cases:</strong>
          <br />
          <strong>Vehicle Owner:</strong> Vehicle owners can track their vehicles using Fastag location data, particularly in situations where the GPS device is absent or has been removed by a thief. This enables them to locate their vehicle based on toll plaza locations.
          <br />
          Vehicle owners can also manage their vehicle documents, monitor expiry dates, and validate driver’s license details to ensure legal compliance for transport operations.
          <br />
          <strong>Broker:</strong> Brokers can monitor vehicles they have hired from the market, gaining visibility into the current location of these vehicles, which is essential for effective logistics coordination.
          <br />
          <strong>Logistics Company:</strong> Logistics companies can use FastagTracking.com to efficiently manage vehicles hired from the market, ensuring they have full control over their operations. This includes tracking real-time locations to optimize delivery routes and prevent delays. Furthermore, logistics companies can verify and manage vehicle documents, ensuring that all necessary paperwork is up-to-date and compliant with regulations. Additionally, they can check driver documentation to confirm that drivers are legally eligible to operate transport vehicles, safeguarding their operations against potential legal issues.
          <br />
          <strong>Manufacturer:</strong> Manufacturers can track their consignments and associated vehicle details, ensuring that goods are transported according to the planned schedule.

          <br /><br />

          <strong>Strict Terms of Use:</strong>
          <br />
          <strong>Prohibition of Misuse:</strong> The misuse of FastagTracking.com for illegal purposes, including but not limited to tracking vehicles without a legitimate reason, is strictly prohibited. Such actions are a violation of the laws of India and will be subject to legal action.
          <br />
          <strong>Legal Compliance:</strong> All users and companies are required to comply with the relevant provisions of the Information Technology Act, 2000, and any other applicable laws in India. FastagTracking.com is committed to upholding the law and will cooperate fully with law enforcement authorities in the event of any illegal activity.
          <br />
          <strong>Company Liability:</strong> FastagTracking.com is not responsible for any illegal tracking conducted by users or companies on the platform. The responsibility for legal compliance rests solely with the user or company performing the tracking.
          <br />
          <strong>Search Logs:</strong> FastagTracking.com maintains comprehensive logs of all vehicle searches conducted by any company or user. In the event you wish to know who has searched for your vehicle, you can request this information by emailing us at qiktrack@gmail.com.

          <br /><br />

          By using FastagTracking.com, you agree to these terms and acknowledge that any misuse of the platform will result in legal consequences.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-200"
          >
            Close
          </button>
          <button
            onClick={onAccept}
            className="py-2 px-4 bg-[#4A90E2] text-white rounded-lg shadow hover:bg-[#357ABD] transition duration-200"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber.length === 10 && !isNaN(phoneNumber)) {
      setIsModalOpen(true); // Open the modal on form submission
    } else {
      alert('Please enter a valid 10-digit phone number.');
    }
  };

  const handleAccept = () => {
    setIsModalOpen(false);
    navigate(`/otp?phone=${phoneNumber}`); // Redirect to OTP page on accepting terms
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex w-[90%] max-w-[400px] mx-auto flex-col">
        <div className="font-bold text-2xl md:text-[40px]">Register Now</div>
        <p className="text-[#71717A] pt-3 md:text-[15px]"> Register now and get 10 Search free of value Rs - 100/-</p>
        <hr className="mx-[100px] my-[15px]" />
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex items-center pl-[10px]">
            <MdOutlinePhone className="text-2xl me-[-36px] z-[1] text-[#71717A]" />
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-[100%] mx-auto bg-[#EAEFFF] rounded-md border ps-[36px] border-[#B5C3FB] h-[50px]"
              placeholder="Phone Number"
            />
          </div>
          <button
            type="submit"
            className="w-full text-center rounded-md text-white  md:text-2xl font-bold bg-[#8098F9] py-2"
          >
            GET OTP
          </button>
          <div className="text-center">
              Already have an account?{' '}
              <span className="text-[#8098F9] font-semibold cursor-pointer" onClick={() => navigate('/')}>
                login 
              </span>
          </div>
        </form>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onAccept={handleAccept} />
    </>
  );
};

export default Register;
