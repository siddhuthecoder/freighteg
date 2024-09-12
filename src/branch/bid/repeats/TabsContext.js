import React, { createContext, useState, useEffect, useRef, useContext } from 'react';
import { useSelector } from 'react-redux';

// Create the context
const CountsContext = createContext();

// Custom hook to access the context
export const useCounts = () => {
    return useContext(CountsContext);
};

// Provider component
export const CountsProvider = ({ children }) => {
    const [counts, setCounts] = useState({
        open: 0,
        result: 0,
        history: 0,
        counter: 0,
        cancelled: 0,
    });

    const user = useSelector((state) => state.login.user);
    const dataFetchedRef = useRef(false);

    useEffect(() => {
        if (dataFetchedRef.current) {
            return;
        }
    
        const company_id = user?.id;
    
        const fetchData = async () => {
            try {
                const [openRes, resultRes, historyRes, counterRes, cancelledRes] = await Promise.all([
                    fetch(`https://freighteg.in/freightapi/liveBids?branch_id=${company_id}`),
                    fetch(`https://freighteg.in/freightapi/getBidResults?branch_id=${company_id}`),
                    fetch(`https://freighteg.in/freightapi/getBidResultHistory?branch_id=${company_id}`),
                    fetch(`https://freighteg.in/freightapi/counters?branch_id=${company_id}`),
                    fetch(`https://freighteg.in/freightapi/cancelledBids?branch_id=${company_id}`)
                ]);
    
                if (!openRes.ok || !resultRes.ok || !historyRes.ok || !counterRes.ok || !cancelledRes.ok) {
                    throw new Error("Failed to fetch one or more of the resources.");
                }
    
                const openData = await openRes.json();
                const resultData = await resultRes.json();
                const historyData = await historyRes.json();
                const counterData = await counterRes.json();
                const cancelledData = await cancelledRes.json();
    
                setCounts({
                    open: openData?.totalBids || openData?.length || 0,
                    result: resultData?.totalBids || resultData?.length || 0,
                    history: historyData?.totalBids || historyData?.length || 0,
                    counter: counterData?.total || counterData?.length || 0,
                    cancelled: cancelledData?.total || cancelledData?.length || 0,
                });
    
                dataFetchedRef.current = true;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, [user?.id]);

    return (
        <CountsContext.Provider value={counts}>
            {children}
        </CountsContext.Provider>
    );
};
