import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import useAuth from '../../../Hooks/useAuth';

const PrivateRoute = ({children}) => {
    const {currentUser, loading} = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className='h-screen w-screen flex justify-center items-center'>
                <PulseLoader 
                    color="#FF3D3D" 
                    loading={loading} 
                    size={16} 
                    aria-label="Loading Spinner" 
                    data-testid="loader" 
                />
            </div>
        );
    }

    if (!currentUser) {
        return <Navigate to='/login' state={{from: location}} replace />;
    }

    return children;
};

export default PrivateRoute;