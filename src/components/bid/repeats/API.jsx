const fetchLiveBids = async (userId) => {
    if (!userId) {
      throw new Error("User ID is not available");
    }
  
    const response = await fetch(`${liveBid}/${userId}`);
    if (!response.ok) {
      throw new Error("Error fetching live data");
    }
    return response.json();
  };
  
  const fetchBidById = async (bidId) => {
    if (!bidId) {
      throw new Error("Bid ID is not available");
    }
  
    const response = await fetch(`${getBidData}/${bidId}`);
    if (!response.ok) {
      throw new Error(`Error fetching bid ${bidId}`);
    }
    return response.json();
  };
  
  const fetchUserById = async (userId) => {
    if (!userId) {
      throw new Error("User ID is not available");
    }
    const response = await fetch(`${userData}/${userId}`);
    if (!response.ok) {
      throw new Error(`Error fetching user ${userId}`);
    }
    return response.json();
  };
  
  const fetchVendorById = async (vendorId) => {
    if (!vendorId) {
      throw new Error("User ID is not available");
    }
    const response = await fetch(`${getVendorData}/${vendorId}`);
    if (!response.ok) {
      throw new Error(`Error fetching user ${vendorId}`);
    }
    return response.json();
  };