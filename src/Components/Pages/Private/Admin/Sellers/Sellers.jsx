import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import PulseLoader from 'react-spinners/PulseLoader';
import useAuth from '../../../../../Hooks/useAuth';
import DeleteConfirmationBox from '../../../../Common/DeleteConfirmationBox/DeleteConfirmationBox';
import BuyersRow from '../Buyers/BuyersRow';

const Sellers = () => {
    const [modalStatus, setModalStatus] = useState(false);
    const [deleteUid, setDeleteUid] = useState('')
    const {currentUser, logoutUser} = useAuth();
    const {data: users, isLoading, refetch} = useQuery({
        queryKey: ['user', 'buyer', currentUser.uid],
        queryFn: async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    headers: {
                        authorization: `bearer ${localStorage.getItem('cam-bazar-token')}`
                    },
                    url: `${process.env.REACT_APP_PROD_SERVER_URL}/user/seller?uid=${currentUser.uid}`
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
    });

    const handleDelete = async () => {
        try {
            await axios({
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('cam-bazar-token')}`
                },
                url: `${process.env.REACT_APP_PROD_SERVER_URL}/user/${deleteUid}?uid=${currentUser.uid}`
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
    return (
        <main className='w-full'>
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
                                <th scope="col" className="py-3 px-6">
                                    Name
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Position
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Status
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.data?.map(
                                    user => <BuyersRow key={user._id} user={user} setModalStatus={setModalStatus} setDeleteUid={setDeleteUid} />
                                )
                            }
                        </tbody>
                    </table>
                )
            }
            <DeleteConfirmationBox 
                modalStatus={modalStatus} 
                setModalStatus={setModalStatus} 
                setDeleteId={setDeleteUid}
                text='seller'
                handleDelete={handleDelete}
            />
        </main>
    );
};

export default Sellers;