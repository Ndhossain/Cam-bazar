import React from 'react';
import { Outlet } from 'react-router-dom';
import Menubar from '../Components/Common/Menubar/Menubar';

const PublicLayout = () => {
    return (
        <>
            <Menubar />
            <main className='max-w-[1480px] mx-auto px-3'>
                <Outlet />
            </main>
        </>
    );
};

export default PublicLayout;