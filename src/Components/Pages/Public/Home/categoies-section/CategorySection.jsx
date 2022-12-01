import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CategoryBox from './CategoryBox';

const CategorySection = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_PROD_SERVER_URL}/categories`,
        }).then(res => {
            setCategories(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <div className='mt-10'>
            <h2 className='text-center text-primary font-bold text-2xl mb-10'>Categories</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5'>
                {
                    categories.map(category => <CategoryBox key={category._id} category={category} />)
                }
            </div>
        </div>
    );
};

export default CategorySection;