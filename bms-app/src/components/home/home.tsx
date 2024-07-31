import React, { FC } from 'react';
import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('./hero'));
const PopularBooks = dynamic(() => import('./popular-books'));

const Home: FC = () => {
    return (
        <>
            <Hero />
            <PopularBooks />
        </>
    );
};

export default Home;