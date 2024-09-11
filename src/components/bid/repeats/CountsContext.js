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
  });
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) {
      return; // If data has been fetched already, do nothing
    }

    const company_id = user?.id;

    const fetchData = async () => {
      try {
        const [openRes, resultRes, historyRes, counterRes, cancelledRes] = await Promise.all([
          fetch(`https://freighteg.in/freightapi/liveBids?company_id=${company_id}`),
          fetch(`https://freighteg.in/freightapi/getBidResults?company_id=${company_id}`),
          fetch(`https://freighteg.in/freightapi/getBidResultHistory?company_id=${company_id}`),
          fetch(`https://freighteg.in/freightapi/counters?company_id=${company_id}`),
          fetch(`https://freighteg.in/freightapi/cancelledBids?company_id=${company_id}`)
        ]);

        const openData = await openRes.json();
        const resultData = await resultRes.json();
        const historyData = await historyRes.json();
        const counterData = await counterRes.json();
        const cancelledData = await cancelledRes.json();

        setCounts({
          open: openData.totalBids || 0,
          result: resultData.totalBids,
          history: historyData.totalBids,
          counter: counterData.total,
          cancelled: cancelledData.total,
        });

        dataFetchedRef.current = true;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user?.id]);

  return (
    // Provide the counts and setCounts to all child components
    <CountsContext.Provider value={{ counts }}>
      {children}
    </CountsContext.Provider>
  );
};
