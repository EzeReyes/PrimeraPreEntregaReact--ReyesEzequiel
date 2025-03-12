import Footer from '@/components/Footer';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import React from 'react';
import Link from 'next/link';

const SobreNosotros = () => {
    return (
        <>
            <Layout title={'SOBRE NOSOTROS'} />
            <Title message={'SOBRE NOSOTROS'} /> 
            <section className="max-w-4xl mx-auto px-6 py-12">
    <div className="flex flex-col md:flex-row justify-evenly items-center mb-12">
        <p className="text-gray-700 text-lg leading-relaxed mb-6 md:mb-0 md:w-1/2">
            Bienvenidos a <strong>Entremedias</strong>, donde la elegancia y la comodidad se encuentran en cada par de medias.
        </p>
        <img src="/img-suave.jpg" className="w-40 h-60 rounded-md shadow-lg" alt="Medias elegantes" />
    </div>
    <div className="flex flex-col md:flex-row w-full justify-around items-center mb-12">
        <p className="text-gray-700 text-lg leading-relaxed mb-6 md:mb-0 md:w-1/2">
            En <strong>Entremedias</strong>, creemos que las pequeñas cosas son las que hacen la diferencia. Desde nuestra fundación, hemos estado comprometidos con crear medias que no solo complementen tu estilo, sino que también ofrezcan la máxima comodidad para tu día a día.
        </p>
        <img src="/medias-ordenadas.jpg" className="w-40 h-40 rounded-md shadow-lg" alt="Medias ordenadas" /> 
    </div>
    <div className="text-gray-700 text-lg leading-relaxed mb-12">
        <p className="mb-4">
            Nuestros productos están diseñados con materiales de alta calidad, seleccionados para garantizar durabilidad, suavidad y una sensación de lujo en cada paso que das. Inspirados por la simplicidad y la belleza de lo esencial, nuestras colecciones buscan ofrecerte algo más que un accesorio: una experiencia de confort.
        </p>
        <img src="/mediascana.jpeg" className="w-full h-auto rounded-md shadow-lg mb-4" alt="entremedias" />
    </div>
    <div className="text-gray-700 text-lg leading-relaxed">
        <h2 className="text-2xl font-semibold mb-4">Nuestra Filosofía</h2>
        <p className="mb-4">
            Menos es más. Creemos en el poder de la simplicidad y nos esforzamos por crear productos que reflejen esta filosofía. Cada detalle, desde el diseño hasta la elección del material, está pensado para ofrecerte lo mejor.
        </p>
        <img src="/medias-tipologo.png" className="w-auto h-auto rounded-md shadow-lg" alt="Equipo de diseño minimalista" />
        <p className="mt-4">
            Gracias por acompañarnos en este viaje. Esperamos que nuestras medias te inspiren tanto como a nosotros nos inspira crearlas.
        </p>
    </div>
</section>
<Link href="https://wa.me/1234567890" target="_blank" className="fixed bottom-5 right-5 w-16 h-16 bg-green-500 text-white rounded-full shadow-lg z-50 flex items-center justify-center">
    <img src="/wsp-icon.png" alt="WhatsApp" className="w-full h-full rounded-full" />
</Link>

<Footer />

        </>
    );
}

export default SobreNosotros;