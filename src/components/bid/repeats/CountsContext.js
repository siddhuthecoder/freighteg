import React, { createContext, useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

// Create the context
export const CountsContext = createContext();

export const CountsProvider = ({ children }) => {
  const user = useSelector((state) => state.login.user);
  const [counts, setCounts] = useState({
    open: 0,
    result: 0,
    history: 0,
    counter: 0,
    cancelled: 0,
    Branch_open: 0,
    Branch_result: 0,
    Branch_history: 0,
    Branch_counter: 0,
    Branch_cancelled: 0,
  });
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) {
      return; // If data has been fetched already, do nothing
    }

    const company_id = user?.id;

    const fetchData = async () => {
      try {
        const [
          openRes, resultRes, historyRes, counterRes, cancelledRes,
          openRes_branch, resultRes_branch, historyRes_branch, counterRes_branch, cancelledRes_branch
        ] = await Promise.all([
          fetch(`https://freighteg.in/freightapi/liveBids?company_id=${company_id}`),
          fetch(`https://freighteg.in/freightapi/getBidResults?company_id=${company_id}`),
          fetch(`https://freighteg.in/freightapi/getBidResultHistory?company_id=${company_id}`),
          fetch(`https://freighteg.in/freightapi/counters?company_id=${company_id}`),
          fetch(`https://freighteg.in/freightapi/cancelledBids?company_id=${company_id}`),
          fetch(`https://freighteg.in/freightapi/liveBids?branch_id=${company_id}`),
          fetch(`https://freighteg.in/freightapi/getBidResults?branch_id=${company_id}`),
          fetch(`https://freighteg.in/freightapi/getBidResultHistory?branch_id=${company_id}`),
          fetch(`https://freighteg.in/freightapi/counters?branch_id=${company_id}`),
          fetch(`https://freighteg.in/freightapi/cancelledBids?branch_id=${company_id}`)
        ]);

        const openData = await openRes.json();
        const resultData = await resultRes.json();
        const historyData = await historyRes.json();
        const counterData = await counterRes.json();
        const cancelledData = await cancelledRes.json();
        
        const branch_openData = await openRes_branch.json();
        const branch_resultData = await resultRes_branch.json();
        const branch_historyData = await historyRes_branch.json();
        const branch_counterData = await counterRes_branch.json();
        const branch_cancelledData = await cancelledRes_branch.json();

        // Update counts, safely checking for both totalBids and array length
        setCounts({
          open: openData.totalBids || 0,
          result: resultData.totalBids || 0,
          history: historyData.totalBids || 0,
          counter: counterData.total || 0,
          cancelled: cancelledData.total || 0,
          Branch_open: branch_openData.totalBids ?? (Array.isArray(branch_openData) ? branch_openData.length : 0),
          Branch_result: branch_resultData.totalBids ?? (Array.isArray(branch_resultData) ? branch_resultData.length : 0),
          Branch_history: branch_historyData.totalBids ?? (Array.isArray(branch_historyData) ? branch_historyData.length : 0),
          Branch_counter: branch_counterData.total ?? (Array.isArray(branch_counterData) ? branch_counterData.length : 0),
          Branch_cancelled: branch_cancelledData.total ?? (Array.isArray(branch_cancelledData) ? branch_cancelledData.length : 0),
        });

        dataFetchedRef.current = true;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); 

  return (
    <CountsContext.Provider value={{ counts }}>
      {children}
    </CountsContext.Provider>
  );
};

