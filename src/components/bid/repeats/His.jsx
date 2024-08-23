import React,{useState,useEffect} from 'react'
import useFetchHistoryData from "./Datafile"; // Import the hook


const His = () => {
    const {
        HistoryBidData,
        bidDetails,
        bidDetailsLoading,
        bidDetailsError,
        userData,
      } = useFetchHistoryData();

      const [allBidCount, setAllBidCount] = useState(0);
      useEffect(() => {
        if (Array.isArray(HistoryBidData)) {
          const bidIds = HistoryBidData.map((bid) => bid.bid_id) || [];
          setAllBidCount(bidIds.length);
        }
      }, [HistoryBidData]);
    
      if (bidDetailsLoading) {
        return <div>Loading...</div>;
      }
    
      if (bidDetailsError) {
        return <div>Error: {bidDetailsError.message}</div>;
      }
      console.log(bidDetails)
  return (
    <div>
      
    </div>
  )
}

export default His
