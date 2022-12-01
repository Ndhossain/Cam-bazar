import React from 'react';
import { Link } from 'react-router-dom';
import useUserRole from '../../../Hooks/useUserRole';
import {GoVerified} from 'react-icons/go';

const ProductContainer = ({ product }) => {
    const { productImage, productName, _id, usage, sellingPrice, sellerName, sellerAdress, newPrice, date, uid } = product;
    const { isLoading, isVerifiedSeller } = useUserRole(uid)

    // date
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth();
    const year = new Date(date).getFullYear();
    const time = new Date(date).getHours();
    const minute = new Date(date).getMinutes();
    // date

    return (
        <div className="flex flex-col items-center bg-white border rounded-lg shadow-md sm:flex-row w-full shrink-0">
            <img className="object-cover h-full w-[200px] p-2 rounded-t-lg md:rounded-none md:rounded-l-lg" src={productImage} alt={productName} />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <Link className='hover:text-secondary flex items-center gap-3' to={`/product/${_id}`}>
                    <h5 className="text-xl font-semibold tracking-tight">{productName}</h5>
                    {!isLoading && isVerifiedSeller && <GoVerified color='green' />}
                </Link>
                <div className="text-sm font-bold">
                     Usage: {usage} Year
                 </div>
                 <div className="text-sm font-bold">
                     Seller: {sellerName}
                 </div>
                 <div className="text-sm font-bold">
                     Buying Price: {newPrice} BDT
                 </div>
                 <div className="text-sm font-bold">
                     Location: {sellerAdress}
                 </div>
                 <div className="text-sm font-bold">
                     Published On: {`${day}-${month}-${year} at ${time}:${minute < 10 ? `0${minute}`: minute}`}
                 </div>
                 <div className='mb-5 text-secondary'>
                     <span className="font-bold text-xl">{sellingPrice} BDT</span>
                 </div>
                 <div className='mb-4'>
                     <Link to={`/product/${_id}`} className='hover:underline font-bold hover:text-secondary'>View Details</Link>
                 </div>
            </div>
        </div>
    );
};

export default ProductContainer;
