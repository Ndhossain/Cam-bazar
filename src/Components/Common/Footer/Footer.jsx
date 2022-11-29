import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            
<footer class="bg-primary text-white dark:bg-gray-900 mt-10">
    <div class="grid grid-cols-2 gap-8 py-8 px-6 md:grid-cols-4">
        <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">Company</h2>
            <ul class="text-gray-500 dark:text-gray-400">
                <li class="mb-4">
                    <Link class=" hover:underline">About</Link>
                </li>
                <li class="mb-4">
                    <Link class="hover:underline">Careers</Link>
                </li>
                <li class="mb-4">
                    <Link class="hover:underline">Brand Center</Link>
                </li>
                <li class="mb-4">
                    <Link class="hover:underline">Blog</Link>
                </li>
            </ul>
        </div>
        <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">Help center</h2>
            <ul class="text-gray-500 dark:text-gray-400">
                <li class="mb-4">
                    <Link class="hover:underline">Discord Server</Link>
                </li>
                <li class="mb-4">
                    <Link class="hover:underline">Twitter</Link>
                </li>
                <li class="mb-4">
                    <Link class="hover:underline">Facebook</Link>
                </li>
                <li class="mb-4">
                    <Link class="hover:underline">Contact Us</Link>
                </li>
            </ul>
        </div>
        <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">Legal</h2>
            <ul class="text-gray-500 dark:text-gray-400">
                <li class="mb-4">
                    <Link class="hover:underline">Privacy Policy</Link>
                </li>
                <li class="mb-4">
                    <Link class="hover:underline">Licensing</Link>
                </li>
                <li class="mb-4">
                    <Link class="hover:underline">Terms &amp; Conditions</Link>
                </li>
            </ul>
        </div>
        <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">Download</h2>
            <ul class="text-gray-500 dark:text-gray-400">
                <li class="mb-4">
                    <Link class="hover:underline">iOS</Link>
                </li>
                <li class="mb-4">
                    <Link class="hover:underline">Android</Link>
                </li>
                <li class="mb-4">
                    <Link class="hover:underline">Windows</Link>
                </li>
                <li class="mb-4">
                    <Link class="hover:underline">MacOS</Link>
                </li>
            </ul>
        </div>
    </div>
    <div class="py-6 px-4 bg-primary text-white dark:bg-gray-700 md:flex md:items-center md:justify-between">
        <span class="text-sm text-gray-500 dark:text-gray-300 text-center">© {new Date().getFullYear} <Link to="/">Cam Bazar</Link>. All Rights Reserved.
        </span>
    </div>
</footer>

        </div>
    );
};

export default Footer;