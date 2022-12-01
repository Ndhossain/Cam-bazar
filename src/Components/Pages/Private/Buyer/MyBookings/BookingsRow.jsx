import React from 'react';
import { Link } from 'react-router-dom';

const BookingsRow = ({booking, handleCancelBooking, uid}) => {
    const {productName, productPrice, meetAdress, date, status, productId, _id } = booking;
    // date
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth();
    const year = new Date(date).getFullYear();
    const time = new Date(date).getHours();
    const minute = new Date(date).getMinutes();
    // date
    return (
        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[200px]">
                {productName}
            </th>
            <td className="py-4 px-6">
                {productPrice} BDT
            </td>
            <td className="py-4 px-6">
                {meetAdress}
            </td>
            <td className="py-4 px-6">
                <span>{status}</span>
                <br />
                <span>{`${day}-${month}-${year} at ${time}:${minute < 10 ? `0${minute}`: minute}`}</span>
            </td>
            <td className="py-4 px-6">
                {
                    status === 'Requested' ? 
                        <button onClick={() => handleCancelBooking(productId)} className="text-secondary font-bold hover:underline">Cancel</button> :  
                        <Link to={`/payment/${_id}/${uid}`} className="text-secondary font-bold hover:underline">Pay</Link> 
                }
            </td>
        </tr>
    );
};

export default BookingsRow;