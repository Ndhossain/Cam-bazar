import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Common/Footer/Footer';
import Menubar from '../Components/Common/Menubar/Menubar';

const PublicLayout = () => {
    return (
        <>
            <Menubar />
            <Outlet />
            <Footer />
        </>
    );
};

export default PublicLayout;