import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Tabs = ({ onDownloadClick }) => {
    const location = useLocation();
    const path = location.pathname.split("/");
    const user = useSelector((state) => state.login.user);
    const [counts, setCounts] = useState({
        open: 0,
        result: 0,
        history: 0,
        counter: 0,
        cancelled: 0,
    });
    // useRef to track if data has been fetched already
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

                // Set the ref to true after data has been fetched
                dataFetchedRef.current = true;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [user?.id]); // Ensure the effect only runs once when the component mounts

    const tabs = [
        { name: "Open", path: "open", count: counts.open },
        { name: "Result", path: "result", count: counts.result },
        { name: "History", path: "history", count: counts.history },
        { name: "Counter", path: "counter", count: counts.counter },
        { name: "Cancelled", path: "cancelled", count: counts.cancelled }
    ];

    return (
        <div className="w-full flex-wrap gap-3 py-1 bg-white flex items-center overflow-x-auto justify-between">
            <div className="mx-2 flex items-center gap-3">
                {tabs.map((tab, index) => {
                    const isActive = path.includes(tab.path);
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
