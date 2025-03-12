import Layout from '@/components/Layout';
import Title from '@/components/Title';
import React, { useContext } from 'react';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';


const Carrito = () => {
  
  return (
    <>
      <Layout title={'CARRITO'} />
      <Title message={'CARRITO'} /> 
      <Cart />  
      <Footer />
    </>
    );
}

export default Carrito;