import Layout from '@/components/Layout';
import Title from '@/components/Title';
import React from 'react';
import Footer from '@/components/Footer';
import Link from 'next/link';
import CardsCategory from '@/components/CardsCategory';



const Categoria = () => {
    

return (
        <>
        <Layout title={'Vista de la Categoria'}/>
        <Title message={'Vista de la Categoria'} />
        <div className='flex justify-start'>   
            <Link href='/' className="text-indigo-500 hover:text-indigo-600 underline p-6 m-4 bg-slate-600 rounded-md">Volver a Inicio
            </Link>
        </div>
        <CardsCategory />
        <Footer />
        </>
    );
}

export default Categoria;