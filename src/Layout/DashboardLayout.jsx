import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardMenu from '../Components/Common/DashboardMenu/DashboardMenu';
import DashboardNav from '../Components/Common/DashboardMenu/DashboardNav';

const DashboardLayout = () => {
    const [responsiveNav, setResponsiveNav] = useState(false);
    console.log(responsiveNav)
    return (
        <div className='flex'>
            <DashboardMenu responsiveNav={responsiveNav} />
            <div className='w-full'>
                <DashboardNav setResponsiveNav={setResponsiveNav} responsiveNav={responsiveNav} />
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;