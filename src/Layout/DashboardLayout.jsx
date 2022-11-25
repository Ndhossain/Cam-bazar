import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardMenu from '../Components/Common/DashboardMenu/DashboardMenu';

const DashboardLayout = () => {
    return (
        <div className='flex'>
            <DashboardMenu />
            <Outlet />
        </div>
    );
};

export default DashboardLayout;