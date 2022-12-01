import React, { useEffect, useState } from 'react';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
import axios from 'axios';
import PulseLoader from 'react-spinners/PulseLoader';
import { Link } from 'react-router-dom';

const Checkout = ({booking}) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(true);
    const [error, setError] = useState('');
    const stripe = useStripe();
    const  elements = useElements();
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      fetch(`${process.env.REACT_APP_DEV_SERVER_URL}/createpaymentintent`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            authorization: `bearer ${localStorage.getItem('cam-bazar-token')}`
        },
        body: JSON.stringify({ price: booking.productPrice }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    }, [booking.productPrice]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if(!stripe || !elements) {
                setLoading(false);
                return;
            }
            const card = elements.getElement(CardElement)
            if(card === null) {
                setLoading(false);
                return;
            }
            const {error} = await stripe.createPaymentMethod({
                type: 'card',
                card
            })
            if(error) {
                console.log(error);
                setLoading(false);
                setError(error);
                return;
            } else {
                setError('')
            }
            const {paymentIntent, error: confirmPayError} = await stripe
            .confirmCardPayment(clientSecret, {
              payment_method: {
                card: card,
                billing_details: {
                  email: booking.buyerEmail,
                  phone: booking.buyerPhoneNo,
                },
              },
            })
            if(confirmPayError) {
                console.log(error);
                setLoading(false);
                setError(confirmPayError);
                return;
            } else {
                setError('')
            }
            const res = await axios({
                method: 'POST',
                headers: {
                    authorization: `bearer ${localStorage.getItem('cam-bazar-token')}`
                },
                data: {
                    transactionId: paymentIntent.id,
                    price: booking.productPrice,
                    bookingId: booking._id,
                    productId: booking.productId,
                    email: booking.buyerEmail,
                },
                url: `${process.env.REACT_APP_DEV_SERVER_URL}/payments`
            })
            console.log(res);
            setLoading(false);
            setSuccess(paymentIntent);
        } catch (err) {
            console.error(err);
            setLoading(false)
        }
    }

    return (
        <div>
            {loading && <div className='flex justify-center items-center h-screen w-screen absolute top-0 left-0 bg-white/70 z-30'>
                <PulseLoader 
                    color="#FF3D3D" 
                    loading={loading} 
                    size={16} 
                    aria-label="Loading Spinner" 
                    data-testid="loader" 
                />
            </div>}
            {
                !success ? (
                    <>
                    <form onSubmit={handleSubmit}>
                        <CardElement
                            options={{
                            style: {
                                base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                                },
                                invalid: {
                                color: '#9e2146',
                                },
                            },
                            }}
                        />
                        <button className='font-bold px-2 py-1 border mt-5 border-primary bg-white hover:bg-primary hover:text-white' type="submit" disabled={!stripe || !clientSecret}>
                            Pay
                        </button>
                    </form>
                    {error && <p className='text-danger'>{error.message}</p>}
                    </>
                ) : (
                    <>
                        <h1 className='text-2xl font-bold text-green-600'>Payment Successful</h1>
                        <h2 className='text-xl font-primariy'>Transaction Id: {success.id}</h2>
                        <div className='flex justify-center'>
                            <Link
                                to='/dashboard/mybookings'
                                className='font-bold px-2 py-1 border mt-5 border-primary bg-white hover:bg-primary hover:text-white'
                            >
                                Go Back
                            </Link>
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default Checkout;