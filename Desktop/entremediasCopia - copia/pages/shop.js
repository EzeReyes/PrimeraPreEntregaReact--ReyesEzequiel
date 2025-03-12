import Cards from '@/components/Cards';
import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import React from 'react';

const Shop = () => {

    
    return (
        <>
            <Layout title={'SHOP'}/>
            <Title message={'SHOP'} />   
            <Cards />
            <Footer />

        </>
    );
}

export default Shop;