import React from 'react';

const CustomerBookingRow = ({booking, handleBookingApproval}) => {
    const {productName, buyerEmail , meetAdress, date, buyerPhoneNo, status, productId, buyerUid } = booking;
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
                <span>{buyerEmail}</span>
                <br />
                <span>{buyerPhoneNo}</span>
            </td>
            <td className="py-4 px-6">
                {meetAdress}
            </td>
            <td className="py-4 px-6">
                {`${day}-${month}-${year} at ${time}:${minute < 10 ? `0${minute}`: minute}`}
            </td>
            <td className="py-4 px-6">
                {
                    status === 'Requested' ? 
                        <button onClick={() => handleBookingApproval(productId, buyerUid)} className="text-secondary font-bold hover:underline">Approve</button> : 
                    status === 'Accepted' ? 
                        <span>Approved</span> : 
                    status === 'Paid' ? 
                        <span>Successful</span> : 
                            <span>Canceled</span>
                }
            </td>
        </tr>
    );
};

export default CustomerBookingRow;