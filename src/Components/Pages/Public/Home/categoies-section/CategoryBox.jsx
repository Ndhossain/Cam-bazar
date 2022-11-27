import React from 'react';
import { Link } from 'react-router-dom';

const CategoryBox = ({category}) => {
    const {img, name, _id} = category;
    return (
        <Link to={`/shop/${_id}`} className='p-5 border border-primary/50 bg-gray-100 hover:text-secondary'>
            <div className='mb-5'>
                <img className='h-20 w-20 mx-auto' src={img} alt={name} />
            </div>
            <h4 className='text-center font-bold text-lg'>{name}</h4>
        </Link>
    );
};

export default CategoryBox;