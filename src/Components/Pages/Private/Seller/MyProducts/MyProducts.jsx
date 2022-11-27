import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import PulseLoader from 'react-spinners/PulseLoader';
import useAuth from '../../../../../Hooks/useAuth';
import DeleteConfirmationBox from '../../../../Common/DeleteConfirmationBox/DeleteConfirmationBox';
import MyProductContainer from './MyProductContainer';

const MyProducts = () => {
    const [modalStatus, setModalStatus] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const {logoutUser, currentUser} = useAuth();
    const {data: myProducts, isLoading, refetch} = useQuery({
        queryKey: ['products', currentUser.uid],
        queryFn: async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    headers: {
                        authorization: `bearer ${localStorage.getItem('cam-bazar-token')}`
                    },
                    url: `${process.env.REACT_APP_DEV_SERVER_URL}/products?uid=${currentUser.uid}`
                })
                return res;
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
    })

    const handleDelete = async () => {
        try {
            await axios({
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('cam-bazar-token')}`
                },
                url: `${process.env.REACT_APP_DEV_SERVER_URL}/products/${deleteId}?uid=${currentUser.uid}`
            })
            refetch();
            setModalStatus(false);
            toast.success('Successfully deleted');
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

    const produtctAdvertisement = async (id, data) => {
        try {
            await axios({
                method: 'PUT',
                headers: {
                    authorization: `bearer ${localStorage.getItem('cam-bazar-token')}`
                },
                data: data,
                url: `${process.env.REACT_APP_DEV_SERVER_URL}/products/${id}?uid=${currentUser.uid}`
            })
            refetch();
            toast.success(data.advertise ? 'Advertising your product' : 'Removed From advertisement');
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

    return (
        <main className='w-full'>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                {
                    isLoading ? (
                        <div className='h-screen w-full flex justify-center items-center'>
                            <PulseLoader 
                                color="#FF3D3D" 
                                loading={isLoading} 
                                size={16} 
                                aria-label="Loading Spinner" 
                                data-testid="loader" 
                            />
                        </div>
                    ) : (
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="p-4">
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Product
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Status
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Category
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Price
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Advertisement
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    myProducts?.data?.map(product => 
                                        <MyProductContainer 
                                            key={product._id} 
                                            product={product} 
                                            setModalStatus={setModalStatus} 
                                            setDeleteId={setDeleteId}
                                            produtctAdvertisement={produtctAdvertisement}
                                        />)
                                }
                            </tbody>
                        </table>
                    )
                }
            </div>
            <DeleteConfirmationBox 
                modalStatus={modalStatus} 
                handleDelete={handleDelete}
                setModalStatus={setModalStatus} 
                setDeleteId={setDeleteId}
                text='product'
            />
        </main>
    );
};

export default MyProducts;