import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import PulseLoader from 'react-spinners/PulseLoader';
import useAuth from '../../../../../Hooks/useAuth';
import CustomerBookingRow from './CustomerBookingRow';

const MyCustomers = () => {
    const {currentUser, logoutUser} = useAuth();
    const {data: bookings, isLoading, refetch} = useQuery({
        queryKey: ['bookings', currentUser?.uid],
        queryFn: async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    headers: {
                        authorization: `bearer ${localStorage.getItem('cam-bazar-token')}`
                    },
                    url: `${process.env.REACT_APP_DEV_SERVER_URL}/seller-bookings/${currentUser?.uid}`
                })
                return res;
            } catch (err) {
                if (err.response.status === 403 || err.response.status === 401) {
                    logoutUser();
                    toast.error(err.response.data.message);
                } else {
                    toast.error('Something Went Wrong')
                }
            }
        }
    })

    const handleBookingApproval = async (productId, buyerUid) => {
        try {
            const res = await axios({
                method: 'PUT',
                url: `${process.env.REACT_APP_DEV_SERVER_URL}/booking/${productId}/${buyerUid}?uid=${currentUser?.uid}`,
                headers: {
                    authorization: `bearer ${localStorage.getItem('cam-bazar-token')}`
                },
            });
            console.log(res);
            toast.success('Booking Approved');
            refetch();
        } catch (err) {
            if (err.response.status === 403 || err.response.status === 401) {
                logoutUser();
                toast.error(err.response.data.message);
            } else {
                toast.error('Something Went Wrong')
            }
        }
    }

    console.log(bookings);

    if(isLoading) {
        return (
            <div className='h-screen w-full flex justify-center items-center'>
                <PulseLoader
                    color="#FF3D3D" 
                    loading={isLoading} 
                    size={16} 
                    aria-label="Loading Spinner" 
                    data-testid="loader" 
                />
            </div>
        )
    }
    return (
        <div className='w-full'>         
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Product name
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Buyer Info
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Meet Adress
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Booking Time
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings?.data?.length > 0 ? 
                                bookings?.data?.map((booking) => <CustomerBookingRow key={booking._id} booking={booking} handleBookingApproval={handleBookingApproval} />) 
                                : 
                                <tr className='text-center text-3xl font-bold'><th>Haven't booked anything yet</th></tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyCustomers;