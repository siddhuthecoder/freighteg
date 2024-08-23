import { useState, useEffect } from "react";
import {
  useHistoryData,
  useVendorById,
  useGetVendorByCompany,
} from "../../../HelperFunction/api";

const useHistoryDataFetcher = () => {
  // Fetch data using custom hooks
  const { vendorData } = useVendorById();
  const { getVendorData } = useGetVendorByCompany();
  const {
    HistoryBidData,    // Data from history API
    bidDetails,        // Detailed bid data
    bidDetailsLoading, // Loading state for bid details
    bidDetailsError,   // Error state for bid details
    userData,          // User data associated with bids
  } = useHistoryData();

  const [allBidCount, setAllBidCount] = useState(0);

  useEffect(() => {
    if (HistoryBidData) {
      const bidIds = HistoryBidData?.map((bid) => bid.bid_id) || [];
      if (bidIds) {
        setAllBidCount(bidIds.length); // Set the count of bids
      }
    }
  }, [HistoryBidData]);

  return {
    vendorData,
    getVendorData,
    HistoryBidData,
    bidDetails,
    bidDetailsLoading,
    bidDetailsError,
    userData,
    allBidCount,
  };
};

export default useHistoryDataFetcher;
