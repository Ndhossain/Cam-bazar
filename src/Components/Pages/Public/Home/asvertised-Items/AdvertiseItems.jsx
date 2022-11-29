import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import useAuth from '../../../../../Hooks/useAuth';
import ProductContainer from '../../../../Common/ProductContainer/ProductContainer';

const AdvertiseItems = () => {
    const { logoutUser } = useAuth();
    const [slide, setSlide] = useState(0);
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

    const handleSlide = (what) => {
        if(what && advertisedProducts?.data?.length > 0) {
            setSlide(prev => {
                if(prev < (advertisedProducts?.data?.length - 1) * 100) {
                    return prev + 100
                } else return 0;
            })
        } else {
            setSlide(prev => {
                if(prev > 0) {
                    return prev - 100
                } else return (advertisedProducts?.data?.length - 1) * 100;
            })
        }
    }

    // useEffect(() => {
    //     const unmount = setInterval(() => {
    //         handleSlide(true);
    //     }, [3000]);

    //     return () => unmount;
    // })

    if(isLoading) {
        return <></>
    }

    

    if (advertisedProducts?.data?.length > 0) {
        return (
            <div className='my-10'>
                <h2 className='text-center text-primary font-bold text-2xl mb-10'>Advertised Items</h2>
                <div className='overflow-hidden relative group'>
                    <div
                        onClick={() => handleSlide(true)}
                        className='absolute cursor-pointer lg:group-hover:block lg:hidden left-[4px] top-1/2 bottom-1/2 z-30'
                    >
                        <BsFillArrowLeftCircleFill size={28} color='#222'/>
                    </div>
                    <div 
                        className={`flex w-full relative duration-300`}
                        style={{right: `${slide}%`}}
                    >
                        {
                            advertisedProducts?.data?.map(product => <ProductContainer key={product._id} product={product}/>)
                        }
                    </div>
                    <div
                        onClick={() => handleSlide(false)}
                        className='absolute cursor-pointer lg:group-hover:block lg:hidden right-[4px] top-1/2 bottom-1/2 z-30'
                    >
                        <BsFillArrowRightCircleFill size={28} color='#222'/>
                    </div>
                </div>
            </div>
        );   
    }
};

export default AdvertiseItems;