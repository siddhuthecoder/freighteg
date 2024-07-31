import React from 'react';
import { IoIosShareAlt } from 'react-icons/io';

const ShareDetails = ({ company }) => {
    const shareUrl = window.location.href;
    const title = company.company_id.name;

    const handleShare = (url, title) => {
        const subject = "Check out this company and their shipment details!";
        const body = `Hey there!
        
I found this interesting company called "${title}". Here are the details of their latest shipment:

Company Name: ${company.company_id.name}
Loading City: ${company.loading_city}, ${company.loading_state}
Loading Address: ${company.loading_address}, Pincode: ${company.loading_pincode}
Unloading City: ${company.unloading_city}, ${company.unloading_state}
Unloading Address: ${company.unloading_address}, Pincode: ${company.unloading_pincode}
Route Distance: ${company.route_distance} km
Vehicle Type: ${company.vehicle_type}
Vehicle Size: ${company.vehicle_size}
Body Type: ${company.body_type}
Quantity: ${company.quantity} vehicle
Is CNG: ${company.is_cng ? "Yes" : "No"}
Material Type: ${company.material_type}
Material Weight: ${company.material_weight} kg
Loading Date and Time: ${new Date(company.loading_date).toLocaleDateString()} at ${company.loading_time}
Target Price: ${company.target_price}
Remarks: ${company.bid_remarks}

You can find more details and contact them here: ${url}`;

        const mailToUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailToUrl;
    };

    return (
        <div className="flex flex-row">
            <IoIosShareAlt className="mt-2" style={{ color: "#113870", cursor: "pointer" }} />
            <h2 style={{ color: "#113870", cursor: "pointer" }} className="font-semibold font-nunito ml-3 mt-1" onClick={() => handleShare(shareUrl, title)}>Share</h2>
        </div>
    );
};

export default ShareDetails;