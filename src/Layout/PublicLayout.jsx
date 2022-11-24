import React from 'react';
import { Outlet } from 'react-router-dom';
import Menubar from '../Components/Common/Menubar/Menubar';

const PublicLayout = () => {
    return (
        <>
            <Menubar />
            <Outlet />
        </>
    );
};

export default PublicLayout;