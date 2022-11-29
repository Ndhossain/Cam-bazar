import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import useAuth from '../../../../../Hooks/useAuth';
import ImageGallery from 'react-image-gallery';
import './productdetails.css'
import BookingModal from './BookingModal';

const ProductDetails = () => {
    const { id } = useParams();
    const { logoutUser, currentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    const {data: productInfo, isLoading} = useQuery({
        queryKey: ['products', id],
        queryFn: async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    headers: {
                        authorization: `bearer ${localStorage.getItem('cam-bazar-token')}`
                    },
                    url: `${process.env.REACT_APP_DEV_SERVER_URL}/productdetails/${id}`
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
    });
    const {data: isBooked, isLoading: isBookingLoading, refetch: bookingRefetch} = useQuery({
        queryKey: ['isBooked', id, currentUser?.uid],
        queryFn: async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    headers: {
                        authorization: `bearer ${localStorage.getItem('cam-bazar-token')}`
                    },
                    url: `${process.env.REACT_APP_DEV_SERVER_URL}/isBooked/${id}/${currentUser?.uid}`
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
    });
    const {data: isWishListed, isLoading: isWishlistLoading, refetch: wishlistRefetch} = useQuery({
        queryKey: ['isWishlisted', id, currentUser?.uid],
        queryFn: async () => {
            try {
                const res = await axios({
                    method: 'GET',
                    headers: {
                        authorization: `bearer ${localStorage.getItem('cam-bazar-token')}`
                    },
                    url: `${process.env.REACT_APP_DEV_SERVER_URL}/isWishlisted/${id}/${currentUser?.uid}`
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

    console.log(productInfo)

    if (isLoading || isBookingLoading || isWishlistLoading) {
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
        );
    }

    if(!productInfo || !isBooked || !isWishListed) return<></>;

    const { productImage, productName, _id, usage, sellingPrice, sellerName, sellerAdress, newPrice, date, productModel, productBrand, phoneNo, description, condition, uid, sellerEmail } = productInfo?.data;
    const images = productImage?.map(img => {
        return { original: img, thumbnail: img }
    })

    // date
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth();
    const year = new Date(date).getFullYear();
    const time = new Date(date).getHours();
    const minute = new Date(date).getMinutes();
    // date

    const handleBooking = async (data) => {
        try {
            setLoading(true);
            await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_DEV_SERVER_URL}/bookings?uid=${currentUser.uid}`,
                headers: {
                    authorization: `bearer ${localStorage.getItem('cam-bazar-token')}`
                },
                data: {
                    ...data,
                    productId: _id,
                    status: 'Requested',
                    buyerUid: currentUser.uid,
                    sellerUid: uid,
                }
            });
            toast.success('Your booking Request Has been Submitted');
            navigate('/dashboard/mybookings');
            setModal(false);
            setLoading(false);
        } catch (err) {
            console.log(err)
            if (err.response.status === 403 || err.response.status === 401) {
                logoutUser();
                toast.error(err.response.data.message);
            } else {
                toast.error('Something Went Wrong')
            }
            setLoading(false);
        }
    }

    const handleWishListing = async () => {
        try {
            await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_DEV_SERVER_URL}/wishlist?uid=${currentUser.uid}`,
                headers: {
                    authorization: `bearer ${localStorage.getItem('cam-bazar-token')}`
                },
                data: {
                    productId: _id,
                    productimg: productImage[0],
                    productName: productName,
                    buyerUid: currentUser.uid,
                    sellerUid: uid,
                    status: 'available',
                    sellingPrice,
                    sellerName,
                    sellerAdress,
                }
            })
            toast.success('Successfully added to wishlist');
            wishlistRefetch();
        } catch (err) {
            console.log(err)
            if (err.response.status === 403 || err.response.status === 401) {
                logoutUser();
                toast.error(err.response.data.message);
            } else {
                toast.error('Something Went Wrong')
            }
            setLoading(false);
        }
    }

    const handleCancelBooking = async () => {
        try {
            await axios({
                method: 'DELETE',
                url: `${process.env.REACT_APP_DEV_SERVER_URL}/bookings/${id}/${currentUser?.uid}`,
                headers: {
                    authorization: `bearer ${localStorage.getItem('cam-bazar-token')}`
                }
            });
            toast.success('Your booking has been canceled.');
            bookingRefetch();
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

    const handleRemovingWishlist = async () => {
        try {
            await axios({
                method: 'DELETE',
                url: `${process.env.REACT_APP_DEV_SERVER_URL}/wishlist/${id}/${currentUser?.uid}`,
                headers: {
                    authorization: `bearer ${localStorage.getItem('cam-bazar-token')}`
                }
            });
            toast.success('Removed from wishlist.');
            wishlistRefetch();
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
        <main className='max-w-[1480px] mx-auto px-3'>
            <div className='md:flex items-center'>
                <div className='md:basis-1/2 p-5'>
                    <ImageGallery showPlayButton={false} items={images} />
                </div>
                <div className='md:basis-1/2 p-5'>
                    <h1 className='text-xl text-secondary font-bold'>{productName}</h1>
                    <p className='mt-6 text-base'>Brand: {productBrand}</p>
                    <p className='text-base'>Model: {productModel}</p>
                    <p className='text-base'>Seller Name: {sellerName}</p>
                    <p className='text-base'>Seller Adress: {sellerAdress}</p>
                    <p className='text-base'>Seller Email: {sellerEmail}</p>
                    <p className='text-base'>Condition: {condition}</p>
                    <p className='text-base'>Seller Phone No: {phoneNo}</p>
                    <p className='text-base'>Published On: {`${day}-${month}-${year} at ${time}:${minute < 10 ? `0${minute}`: minute}`}</p>
                    <p className='text-base'>Usage: {usage} year</p>
                    <div className='flex gap-5 my-6'>
                        <p className='underline text-secondary font-bold'>Selling Price: {sellingPrice}</p>
                        <p className='underline text-secondary font-bold'>Original Price: {newPrice}</p>
                    </div>
                    <div className='flex gap-5'>
                        {
                            isBooked?.data?.isBooked ? (
                                <button onClick={() => handleCancelBooking()} className='px-3 py-2 bg-primary text-white hover:bg-white hover:text-primary border-2 border-primary font-bold'>Cancel Booking</button>
                            ) : (
                                <button onClick={() => setModal(true)} className='px-3 py-2 bg-primary text-white hover:bg-white hover:text-primary border-2 border-primary font-bold'>Book Now</button>
                            )
                        }
                        {
                            isWishListed?.data?.isWishlisted ? (
                                <button onClick={() => handleRemovingWishlist()} className='px-3 py-2 hover:bg-primary hover:text-white bg-white text-primary border-2 border-primary font-bold'>Remove From Wishlist</button>
                            ) : (
                                <button onClick={() => handleWishListing()} className='px-3 py-2 hover:bg-primary hover:text-white bg-white text-primary border-2 border-primary font-bold'>Add To Wishlist</button>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className='mt-10'>
                <h2 className='text-secondary font-bold text-xl'>Description</h2>
                <p className='mt-5 text-base'>{description}</p>
            </div>
            <BookingModal 
                modal={modal} 
                setModal={setModal} 
                productName={productName} 
                currentUser={currentUser}
                price={sellingPrice}
                onsubmit={handleBooking}
                loading={loading}
            />
        </main>
    );
};

export default ProductDetails;