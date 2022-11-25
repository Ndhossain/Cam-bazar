import React, { useState } from 'react';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { FaCartPlus, FaHeart, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import CategoryMenu from './CategoryMenu';

const Menubar = () => {
    const [responsiveNav, setResponsiveNav] = useState(false);
    const {currentUser, logoutUser, loading} = useAuth();
    console.log(loading);

    return (
        <div>
            <nav className='flex justify-between items-center px-3 py-3 max-w-[1480px] mx-auto'>
                <h1 className='text-3xl text-primary font-black'>
                    <Link to='/'>
                        Cam Bazar
                    </Link>
                </h1>
                <button 
                    className='sm:hidden relative z-50'
                    onClick={() => setResponsiveNav(!responsiveNav)}
                >
                    {responsiveNav ? (
                        <AiOutlineMenuUnfold size={24} color='#fff' />
                        ) : (
                        <AiOutlineMenuFold size={24} color='#222' />
                    )}
                </button>
                <ul 
                    className={`flex top-0 sm:flex-row flex-col gap-3 sm:relative fixed sm:translate-x-0 sm:h-min h-screen sm:w-min w-1/2 bg-primary sm:bg-white sm:text-primary text-white duration-300 overflow-y-scroll sm:overflow-y-visible z-40 ${responsiveNav ? 'translate-x-[100%]' : 'translate-x-[200%]'}`}
                >
                    <li className='flex items-center mt-14 sm:mt-0'>
                        <Link className='px-2 sm:p-2' to='/'>
                            <FaHeart className='sm:block hidden' size={22} color={responsiveNav ? '#fff' : '#222'} />
                            <span className='sm:hidden block text-sm'>Wishlist</span>
                        </Link>
                        <span className='sm:block hidden'>0</span>
                    </li>
                    <li className='flex items-center'>
                        <Link className='px-2 sm:p-2' to='/'>
                            <FaCartPlus className='sm:block hidden' size={22} color={responsiveNav ? '#fff' : '#222'} />
                            <span className='sm:hidden block text-sm'>Cart</span>
                        </Link>
                        <span className='sm:block hidden'>0</span>
                    </li>
                    <li className='flex items-center relative group w-10'>
                        {
                            !loading && (currentUser ? (
                                <img className='rounded-full h-10 w-10' src={currentUser.photoURL} alt={currentUser.displayName} />
                                // <FaUserAlt size={20} color={responsiveNav ? '#fff' : '#222'} />
                            ) : (
                                <Link className='p-2 hidden sm:block' to='/login'>
                                    <FaUserPlus size={22} color={responsiveNav ? '#fff' : '#222'} />
                                </Link>
                            ))
                        }
                        <ul className='sm:p-2 sm:absolute sm:top-9 sm:right-[-10px] sm:w-60 sm:bg-white sm:border sm:border-primary sm:hidden sm:group-hover:block'>
                            {
                                currentUser ? (
                                    <>
                                        <li className='px-2 mb-3 sm:mb-0 sm:p-2 text-sm hover:bg-primary/10'>
                                            <div>
                                                {currentUser?.displayName}
                                            </div>
                                            <div>
                                                {currentUser?.email}
                                            </div>
                                        </li>

                                        <hr className='hidden sm:block my-1 h-[1px] bg-primary/60 border-0' />

                                        <li className='mb-3 sm:mb-0 text-sm hover:bg-primary/10 w-full'>
                                            <Link className='px-2 block sm:p-2' to='/dashboard'>Dashboard</Link>
                                        </li>
                                        <li className='mb-3 sm:mb-0 text-sm hover:bg-primary/10 w-full'>
                                            <Link className='px-2 block sm:p-2'>Become an admin</Link>
                                        </li>

                                        <hr className='hidden sm:block my-1 h-[1px] bg-primary/60 border-0' />

                                        <li className='mb-3 sm:mb-0 text-sm hover:bg-primary/10 w-full'>
                                            <button className='px-2 block sm:p-2' onClick={() => logoutUser()} type='button block'>Logout</button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className='mb-3 sm:mb-0 text-sm hover:bg-primary/10 border-b border-primary'>
                                            <Link className='block sm:p-2 px-2' to='/register'>Register</Link>
                                        </li>
                                        <li className='mb-3 sm:mb-0 text-sm hover:bg-primary/10'>
                                            <Link className='block sm:p-2 px-2' to='/login'>Login</Link>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </li>
                    <li>
                        <div className='block sm:hidden'>
                            <h6 className='text-center mb-3 text-sm font-bold'>Categories</h6>
                            <CategoryMenu />
                        </div>
                    </li>
                </ul>
            </nav>
            <div className='hidden sm:block'>
                <CategoryMenu />
            </div>
        </div>
    );
};

export default Menubar;