import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Checkout from './Checkout';

const stripePromise = loadStripe(`pk_test_51M9cuNBAUqblELKM12hcL85pbhEQ1BkGKAbBR4bxz7puGB4vNnSVxvVrVZZo40vCwz2Qe92G5ACaBpqKoj4S3IWN0005eTMooR`)

const Payment = () => {
    const data = useLoaderData();
    console.log(data);
    return (
        <div className='h-screen w-screen flex justify-center items-center flex-col'>
            <div className='p-5 w-full sm:w-3/4 md:w-1/2 shadow-2xl border'>
                <h1 className='text-2xl font-bold text-primary mb-5'>Payment For- {data.productName}</h1>
                <p className='mb-5'>Payment Price: {data.productPrice} BDT</p>
                <Elements stripe={stripePromise}>
                    <Checkout booking={data} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;