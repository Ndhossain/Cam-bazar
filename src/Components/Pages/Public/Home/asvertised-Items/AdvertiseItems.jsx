import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../../Hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';
import ProductContainer from '../../../../Common/ProductContainer/ProductContainer';

const AdvertiseItems = () => {
    const { logoutUser } = useAuth();
    const {data: advertisedProducts, isLoading} = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    headers: {
                        authorization: `bearer ${localStorage.getItem('cam-bazar-token')}`
                    },
                    url: `${process.env.REACT_APP_DEV_SERVER_URL}/products?advertise=${true}`
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
        return <></>
    }

    if (advertisedProducts?.data?.length > 0) {
        return (
            <div className='mt-10'>
                <h2 className='text-center text-primary font-bold text-2xl mb-10'>Advertised Items</h2>
                <div className='flex flex-col gap-5'>
                    {
                        advertisedProducts?.data?.map(product => <ProductContainer key={product._id} product={product}/>)
                    }
                </div>
            </div>
        );   
    }
};

export default AdvertiseItems;