import React from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const MyProductContainer = ({product, setModalStatus, setDeleteId}) => {
    const {status, category, productImage, productName, sellingPrice, _id, advertise } = product;
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4 w-4">
                <div className="flex items-center">
                    <button type='button' onClick={() => {
                        setModalStatus(true);
                        setDeleteId(_id);
                    }}>
                        <BsFillTrashFill color='#FF3D3D' size={20} />
                    </button>
                </div>
            </td>
            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <img className='h-16 w-16' src={productImage[0]} alt={productName} />
            </th>
            <td className="py-4 px-6">
                {status}
            </td>
            <td className="py-4 px-6">
                {category}
            </td>
            <td className="py-4 px-6">
                {sellingPrice} BDT
            </td>
            <td className="py-4 px-6">
                {!advertise ? (<button className='px-2 py-1 border border-primary text-primary hover:bg-primary hover:text-white font-bold'>Ad My Product</button>) : ('Advertising')}
            </td>
            <td className="py-4 px-6">
                <Link to={`/dashboard/editproduct/${_id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
            </td>
        </tr>
    );
};

export default MyProductContainer;