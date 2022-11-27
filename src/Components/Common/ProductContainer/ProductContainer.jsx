import React from 'react';
import { Link } from 'react-router-dom';
import { BsCartPlus } from 'react-icons/bs';
import { GiHeartPlus } from 'react-icons/gi';
import { FaPlus } from 'react-icons/fa';

const ProductContainer = ({ product }) => {
    const { productImage, productName, _id, usage, sellingPrice } = product;
    return (
        <div class="w-full max-w-sm bg-white rounded-lg shadow-lg hover:shadow-2xl dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between">
            <div class="px-5 pb-5 flex flex-col h-max">
                <div>
                    <img class="p-3 rounded-t-lg" src={productImage[0]} alt={productName} />
                </div>
                <Link className='hover:text-secondary' to={`product/${_id}`}>
                    <h5 class="text-xl font-semibold tracking-tight">{productName}</h5>
                </Link>
            </div>
            <div className='p-5'>
                <div class="text-lg font-bold">
                    Usage: {usage} Year
                </div>
                <div className='mb-5 text-secondary'>
                    <span class="font-bold text-xl">{sellingPrice} BDT</span>
                </div>
                <div className='mb-4'>
                    <Link className='hover:underline font-bold hover:text-secondary'>View Details</Link>
                </div>
                <div className='flex justify-between'>
                        <button class="hover:text-secondary text-primary border-2 border-primary bg-white focus:outline-none font-bold text-sm p-2 text-center">
                            <FaPlus size={30} strokeWidth={.5} />
                        </button>
                    <div className='flex gap-5'>
                        <button class="hover:text-secondary text-primary border-2 border-primary bg-white focus:outline-none font-bold text-sm p-2 text-center">
                            <BsCartPlus size={30} strokeWidth={.5} />
                        </button>
                        <button class="hover:text-secondary text-primary border-2 border-primary bg-white focus:outline-none font-bold text-sm p-2 text-center">
                            <GiHeartPlus size={30} strokeWidth={.5} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductContainer;