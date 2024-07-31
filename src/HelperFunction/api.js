import { useQuery, useMutation, useQueries } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;
const liveBid = `${baseURL}/liveBids`;
const getBidData = `${baseURL}/bids`;
const userData = `${baseURL}/freightusers`;
const getVendorData = `${baseURL}/vendor`;
const vendorURL = `${baseURL}/getBidsByUserOrCompany`;
const assignStaff = `${baseURL}/transporters`;
const getVendor = `${baseURL}/getVendorsBy`;
const createPod = `${baseURL}/pod`;
const createUser = `${baseURL}/freightuser`;
const createVendor = `${baseURL}/addvendor`;
const getParticularVendor = `${baseURL}/vendor`;
const getAllVendors = `${baseURL}/getAllVendors`;
const walletBalance = `${baseURL}/freightWalletBalance`;
const updateVendor = `${baseURL}/updateVendor`;
const getPod = `${baseURL}/pod`;
const getPanData = `${baseURL}/vendor/pan`;
const getUser = `${baseURL}/freightuser`;
const updateUser = `${baseURL}/update-user`;
const counter = `${baseURL}/counter`;
const assign = `${baseURL}/assignBid`;
const result = `${baseURL}/getBidResults`;
const history = `${baseURL}/getBidResultHistory`;
const StateURL = "https://countriesnow.space/api/v0.1/countries/state/cities/q";
const createBid = `${baseURL}/addBid`;
const updatePOD = `${baseURL}/pod`;
const historyPOD = `${baseURL}/pods/history`;
const deleteuser = `${baseURL}/delete-user`;
const activeBidsURL = `${baseURL}/activeBids`;

// Fetch Active Bids by assigned_to
const fetchActiveBids = async (assigned_to) => {
  if (!assigned_to) {
    throw new Error("Assigned To parameter is not available");
  }

  const response = await axios.get(`${activeBidsURL}/${assigned_to}`);
  if (response.status !== 200) {
    throw new Error(`Error fetching active bids: ${response.statusText}`);
  }
  return response.data;
};

export const useActiveBids = (assigned_to) => {
  const {
    data: activeBidsData,
    isLoading: activeBidsLoading,
    isError: activeBidsError,
    error: activeBidsFetchError,
    refetch: refetchActiveBids,
  } = useQuery({
    queryKey: ["activeBids", assigned_to],
    queryFn: () => fetchActiveBids(assigned_to),
    enabled: !!assigned_to,
  });

  return {
    activeBidsData,
    activeBidsLoading,
    activeBidsError,
    activeBidsFetchError,
    refetchActiveBids,
  };
};

// Get Vendor Api By Componay Id
export const useVendorById = () => {
  const user = useSelector((state) => state.login.user);

  const {
    data: vendorData,
    isLoading: vendorLoading,
    isError: vendorError,
    error,
  } = useQuery({
    queryKey: ["vendor", user?.id],
    queryFn: async () => {
      if (!user?.id) {
        throw new Error("User ID is not available");
      }

      try {
        const response = await fetch(`${vendorURL}?company_id=${user?.id}`);
        if (!response.ok) {
          throw new Error("Error fetching vendor data");
        }
        return response.json();
      } catch (err) {
        throw new Error(err.message || "An unknown error occurred");
      }
    },
    enabled: !!user?.id,
  });

  return { vendorData, vendorLoading, vendorError, error };
};

// get AssignStaff Api

export const useAssignStaff = (assignId) => {
  const {
    data: assignStaffData,
    isLoading: assignStaffLoading,
    isError: assignStaffError,
  } = useQuery({
    queryKey: ["AssignStaff", assignId],
    queryFn: async () => {
      if (!assignId) {
        throw new Error("Assign ID is not available");
      }
      try {
        const response = await fetch(`${assignStaff}/${assignId}/bids`);
        if (!response.ok) {
          throw new Error("Error fetching vendor data");
        }
        return response.json();
      } catch (err) {
        throw new Error(err.message || "An unknown error occurred");
      }
    },
    enabled: !!assignId,
  });
  return { assignStaffData, assignStaffLoading, assignStaffError };
};

// get vendor data from company id

export const useGetVendorByCompany = () => {
  const user = useSelector((state) => state.login.user);
  const {
    data: getVendorData,
    isLoading: getVendorLoading,
    isError: getVendorError,
  } = useQuery({
    queryKey: ["getVendorData", user?.id],
    queryFn: async () => {
      if (!user?.id) {
        throw new Error("User ID is not available");
      }
      try {
        const response = await fetch(`${getVendor}/${user?.id}`);
        if (!response.ok) {
          throw new Error("Error fetching vendor data");
        }
        return response.json();
      } catch (err) {
        throw new Error(err.message || "An unknown error occurred");
      }
    },
    enabled: !!user?.id,
  });
  return { getVendorData, getVendorLoading, getVendorError };
};

// get live bid ,bid data ,user data by id

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

export const useBidData = () => {
  const user = useSelector((state) => state.login.user);

  const { data: liveBidData } = useQuery({
    queryKey: ["liveBid", user?.id],
    queryFn: () => fetchLiveBids(user?.id),
    enabled: !!user?.id,
  });

  const bidIds = liveBidData?.data?.map((bid) => bid.bid_id) || [];
  const vendorIds = [
    ...new Set(
      liveBidData?.data.flatMap((bid) =>
        bid.bidding_response.flatMap((response) => response.vendor_id)
      )
    ),
  ];
  const {
    data: bidDetails,
    isLoading: bidDetailsLoading,
    isError: bidDetailsError,
    error: bidDetailsFetchError,
  } = useQuery({
    queryKey: ["Bid"],
    queryFn: async () => {
      const bidDataPromises = bidIds.map((bidId) => fetchBidById(bidId));
      return Promise.all(bidDataPromises);
    },
    enabled: bidIds.length > 0,
  });

  const userIds = bidDetails?.map((bid) => bid.created_by) || [];

  const { data: userData } = useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const userDataPromises = userIds.map((userId) => fetchUserById(userId));
      return Promise.all(userDataPromises);
    },
    enabled: userIds.length > 0,
  });

  const { data: vendorDetail } = useQuery({
    queryKey: ["vendor"],
    queryFn: async () => {
      const vendorDataPromises = vendorIds.map((vendorIds) =>
        fetchVendorById(vendorIds)
      );
      return Promise.all(vendorDataPromises);
    },
    enabled: vendorIds.length > 0,
  });
  // console.log("vendorDetail", vendorDetail);

  return {
    liveBidData,
    bidDetails,
    bidDetailsLoading,
    bidDetailsError,
    bidDetailsFetchError,
    userData,
    vendorDetail,
  };
};

// get vendor by vendor id
const fetchVendorData = async (vendorId) => {
  const { data } = await axios.get(`${getVendorData}/${vendorId}`);
  return data;
};

export const useTransporterData = (transporterIds) => {
  const {
    data: transporterData,
    isLoading: transporterLoading,
    error: transporterError,
  } = useQuery({
    queryKey: ["vendorData", transporterIds],
    queryFn: async () => {
      const transporterDataPromises = transporterIds.map((transporterId) =>
        fetchVendorData(transporterId)
      );
      const results = await Promise.all(transporterDataPromises);
      return results;
    },
  });
  // console.log(transporterData);
  return { transporterData, transporterLoading, transporterError };
};

// result aalag
// Create a pod API

export const postDataMutation = async (newData) => {
  // console.log("Post data:", newData);
  try {
    const response = await axios.post(`${createPod}`, newData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "An error occurred while posting data"
    );
  }
};

// Get a POD by company id

export const useGetPodByCompany = () => {
  const user = useSelector((state) => state.login.user);

  const {
    data: getPodData = [], // Default to an empty array
    isLoading: getPodLoading,
    isError: getPodError,
    refetch: refetchPodData,
  } = useQuery({
    queryKey: ["getPodData", user?.id],
    queryFn: async () => {
      if (!user?.id) {
        throw new Error("User ID is not available");
      }
      try {
        const response = await fetch(`${getPod}/${user?.id}`);
        if (!response.ok) {
          throw new Error("Error fetching POD data");
        }
        return response.json();
      } catch (err) {
        throw new Error(err.message || "An unknown error occurred in POD");
      }
    },
    enabled: !!user?.id,
  });

  const vendor_ids = getPodData?.map((pod) => pod.vendor_id) || [];

  const { data: vendorData = [], refetch: refetchVendorData } = useQuery({
    queryKey: ["vendorData", vendor_ids],
    queryFn: async () => {
      const vendorDataPromises = vendor_ids?.map((vendorId) =>
        fetchVendorById(vendorId)
      );
      return Promise.all(vendorDataPromises);
    },
    enabled: vendor_ids.length > 0,
  });

  // Define a combined refetch function
  const refetchAll = async () => {
    await refetchPodData();
    await refetchVendorData();
  };

  return { getPodData, getPodLoading, getPodError, vendorData, refetchAll };
};

// GEt a POD HIstory by company id
export const useGetPodHistoryByCompany = () => {
  const user = useSelector((state) => state.login.user);
  const {
    data: getPodHistory = [],
    isLoading: getPodHistoryLoading,
    isError: getPodHistoryError,
    refetch: refetchHistoryPodData,
  } = useQuery({
    queryKey: ["getPodHistoryData", user?.id],
    queryFn: async () => {
      if (!user?.id) {
        throw new Error("User ID is not available");
      }
      try {
        const response = await fetch(`${historyPOD}/${user?.id}`);
        if (!response.ok) {
          throw new Error("Error fetching POD data");
        }
        return response.json();
      } catch (err) {
        throw new Error(err.message || "An unknown error occurred in POD");
      }
    },
    enabled: !!user?.id,
  });

  // const vendor_ids = getPodData?.map((pod) => pod.vendor_id) || [];

  // const { data: vendorData = [], refetch: refetchVendorData } = useQuery({
  //   queryKey: ["vendorData", vendor_ids],
  //   queryFn: async () => {
  //     const vendorDataPromises = vendor_ids?.map((vendorId) =>
  //       fetchVendorById(vendorId)
  //     );
  //     return Promise.all(vendorDataPromises);
  //   },
  //   enabled: vendor_ids.length > 0,
  // });

  // // Define a combined refetch function
  // const refetchAll = async () => {
  //   await refetchPodData();
  //   await refetchVendorData();
  // };

  return {
    getPodHistory,
    getPodHistoryLoading,
    getPodHistoryError,
    refetchHistoryPodData,
  };
};

// Create User Api

export const UserDataMutation = async (newData) => {
  // console.log("Post data:", newData);
  try {
    const response = await axios.post(`${createUser}`, newData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "An error occurred while posting data"
    );
  }
};

// Create Vendor API

export const VendorDataMutation = async (newData) => {
  // console.log("VendorDataMutation", newData);
  try {
    const response = await axios.post(`${createVendor}`, newData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "An error occurred while posting data"
    );
  }
};

// Update Vendor Api

export const updateVendorData = async ({ id, newData }) => {
  // console.log("updateVendordata", newData, id);
  try {
    const response = await axios.patch(`${updateVendor}/${id}`, newData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "An error occurred while posting data"
    );
  }
};

// Get All Vendors

export const useGetAllVendor = () => {
  const user = useSelector((state) => state.login.user);
  const {
    data: getAllVendor,
    isLoading: getAllVendorLoading,
    isError: getAllVendorError,
  } = useQuery({
    queryKey: ["getVendorData"],
    queryFn: async () => {
      const response = await fetch(getAllVendors);
      if (!response.ok) {
        throw new Error(`Error fetching vendor data: ${response.statusText}`);
      }
      return response.json();
    },
    enabled: !!user?.id,
  });

  const getVendorById = (_id) => {
    if (!getAllVendor) {
      return null;
    }
    const data = getAllVendor.find((vendor) => vendor._id === _id);
    return data;
  };

  return {
    getAllVendor,
    getAllVendorLoading,
    getAllVendorError,
    getVendorById,
  };
};

// Get Vendors by vendor_id
export const useGetVendor = (assignId) => {
  const {
    data: singleVendorData,
    isLoading: singleVendorLoading,
    isError: singleVendorError,
  } = useQuery({
    queryKey: ["getSingleVendor", assignId],
    queryFn: async () => {
      if (!assignId) {
        throw new Error("Assign ID is not available");
      }
      try {
        const response = await fetch(`${getParticularVendor}/${assignId}`);
        if (!response.ok) {
          throw new Error("Error fetching vendor data");
        }
        return response.json();
      } catch (err) {
        throw new Error(err.message || "An unknown error occurred");
      }
    },
    enabled: !!assignId,
  });
  return { singleVendorData, singleVendorLoading, singleVendorError };
};

// Get wallet balance

export const useGetBalance = () => {
  const user = useSelector((state) => state.login.user);

  const {
    data: getBalance,
    isLoading: getBalanceLoading,
    isError: getBalanceError,
  } = useQuery({
    queryKey: ["getWalletBalance", user?.id],
    queryFn: async () => {
      if (!user?.id) {
        throw new Error("User ID is not available");
      }

      try {
        const response = await fetch(`${walletBalance}/${user?.id}`);
        if (!response.ok) {
          throw new Error("Error fetching wallet data");
        }
        return response.json();
      } catch (err) {
        throw new Error(err.message || "An unknown error occurred");
      }
    },
    enabled: !!user?.id,
  });
  return { getBalance, getBalanceLoading, getBalanceError };
};

// Get Pan Data by pan_number

export const usePanData = (assignPan) => {
  // console.log(assignPan);
  const {
    data: panData,
    isLoading: panDataLoading,
    isError: panDataError,
  } = useQuery({
    queryKey: ["getPanData", assignPan],
    queryFn: async () => {
      if (!assignPan) {
        throw new Error("Pan Number is not available");
      }
      try {
        const response = await fetch(`${getPanData}/${assignPan}`);
        if (!response.ok) {
          throw new Error("Error fetching pan data");
        }
        return response.json();
      } catch (error) {
        throw new Error(error.message || "An unknown error occurred");
      }
    },
    enabled: !!assignPan,
  });
  return { panData, panDataLoading, panDataError };
};

// Get User Data by companyId

export const useUserById = () => {
  const user = useSelector((state) => state.login.user);

  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["usersData", user?.id],
    queryFn: async () => {
      if (!user?.id) {
        throw new Error("User ID is not available");
      }

      try {
        const response = await fetch(`${getUser}/${user?.id}`);
        if (!response.ok) {
          throw new Error("Error fetching data data");
        }
        return response.json();
      } catch (err) {
        throw new Error(err.message || "An unknown error occurred");
      }
    },
    enabled: !!user?.id,
  });

  return { usersData, usersLoading, usersError, error, refetch };
};

// Update User by Id

export const updateUserData = async ({ id, newData }) => {
  // console.log("Post data", newData, id);
  try {
    const response = await axios.put(`${updateUser}/${id}`, newData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "An error occurred while posting data"
    );
  }
};

// assign bid to vendor id
export const AssignMutation = async (newData) => {
  // console.log("assignMutation data:", newData);
  try {
    const response = await axios.post(`${assign}`, newData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "An error occurred while posting data"
    );
  }
};

// counter price for bid
export const CounterMutation = async (newData) => {
  // console.log("counterMutation data:", newData);
  try {
    const response = await axios.post(`${counter}`, newData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "An error occurred while posting data"
    );
  }
};

// result bid to vendor id
const fetchResultBid = async (resultId) => {
  if (!resultId) {
    throw new Error("Result is not available");
  }
  const response = await fetch(`${result}?company_id=${resultId}`);
  if (!response.ok) {
    throw new Error("Error Failed to fetch result");
  }
  return response.json();
};
export const useResultData = () => {
  const user = useSelector((state) => state.login.user);
  const { data: resultBidData } = useQuery({
    queryKey: ["result", user?.id],
    queryFn: () => fetchResultBid(user?.id),
    enabled: !!user?.id,
  });
  const bidIds = resultBidData?.map((bid) => bid.bid_id) || [];
  const {
    data: bidDetails,
    isLoading: bidDetailsLoading,
    isError: bidDetailsError,
    error: bidDetailsFetchError,
  } = useQuery({
    queryKey: ["ResultBid"],
    queryFn: async () => {
      const bidDataPromises = bidIds.map((bidId) => fetchBidById(bidId));
      return Promise.all(bidDataPromises);
    },
    enabled: bidIds.length > 0,
  });
  const userIds = bidDetails?.map((bid) => bid.created_by) || [];
  const { data: userData } = useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const userDataPromises = userIds.map((userId) => fetchUserById(userId));
      return Promise.all(userDataPromises);
    },
    enabled: userIds.length > 0,
  });
  const vendorIds = [
    ...new Set(resultBidData?.map((bid) => bid.vendor_id) || []),
  ];
  const { data: vendorDetail } = useQuery({
    queryKey: ["vendor"],
    queryFn: async () => {
      const vendorDataPromises = vendorIds.map((vendorIds) =>
        fetchVendorById(vendorIds)
      );
      return Promise.all(vendorDataPromises);
    },
    enabled: vendorIds.length > 0,
  });
  return {
    resultBidData,
    bidDetails,
    bidDetailsLoading,
    bidDetailsError,
    bidDetailsFetchError,
    userData,
    vendorDetail,
  };
};

// History bid to vendor id
const fetchHistoryBid = async (historyId) => {
  if (!historyId) {
    throw new Error("Result is not available");
  }
  const response = await fetch(`${history}?company_id=${historyId}`);
  if (!response.ok) {
    throw new Error("Error Failed to fetch result");
  }
  return response.json();
};
export const useHistoryData = () => {
  const user = useSelector((state) => state.login.user);
  const { data: HistoryBidData } = useQuery({
    queryKey: ["History", user?.id],
    queryFn: () => fetchHistoryBid(user?.id),
    enabled: !!user?.id,
  });
  const bidIds = HistoryBidData?.map((bid) => bid.bid_id) || [];
  const {
    data: bidDetails,
    isLoading: bidDetailsLoading,
    isError: bidDetailsError,
    error: bidDetailsFetchError,
  } = useQuery({
    queryKey: ["HistoryBid"],
    queryFn: async () => {
      const bidDataPromises = bidIds.map((bidId) => fetchBidById(bidId));
      return Promise.all(bidDataPromises);
    },
    enabled: bidIds.length > 0,
  });
  const userIds = bidDetails?.map((bid) => bid.created_by) || [];
  const { data: userData } = useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const userDataPromises = userIds.map((userId) => fetchUserById(userId));
      return Promise.all(userDataPromises);
    },
    enabled: userIds.length > 0,
  });
  const vendorIds = [
    ...new Set(HistoryBidData?.map((bid) => bid.vendor_id) || []),
  ];
  const { data: vendorDetail } = useQuery({
    queryKey: ["vendor"],
    queryFn: async () => {
      const vendorDataPromises = vendorIds.map((vendorIds) =>
        fetchVendorById(vendorIds)
      );
      return Promise.all(vendorDataPromises);
    },
    enabled: vendorIds.length > 0,
  });
  return {
    HistoryBidData,
    bidDetails,
    bidDetailsLoading,
    bidDetailsError,
    bidDetailsFetchError,
    userData,
    vendorDetail,
  };
};
// Fetch the Cities using State name
export const fetchCitiesByState = async (state) => {
  try {
    const response = await axios.get(StateURL, {
      params: {
        country: "India",
        state: state,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};

// Create a bid
export const useCreatedBid = async (bidData) => {
  // console.log("bidData", bidData);
  try {
    const response = await axios.post(`${createBid}`, bidData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "An error occurred while posting data"
    );
  }
};

// update the POD
export const updatePODdata = async ({ id, data }) => {
  // console.log("data", id, data);
  try {
    const response = await axios.patch(`${updatePOD}/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "An error occurred while posting data"
    );
  }
};

// Function to delete a user
export const deleteUser = async (id) => {
  const response = await axios.delete(`${deleteuser}/${id}`);
  return response.data;
};
