import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import PulseLoader from 'react-spinners/PulseLoader';
import useAuth from '../../../../../Hooks/useAuth';
import WishListContainer from './WishListContainer';

const WishList = () => {
    const {currentUser, logoutUser} = useAuth()
    const {data: wishlistCollection, isLoading, refetch} = useQuery({
        queryKey: ['wishlist', currentUser?.uid],
        queryFn: async () => {
            try {
                const res = axios({
                    method: 'GET',
                    url: `${process.env.REACT_APP_PROD_SERVER_URL}/wishlist/${currentUser?.uid}`,
                    headers: {
                        authorization: `bearer ${localStorage.getItem('cam-bazar-token')}`
                    }
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

    if(isLoading) {
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
        )
    }

    const handleRemovingWishlist = async (id) => {
        try {
            await axios({
                method: 'DELETE',
                url: `${process.env.REACT_APP_PROD_SERVER_URL}/wishlist/${id}/${currentUser?.uid}`,
                headers: {
                    authorization: `bearer ${localStorage.getItem('cam-bazar-token')}`
                }
            });
            toast.success('Removed from wishlist.');
            refetch();
        } catch (err) {
            console.log(err)
            if (err.response.status === 403 || err.response.status === 401) {
                logoutUser();
                toast.error(err.response.data.message);
            } else {
                toast.error('Something Went Wrong')
            }
        }
    }

    console.log(wishlistCollection);

    return (
        <main className='max-w-[1480px] mx-auto px-3 mt-10 flex flex-col gap-5'>
            {
                wishlistCollection.data?.length > 0 ? 
                    wishlistCollection.data.map((wishlist) => <WishListContainer key={wishlist._id} handleRemovingWishlist={handleRemovingWishlist} wishlist={wishlist} />)
                : (
                    <h1 className='text-2xl font-bold text-primary text-center'>You didn't add any product to wishlist yet.</h1>
                )
            }
        </main>
    );
};

export default WishList;