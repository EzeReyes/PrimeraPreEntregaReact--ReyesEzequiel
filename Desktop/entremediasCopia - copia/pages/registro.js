import Layout from '@/components/Layout';
import React, { useContext } from 'react';
import Footer from '@/components/Footer';
import FormRegistro from '@/components/FormRegistro';

const Iniciar = () => {
  
  return (
    <>
        <Layout title={'Crea una cuenta'} />
        <FormRegistro />
        <Footer />
    </>
    );
}

export default Iniciar;