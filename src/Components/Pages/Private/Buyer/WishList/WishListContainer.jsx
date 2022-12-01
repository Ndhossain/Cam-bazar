import React from 'react';
import { Link } from 'react-router-dom';

const WishListContainer = ({wishlist, handleRemovingWishlist}) => {
    const { productimg, productName, sellingPrice, sellerName, sellerAdress, productId, date } = wishlist;

    // date
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth();
    const year = new Date(date).getFullYear();
    const time = new Date(date).getHours();
    const minute = new Date(date).getMinutes();
    // date

    

    return (
        <div className="flex flex-col items-center bg-white border rounded-lg shadow-md sm:flex-row w-full shrink-0">
            <img className="object-cover h-full w-[200px] p-2 rounded-t-lg md:rounded-none md:rounded-l-lg" src={productimg} alt={productName} />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <Link className='hover:text-secondary' to={`/product/${productId}`}>
                    <h5 className="text-xl font-semibold tracking-tight">{productName}</h5>
                </Link>
                 <div className="text-sm font-bold">
                     Seller: {sellerName}
                 </div>
                 <div className="text-sm font-bold">
                     Location: {sellerAdress}
                 </div>
                 <div className="text-sm font-bold">
                     Wishlisted On: {`${day}-${month}-${year} at ${time}:${minute < 10 ? `0${minute}`: minute}`}
                 </div>
                 <div className='mb-5 text-secondary'>
                     <span className="font-bold text-xl">{sellingPrice} BDT</span>
                 </div>
                 <div className='mb-4 flex gap-5'>
                     <Link to={`/product/${productId}`} className='hover:underline font-bold hover:text-secondary'>Go To Booking Page</Link>
                     <button onClick={() => handleRemovingWishlist(productId)} className='hover:underline font-bold hover:text-secondary'>Remove from wishlist</button>
                 </div>
            </div>
        </div>
    );
};

export default WishListContainer;