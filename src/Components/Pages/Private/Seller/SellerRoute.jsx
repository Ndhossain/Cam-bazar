import React from 'react';
import { Navigate } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import useAuth from '../../../../Hooks/useAuth';
import useUserRole from '../../../../Hooks/useUserRole';

const SellerRoute = ({children}) => {
    const {currentUser} = useAuth();
    const {isLoading, isAdmin, isSeller} = useUserRole(currentUser?.uid);

    console.log(isLoading);

    if (isLoading) {
        return (
            <div className='h-screen w-screen flex justify-center items-center'>
                <PulseLoader 
                    color="#222" 
                    loading={isLoading} 
                    size={16} 
                    aria-label="Loading Spinner" 
                    data-testid="loader" 
                />
            </div>
        );
    }


    if (isAdmin || isSeller) {
        console.log('object');
        return children;
    }
    
    return <Navigate to='/login' />;
};

export default SellerRoute;