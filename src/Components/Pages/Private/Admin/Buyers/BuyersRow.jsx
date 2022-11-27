import React from 'react';
import { BsFillTrashFill } from 'react-icons/bs';

const BuyersRow = ({user, setModalStatus, setDeleteUid}) => {
    const {image, email, name, role, isVerified, uid} = user;
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
               <th scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                    <img className="w-10 h-10 rounded-full" src={image} alt={name}/>
                    <div className="pl-3">
                        <div className="text-base font-semibold">{name}</div>
                        <div className="font-normal text-gray-500">{email}</div>
                    </div>  
                </th>
                <td className="py-4 px-6">
                    {role}
                </td>
                <td className="py-4 px-6">
                     {isVerified ? 'Verified' : 'Not Verified'}
                </td>
                <td className="py-4 px-6">
                    <button 
                        type='button'
                        onClick={() => {
                            setModalStatus(true);
                            setDeleteUid(uid);
                        }}
                    >
                        <BsFillTrashFill color='#FF3D3D' size={20} />
                    </button>
                </td>
            </tr>
    );
};

export default BuyersRow;