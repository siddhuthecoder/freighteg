import React, { useState, useEffect } from 'react';

const BidEditForm = ({ bidData, onSubmit }) => {
    // Initialize form state with bidData
    const [formData, setFormData] = useState({
        company_id: '',
        branch_id: '',
        loading_city: '',
        loading_state: '',
        loading_address: '',
        loading_pincode: '',
        unloading_city: '',
        unloading_state: '',
        unloading_address: '',
        unloading_pincode: '',
        route_distance: '',
        vehicle_type: '',
        vehicle_size: '',
        body_type: '',
        quantity: '',
        is_cng: false,
        material_type: '',
        material_weight: '',
        loading_date: '',
        loading_time: '',
        expiry_date: '',
        expiry_time: '',
        target_price: '',
        bid_remarks: '',
        assigned_to: [],
        responded_by: [],
        isActive: true,
    });

    useEffect(() => {
        if (bidData) {
            setFormData({
                company_id: bidData.company_id || '',
                branch_id: bidData.branch_id || '',
                loading_city: bidData.loading_city || '',
                loading_state: bidData.loading_state || '',
                loading_address: bidData.loading_address || '',
                loading_pincode: bidData.loading_pincode || '',
                unloading_city: bidData.unloading_city || '',
                unloading_state: bidData.unloading_state || '',
                unloading_address: bidData.unloading_address || '',
                unloading_pincode: bidData.unloading_pincode || '',
                route_distance: bidData.route_distance || '',
                vehicle_type: bidData.vehicle_type || '',
                vehicle_size: bidData.vehicle_size || '',
                body_type: bidData.body_type || '',
                quantity: bidData.quantity || '',
                is_cng: bidData.is_cng || false,
                material_type: bidData.material_type || '',
                material_weight: bidData.material_weight || '',
                loading_date: bidData.loading_date || '',
                loading_time: bidData.loading_time || '',
                expiry_date: bidData.expiry_date || '',
                expiry_time: bidData.expiry_time || '',
                target_price: bidData.target_price || '',
                bid_remarks: bidData.bid_remarks || '',
                assigned_to: bidData.assigned_to || [],
                responded_by: bidData.responded_by || [],
                isActive: bidData.isActive || true,
            });
        }
    }, [bidData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Company ID:
                <input
                    type="text"
                    name="company_id"
                    value={formData.company_id}
                    onChange={handleChange}
                />
            </label>
            <label>
                Branch ID:
                <input
                    type="text"
                    name="branch_id"
                    value={formData.branch_id}
                    onChange={handleChange}
                />
            </label>
            {/* Add more fields based on the bidData structure */}
            <label>
                Loading City:
                <input
                    type="text"
                    name="loading_city"
                    value={formData.loading_city}
                    onChange={handleChange}
                />
            </label>
            <label>
                Loading State:
                <input
                    type="text"
                    name="loading_state"
                    value={formData.loading_state}
                    onChange={handleChange}
                />
            </label>
            {/* Continue for all other fields */}
            <label>
                Is CNG:
                <input
                    type="checkbox"
                    name="is_cng"
                    checked={formData.is_cng}
                    onChange={handleChange}
                />
            </label>
            <label>
                Target Price:
                <input
                    type="number"
                    name="target_price"
                    value={formData.target_price}
                    onChange={handleChange}
                />
            </label>
            <label>
                Bid Remarks:
                <textarea
                    name="bid_remarks"
                    value={formData.bid_remarks}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Update Bid</button>
        </form>
    );
};

export default BidEditForm;
