import React from 'react';
import { Navigate } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import useAuth from '../../../Hooks/useAuth';

const PrivateRoute = ({children}) => {
    const {currentUser, loading} = useAuth();

    if (loading) {
        return <PulseLoader 
                    color="#222" 
                    loading={loading} 
                    size={16} 
                    aria-label="Loading Spinner" 
                    data-testid="loader" 
                />;
    }

    if (!currentUser) {
        return <Navigate to='/login' />;
    }

    return children;
};

export default PrivateRoute;