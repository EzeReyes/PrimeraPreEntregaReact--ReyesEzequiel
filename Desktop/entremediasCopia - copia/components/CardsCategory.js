import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const OBTENER_PRODUCTOS_POR_CATEGORIA = gql`
  query ObtenerCategoria($id: ID!) {
    obtenerCategoria(id: $id) {
      productos {
        id
        nombre
        descripcion
        precio
        imagen
      }
    }
  }
`;

const CardsCategory = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS_POR_CATEGORIA, {
    variables: { id },
    skip: !id, // Evita ejecutar la consulta si no hay id
  });

  const products = data?.obtenerCategoria?.productos || [];

  if (loading) return <p className="text-center mt-10">Cargando los productos...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error al cargar los productos: {error.message}</p>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((producto) => (
            <div key={producto.id} className="flex flex-col bg-gray-100 shadow-lg rounded-lg overflow-hidden">
              {/* Imagen del producto */}
              <img
                alt={producto.nombre}
                src={producto.imagen}
                className="h-60 w-full object-cover object-center group-hover:opacity-75"
              />
              {/* Contenido del producto */}
              <div className="flex flex-col items-start p-6">
                <h2 className="text-lg font-bold text-gray-900">{producto.nombre}</h2>
                <p className="mt-2 text-sm text-gray-600">{producto.descripcion}</p>
                <p className="mt-4 text-xl font-semibold text-gray-900">${producto.precio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsCategory;


