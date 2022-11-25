import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillCartPlusFill } from 'react-icons/bs';
import { FaHandHolding, FaUserAlt, FaUserCog, FaUserFriends } from 'react-icons/fa';
import { MdAddCircle, MdOutlineProductionQuantityLimits } from 'react-icons/md'


const DashboardMenu = () => {
    return (
        <aside className="w-max" aria-label="Sidebar">
            <div className="overflow-y-auto py-4 px-3 h-screen bg-gray-50 rounded dark:bg-gray-800">
                    <h1 className='text-3xl text-primary font-black mb-5'>
                        <Link to='/'>
                            Cam Bazar
                        </Link>
                    </h1>
                <ul className="space-y-2">
                    <li>
                        <Link to="/dashboard" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaUserAlt color='#222' size={22} />
                        <span className="font-bold text-primary ml-3">Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/mybookings" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <BsFillCartPlusFill color='#222' size={22} />
                        <span className="font-bold text-primary ml-3">My Bookings</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/myproducts" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <MdOutlineProductionQuantityLimits color='#222' size={22} />
                        <span className="font-bold text-primary ml-3">My Products</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/mycustomers" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaHandHolding color='#222' size={22} />
                        <span className="font-bold text-primary ml-3">My Customers</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/addproducts" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <MdAddCircle color='#222' size={22} />
                        <span className="font-bold text-primary ml-3">Add New Product</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/buyers" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaUserCog color='#222' size={22} />
                        <span className="font-bold text-primary ml-3">Buyers</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/sellers" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaUserFriends color='#222' size={22} />
                        <span className="font-bold text-primary ml-3">Sellers</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default DashboardMenu;