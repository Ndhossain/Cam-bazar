import React from 'react';

const BookingsHistoryRow = ({booking, handleCancelBooking, uid}) => {
    const {productName, productPrice, meetAdress, status, productId } = booking;
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
            </td>
            <td className="py-4 px-6 flex gap-4">
                <button className='text-secondary hover:underline' onClick={() => handleCancelBooking(productId)}>Delete</button>
            </td>
        </tr>
    );
};

export default BookingsHistoryRow;