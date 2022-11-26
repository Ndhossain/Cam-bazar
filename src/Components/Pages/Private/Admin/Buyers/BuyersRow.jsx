import React from 'react';
import { BsFillTrashFill } from 'react-icons/bs';

const BuyersRow = ({user}) => {
    const {image, email, name, role, isVerified} = user;
    return (
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
               <th scope="row" class="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                    <img class="w-10 h-10 rounded-full" src={image} alt={name}/>
                    <div class="pl-3">
                        <div class="text-base font-semibold">{name}</div>
                        <div class="font-normal text-gray-500">{email}</div>
                    </div>  
                </th>
                <td class="py-4 px-6">
                    {role}
                </td>
                <td class="py-4 px-6">
                     {isVerified ? 'Verified' : 'Not Verified'}
                </td>
                <td class="py-4 px-6">
                    <button type='button'>
                        <BsFillTrashFill color='#FF3D3D' size={20} />
                    </button>
                </td>
            </tr>
    );
};

export default BuyersRow;