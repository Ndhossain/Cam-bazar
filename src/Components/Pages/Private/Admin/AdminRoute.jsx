import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import useAuth from '../../../../Hooks/useAuth';
import useUserRole from '../../../../Hooks/useUserRole';

const AdminRoute = ({children}) => {
    const {currentUser} = useAuth();
    const {isLoading, isAdmin} = useUserRole(currentUser.uid);
    const location = useLocation();

    if (isLoading) {
        return (
            <div className='h-screen w-screen flex justify-center items-center'>
                <PulseLoader 
                    color="#FF3D3D" 
                    loading={isLoading} 
                    size={16} 
                    aria-label="Loading Spinner" 
                    data-testid="loader" 
                />
            </div>
        );
    }

    if (!isAdmin) {
        return <Navigate to='/login' state={{from: location}} replace />;;
    }

    return children;
};

export default AdminRoute;