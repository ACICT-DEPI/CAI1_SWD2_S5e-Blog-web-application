import { Sidebar } from "flowbite-react";
import {HiUser , HiArrowSmRight} from 'react-icons/hi';
import { useEffect, useState  } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom"
import { signoutSuccess } from "../redux/user/userSlice";
export default function DashSideBar(){
    const location = useLocation();
    const [tab , setTap] = useState('');
    const dispatch = useDispatch();
    const handleSignOut = async () => {
        try {
            const res = await fetch(`/api/user/signout/`,{
                method: "POST",
            });
            const data = await res.json();
            if(!res.ok) {
                console.error(data.message);
            }else{
                dispatch(signoutSuccess());
            }
        } catch (error){
            console.error(error.message);
        }
    };
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFormUrl = urlParams.get("tab");
        if (tabFormUrl) {
            setTap(tabFormUrl);
        }
    }) , [location.search];
    return (
        <Sidebar className="w-full md:w-56">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item active={tab ==='profile'} icon={HiUser} label={'user'} labelColor ='blue' as="div">
                        Profile
                    </Sidebar.Item>
                    </Link>
                    <Sidebar.Item icon={HiArrowSmRight} onClick={handleSignOut} className='cursor-pointer'>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};