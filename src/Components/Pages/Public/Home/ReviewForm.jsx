import React from 'react';
import ReviewBanner from '../../../../assets/images/review.jpg';

const ReviewForm = () => {
    return (
        <div className='relative'>
            <div>
                <img className='min-h-[450px]' src={ReviewBanner} alt="Review Banner" />
            </div>
            <form className='absolute bottom-1/2 translate-x-1/2 translate-y-1/2 right-1/2 p-5 w-[95%] sm:w-3/4 md:w-1/2 lg:w-1/4 bg-white/20 backdrop-blur-sm'>
                <h1 className='text-white text-center font-bold text-xl mb-6'>Give us a review</h1>
                <div>
                    <div className='mb-6'>
                        <input type="text" id="disabled-input" aria-label="disabled input" className="block p-2.5 w-full text-sm text-gray-900 bg-transparent border border-white placeholder-white focus:ring-blue-500 focus:border-blue-500" placeholder='Enter your name' />
                    </div>
                    <div className='mb-6'>
                        <input type="text" id="disabled-input" aria-label="disabled input" className="block p-2.5 w-full text-sm text-gray-900 bg-transparent border placeholder-white border-white focus:ring-blue-500 focus:border-blue-500" placeholder='Enter your email' />
                    </div>
                    <div className='mb-6'>
                        <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-transparent border placeholder-white border-white focus:ring-blue-500 focus:border-blue-500" placeholder="Your Review"></textarea>
                    </div>
                </div>
                <div>
                    <button type="submit" className="py-2.5 px-5 w-full text-sm font-bold bg-white border border-white hover:bg-transparent text-primary hover:text-white">Alternative</button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;
