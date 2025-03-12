import Layout from '@/components/Layout';
import Title from '@/components/Title';
import React from 'react';
import Footer from '@/components/Footer';
import CardForId from '@/components/CardForId';

const Producto = () => {
    

return (
        <>
        <Layout title={'Vista del Producto'}/>
        <Title message={'Vista del Producto'} />
        <CardForId />
        <Footer />
        </>
    );
}

export default Producto;