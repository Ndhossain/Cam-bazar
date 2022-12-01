import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import { AiFillHome, AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';

const DashboardNav = ({setResponsiveNav, responsiveNav}) => {
    const {currentUser} = useAuth();
    return (
        <div className='flex px-5 py-3 justify-between bg-primary text-white items-center sticky top-0 z-50'>
            <button className='md:invisible' onClick={() => setResponsiveNav(!responsiveNav)}>
                {responsiveNav ? (
                        <AiOutlineMenuUnfold size={24} color='#fff' />
                        ) : (
                        <AiOutlineMenuFold size={24} color='#fff' />
                    )}
            </button>
            <div>
                <ul className='flex gap-4 items-center'>
                    <li><Link to='/' className='text-white hover:text-secondary flex items-center'><AiFillHome size={24} /></Link></li>
                    <li><img className='w-9 h-9 rounded-full border-2 border-white/30' src={currentUser?.photoURL} alt={currentUser?.displayName} /></li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardNav;