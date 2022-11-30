import React, { useEffect, useState } from 'react';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'

const Checkout = ({booking}) => {
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
            if(!stripe || !elements) return;
            const card = elements.getElement(CardElement)
            if(card === null) return;
            console.log(card)
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: 'card',
                card
            })
            if(error) {
                console.log(error);
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
                setError(confirmPayError);
                return;
            } else {
                setError('')
            }
            console.log(paymentIntent);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
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
        </div>
    );
};

export default Checkout;