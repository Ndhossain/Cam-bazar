import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const Error = () => {  
    const error = useRouteError();

    return (
        <div className='flex h-screen w-screen justify-center items-center flex-col bg-primary text-white'>
          <h1 className='text-6xl sm:text-9xl text-secondary font-black'>{error.status}</h1>
          <h2 className='text-5xl font-bold mt-5'>Page {error.statusText || error.data}</h2>
          <Link to='/' className='px-4 py-2 font-bold border border-secondary text-secondary hover:text-white hover:border-white mt-5'>Go to home</Link>
        </div>
    );
};

export default Error;