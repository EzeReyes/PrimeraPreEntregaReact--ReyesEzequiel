import React, { useContext, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FormCompra from '@/components/FormCompra';

const FinalizarCompra = () => {

    return (
    <>
    <Navbar />
    <FormCompra />
    <Footer />
    </>
  );
};

export default FinalizarCompra;
