import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import DashProfile from "../components/DashProfile";
import DashSideBar from "../components/DashSideBar";
export default function Dashboard() {
    const location = useLocation();
    const [tab , setTap] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFormUrl = urlParams.get("tab");
        if (tabFormUrl) {
            setTap(tabFormUrl);
        }
    }) , [location.search];
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
        <div className="md:w-56">
            {/* sideBar */}
            <DashSideBar />
        </div>
        {/* Profile  */}
        {tab === 'profile ' && <DashProfile />}
        </div>
    )
}
