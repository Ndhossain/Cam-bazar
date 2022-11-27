import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CategoryMenu = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_DEV_SERVER_URL}/categories`,
        }).then(res => {
            setCategories(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <ul className='flex sm:flex-row flex-col sm:justify-center sm:gap-2 sm:bg-primary sm:text-white text-sm sm:font-bold'>
            {
                categories?.map(category => 
                    <li key={category._id} className='p-2'>
                        <Link className='hover:text-secondary' to={`/shop/${category._id}`}>{category.name}</Link>
                    </li>
                )
            }
        </ul>
    );
};

export default CategoryMenu;