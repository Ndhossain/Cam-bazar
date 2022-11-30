import React from 'react';
import AdvertiseItems from './asvertised-Items/AdvertiseItems';
import CategorySection from './categoies-section/CategorySection';
import Header from './Header';
import ReviewForm from './ReviewForm';

const Home = () => {
    return (
        <div>
            <Header />
            <main className='max-w-[1480px] mx-auto px-3'>
                <CategorySection />
                <AdvertiseItems />
            </main>
            <ReviewForm />
        </div>
    );
};

export default Home;