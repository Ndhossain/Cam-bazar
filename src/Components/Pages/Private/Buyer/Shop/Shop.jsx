import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import useAuth from '../../../../../Hooks/useAuth';
import ProductContainer from '../../../../Common/ProductContainer/ProductContainer';

const Shop = () => {
    const { id } = useParams();
    const {logoutUser} = useAuth();
    const {data: products, isLoading} = useQuery({
        queryKey: ['products', id],
        queryFn: async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    headers: {
                        authorization: `bearer ${localStorage.getItem('cam-bazar-token')}`
                    },
                    url: `${process.env.REACT_APP_DEV_SERVER_URL}/products?categoryId=${id}`
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
    return (
        <main className='max-w-[1480px] mx-auto px-3 mt-10'>
            <div className='flex flex-col gap-5'>
                    {
                        products.data?.length > 0 ?
                        products?.data?.map(product => <ProductContainer key={product._id} product={product}/>) :
                        <h1 className='text-center text-3xl font-bold'>Products Not available for this category</h1>
                    }
            </div>
        </main>
    );
};

export default Shop;