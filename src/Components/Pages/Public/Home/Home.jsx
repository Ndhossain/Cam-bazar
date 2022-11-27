import React from 'react';
import CategorySection from './categoies-section/CategorySection';
import Header from './Header';

const Home = () => {
    return (
        <div>
            <Header />
            <main className='max-w-[1480px] mx-auto px-3'>
                <CategorySection />
            </main>
        </div>
    );
};

export default Home;