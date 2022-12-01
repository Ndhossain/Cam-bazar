import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <div>  
            <footer className="bg-primary text-white dark:bg-gray-900 mt-10">
                <div className="grid grid-cols-2 gap-8 py-8 px-6 md:grid-cols-4">
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">Company</h2>
                        <ul className="text-gray-500 dark:text-gray-400">
                            <li className="mb-4">
                                <Link className=" hover:underline">About</Link>
                            </li>
                            <li className="mb-4">
                                <Link className="hover:underline">Careers</Link>
                            </li>
                            <li className="mb-4">
                                <Link className="hover:underline">Brand Center</Link>
                            </li>
                            <li className="mb-4">
                                <Link className="hover:underline">Blog</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">Help center</h2>
                        <ul className="text-gray-500 dark:text-gray-400">
                            <li className="mb-4">
                                <Link className="hover:underline">Discord Server</Link>
                            </li>
                            <li className="mb-4">
                                <Link className="hover:underline">Twitter</Link>
                            </li>
                            <li className="mb-4">
                                <Link className="hover:underline">Facebook</Link>
                            </li>
                            <li className="mb-4">
                                <Link className="hover:underline">Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">Legal</h2>
                        <ul className="text-gray-500 dark:text-gray-400">
                            <li className="mb-4">
                                <Link className="hover:underline">Privacy Policy</Link>
                            </li>
                            <li className="mb-4">
                                <Link className="hover:underline">Licensing</Link>
                            </li>
                            <li className="mb-4">
                                <Link className="hover:underline">Terms &amp; Conditions</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">Download</h2>
                        <ul className="text-gray-500 dark:text-gray-400">
                            <li className="mb-4">
                                <Link className="hover:underline">iOS</Link>
                            </li>
                            <li className="mb-4">
                                <Link className="hover:underline">Android</Link>
                            </li>
                            <li className="mb-4">
                                <Link className="hover:underline">Windows</Link>
                            </li>
                            <li className="mb-4">
                                <Link className="hover:underline">MacOS</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="py-6 px-4 bg-primary text-white dark:bg-gray-700 md:flex md:items-center md:justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-300 text-center">© {year} <Link to="/">Cam Bazar</Link>. All Rights Reserved.
                    </span>
                </div>
            </footer>
        </div>
    );
};

export default Footer;