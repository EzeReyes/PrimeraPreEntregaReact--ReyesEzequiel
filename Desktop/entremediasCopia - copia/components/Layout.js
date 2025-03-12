import React from 'react';
import Navbar from './Navbar';
import Script from 'next/script';
import Head from 'next/head';  // Asegúrate de importar 'Head'


const Layout = ({children, title}) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Script 
                src="https://cdn.tailwindcss.com" 
                strategy="beforeInteractive"
            />
            <div>
                <Navbar />
                {children}
            </div>
        </>
    );
}

export default Layout;
