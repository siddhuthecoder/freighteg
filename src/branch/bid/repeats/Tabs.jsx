import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Tabs = ({ onDownloadClick }) => {
    const location = useLocation();
    const path = location.pathname.split("/")[2]; // Get the correct part of the path
    const user = useSelector((state) => state.login.user);
    const [counts, setCounts] = useState({
        open: 0,
        result: 0,
        history: 0,
        counter: 0,
        cancelled: 0,
    });
    const dataFetchedRef = useRef(false);
    console.log(path)

    useEffect(() => {
        if (dataFetchedRef.current) {
            return;
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
    
                if (!openRes.ok || !resultRes.ok || !historyRes.ok || !counterRes.ok || !cancelledRes.ok) {
                    throw new Error("Failed to fetch one or more of the resources.");
                }

                const openData = await openRes.json();
                const resultData = await resultRes.json();
                const historyData = await historyRes.json();
                const counterData = await counterRes.json();
                const cancelledData = await cancelledRes.json();
    
                // Update state after fetching all data
                setCounts({
                    open: openData?.totalBids || openData?.length || 0,
                    result: resultData?.totalBids || resultData?.length || 0,
                    history: historyData?.totalBids || historyData?.length || 0,
                    counter: counterData?.total || counterData?.length || 0,
                    cancelled: cancelledData?.total || cancelledData?.length || 0,
                });
    
                dataFetchedRef.current = true; // Ensure data is fetched only once
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, [user?.id]);
    const tabs = [
        { name: "Open", path: "branch/open", count: counts.open },
        { name: "Result", path: "branch/result", count: counts.result },
        { name: "History", path: "branch/history", count: counts.history },
        { name: "Counter", path: "branch/counter", count: counts.counter },
        { name: "Cancelled", path: "branch/cancelled", count: counts.cancelled }
    ];

    console.log(tabs[0].name.toLowerCase())

    return (
        <div className="w-full flex-wrap gap-3 py-1 bg-white flex items-center overflow-x-auto justify-between">
            <div className="mx-2 flex items-center gap-3">
                {tabs.map((tab, index) => {
                    const isActive = path.includes(tab.name.toLowerCase());
                    return (
                        <Link to={`/${tab.path}`}
                            key={index}
                            className={`cursor-pointer text-sm hover:text-[#0662C6] ${isActive ? 'text-[#0662C6] border-b-2 pb-1 border-[#0662C6]' : ''}`}
                        >
                            {tab.name} ({tab.count})
                        </Link>
                    );
                })}
            </div>
            <div className="flex items-center gap-2">
                <div className="flex items-center mx-2">
                    <button 
                        onClick={onDownloadClick} 
                        className="w-12 h-12 flex items-center justify-center border rounded-md border-[#0662C6] hover:bg-[#0662C6] hover:text-white text-[#0662C6]">
                        <FaDownload size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tabs;
