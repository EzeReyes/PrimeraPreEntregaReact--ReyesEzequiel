import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useProduct } from '@/context/productsContext';
import ProductGallery from './ProductGalery';

const OBTENER_PRODUCTO = gql`
  query obtenerProducto($id: ID!) {
    obtenerProducto(id: $id) {
      id
      nombre
      descripcion
      imagen
      stock
      precio
    }
  }
`;

const CardForId = () => {
  const router = useRouter();
  const { id } = router.query;
  const { productoAgregado } = useProduct();


  const { data, loading, error } = useQuery(OBTENER_PRODUCTO, {
    variables: { id },
    skip: !id, // Evita ejecutar la consulta si no hay id
  });

  const producto = data?.obtenerProducto || [];

  if (loading) return <p className="text-center py-10">Cargando el producto...</p>;
  if (error) return <p className="text-center py-10 text-red-600">Error al cargar el producto: {error.message}</p>;

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Contenedor principal */}
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Imagen del producto */}
          {/* <img
            alt={producto.nombre}
            src={producto.imagen}
            className="rounded-lg h-96 w-full object-cover lg:w-1/2"
          /> */}
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">{producto.nombre}</h1>
            <ProductGallery imagenes={producto.imagen} />
          </div>          {/* Información del producto */}
          <div className="flex flex-col items-center lg:items-start text-justify justify-center w-full lg:w-1/2">
            <div className="bg-gray-700 flex flex-col p-6 md:p-8 justify-evenly items-center lg:items-start rounded-lg w-full lg:w-4/5">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center lg:text-left">
                {producto.nombre}
              </h2>
              <p className="text-sm md:text-lg text-white mb-4">
                <strong>Descripción del Producto:</strong> {producto.descripcion}
              </p>
              <p className="text-sm md:text-lg font-medium text-white mb-2">
                <strong>Precio:</strong> ${producto.precio}
              </p>
              <p className="text-sm md:text-lg font-medium text-white mb-6">
                <strong>Stock disponible:</strong> {producto.stock === 0 ? <strong className='text-red-500'>Producto Agotado</strong> : <strong className='text-lime-400'>{producto.stock}</strong>}
              </p>
              <Link
                href="/shop"
                className="bg-white text-gray-700 font-semibold py-2 px-6 rounded-md hover:bg-gray-300 mb-10">
                Ir a shop
              </Link>
              <button
                type="button"
                onClick={() => { 
                  productoAgregado(producto.id)
                  window.location.reload(); // Recarga la página después de agregar el producto
                }
                }
                className={`bg-white text-gray-700 font-semibold py-2 px-6 rounded-md hover:bg-gray-300 ${
                  producto.stock < 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={producto.stock < 1}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardForId;
