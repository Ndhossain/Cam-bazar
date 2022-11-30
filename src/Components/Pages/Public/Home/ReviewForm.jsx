import React from 'react';
import ReviewBanner from '../../../../assets/images/review.jpg'

const ReviewForm = () => {
    return (
        <div>
            <div className='absolute'>
                <img src={ReviewBanner} alt="Review Banner" />
            </div>
            <form></form>
        </div>
    );
};

export default ReviewForm;