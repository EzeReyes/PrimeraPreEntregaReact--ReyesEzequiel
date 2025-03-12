import React from 'react';
import Spinner from '../components/Spinner';
import { gql, useQuery } from '@apollo/client';
import Layout from '@/components/Layout';
import Footer from '@/components/Footer';
import Category from '@/components/Category';
import Link from 'next/link';

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      descripcion
      imagen
    }
  }
`;

const Coleccion = () => {
  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <h5 className="text-xl font-medium text-gray-700">Cargando...</h5>
        <Spinner />
      </div>
    );
  }

  if (error) return <p className="text-red-500">Error al cargar productos: {error.message}</p>;

  return (
    <>
    <Layout title={'Colección'}/>
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-10">Nuestra Colección de Productos</h2>
      <div className="my-14" >
        <Category />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.obtenerProductos.map((producto) => (
          <Link href={`${producto.id}`}>
          <div
            key={producto.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-2"
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">{producto.nombre}</h3>
              <p className="mt-3 text-gray-600">{producto.descripcion}</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Coleccion;
