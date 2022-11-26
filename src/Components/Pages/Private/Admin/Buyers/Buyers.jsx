import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import useAuth from '../../../../../Hooks/useAuth';
import BuyersRow from './BuyersRow';

const Buyers = () => {
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
                    url: `${process.env.REACT_APP_DEV_SERVER_URL}/user/buyer?uid=${currentUser.uid}`
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
    console.log(users);
    return (
        <main className='w-full'>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="py-3 px-6">
                            Name
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Position
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Status
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.data?.map(user => <BuyersRow user={user} />)
                    }
                </tbody>
            </table>
        </main>
    );
};

export default Buyers;