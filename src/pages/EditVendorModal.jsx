import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const EditVendorModal = ({ editData, onClose }) => {
  const [selectedItem, setSelectedItem] = useState(null); // For assigned staff
  const [code, setCode] = useState(editData?.code[0] || ""); // Vendor code
  const [assignBranch, setAssignBranch] = useState(""); // Branch assignment
  const [load, setLoad] = useState(false);
  const [branchOptions, setBranchOptions] = useState([]); // Branch options from API
  const [loadingBranches, setLoadingBranches] = useState(true); // Loading state for branches

  const user = useSelector((state) => state.login.user);

  useEffect(() => {
    // Fetch branch data from the API
    const fetchBranchData = async () => {
      try {
        const response = await axios.get(
          `https://freighteg.in/freightapi/getbranches/company/${user.id}`
        );
        const data = response.data;

        // Map the data to the options array
        const options = data.map((branch) => ({
          label: branch.name,
          value: branch._id,
        }));
        setBranchOptions(options);
        setLoadingBranches(false);
      } catch (error) {
        console.error("Error fetching branch data:", error);
        setLoadingBranches(false);
      }
    };

    if (user?.id) {
      fetchBranchData();
    }
  }, [user.id]);

  const handleUpdate = async () => {
    setLoad(true);

    // Validate index
    const idx = 0; // Assuming you are working with the first staff member and code for simplicity.
    if (idx >= 0 && idx < editData?.assigned_staff.length && idx < editData?.code.length) {
      editData.assigned_staff[idx] = selectedItem?.value || editData.assigned_staff[idx];
      editData.code[idx] = code || editData.code[idx];
    } else {
      console.error("Invalid index");
      return;
    }

    let brancharr = [...editData?.branch_id];
    if (assignBranch) {
      const branchindx = 0; // Assuming you are working with the first branch for simplicity.
      if (branchindx !== -1) {
        brancharr[branchindx] = assignBranch;
      } else {
        brancharr.push(assignBranch);
      }
    } else {
      console.error("assignBranch is null or empty");
    }

    try {
      const response = await axios.patch(
        `https://freighteg.in/freightapi/updateVendor/${editData?._id}`,
        {
          assigned_staff: editData?.assigned_staff,
          code: editData?.code,
          branch_id: brancharr,
        }
      );

      if (response?.status === 200) {
        alert("Updated Vendor Successfully!!");
        onClose(); // Close modal
        window.location.reload(); // Refresh vendor data
      } else {
        throw new Error("Something went wrong!!");
      }
    } catch (error) {
      console.log("catch error ", error);
      const errorMessage = error?.response?.data?.message || "Something went wrong!!";
      alert(`Sorry!! ${errorMessage}`);
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Vendor</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
        >
        
          {/* Branch Assignment Dropdown */}
          <label className="block mt-4 mb-2">Assign Branch</label>
         
           {loadingBranches ? (
            <p>Loading branches...</p>
          ) : (
            <select
              value={assignBranch}
              onChange={(e) => setAssignBranch(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            >
              <option value="">Select Branch</option>
              {branchOptions.map((branch) => (
                <option key={branch.value} value={branch.value}>
                  {branch.label}
                </option>
              ))}
            </select>
          )}

          
          {/* Assigned Staff Dropdown */}
          <label className="block mt-4 mb-2">Assigned Staff</label>
          <select
            value={selectedItem?.value || ""}
            onChange={(e) => setSelectedItem({ value: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          >
            <option value="">Select Staff</option>
            <option value="staff1">Staff 1</option>
            <option value="staff2">Staff 2</option>
            {/* Add options based on available staff */}
          </select>

          {/* Vendor Code Input */}
          <label className="block mt-4 mb-2">Vendor Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />

          <div className="flex justify-end mt-4 space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={load}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {load ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVendorModal;
