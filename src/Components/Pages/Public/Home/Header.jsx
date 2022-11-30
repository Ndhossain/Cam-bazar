import React from 'react';
import { Link } from 'react-router-dom';
import BannerImg from '../../../../assets/images/Banner.jpg'

const Header = () => {
    return (
        <div className='relative'>
            <div className='bg-black'>
                <img className='w-screen opacity-40 min-h-[450px]' src={BannerImg} alt="Banner" />
            </div>
            <div className='absolute text-white bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 flex items-center flex-col'>
                <h1 className='text-4xl lg:text-6xl mb-5 font-bold text-center'>Buy Your dream Camera today</h1>
                <Link to='/shop' className='px-5 py-3 border border-white font-bold text-sm hover:border-secondary hover:text-secondary'>SHOP NOW</Link>
            </div>
        </div>
    );
};

export default Header;