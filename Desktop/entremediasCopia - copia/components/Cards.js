import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useProduct } from '@/context/productsContext';


const Cards = () => {
  const { products, cantidades, handleCant, productoAgregado } = useProduct();


  return (
    <div className="bg-gray-200">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-10">
          Nuestras Colecciones de Medias que van con todo
        </h2>

        <div className="grid grid-cols-2 text-center gap-x-4 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-10">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <div className={`aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-white xl:aspect-h-6 xl:aspect-w-6`}>
                <div className="p-4">
                  {product.stock >= 1 && (
                    <div className="absolute top-0 left-0 bg-black text-white px-2 py-1 text-xs font-semibold">
                      NUEVO
                    </div>
                  )}
                  {product.stock < 1 && (
                    <>
                      <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                        <span className="text-white text-lg font-bold">PRODUCTO AGOTADO</span>
                      </div>
                      <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-xs font-semibold">
                        AGOTADO
                      </div>
                    </>
                  )}
                  <Link href={`${product.id}`} className="group">
                    <h3 className="text-xl font-semibold text-black">{product.nombre}</h3>
                  </Link>
                  <div className="flex justify-center">
                      <img
                        src={product.imagen}
                        alt={product.nombre}
                        className={`h-auto mb-2 rounded-lg ${product.cantidad < 1 ? 'opacity-75' : ''}`}
                      />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="m-3 text-black">${product.precio}</p>
                <div className="flex items-center justify-center mb-4">
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-full w-8 h-8 flex items-center justify-center"
                    onClick={(e) => handleCant(e, product.id, 1)}
                    disabled={product.stock < 1}
                  >
                    +
                  </button>
                  <span className="w-8 text-gray-700 mx-2">{cantidades[product.id] || 1}</span>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-full w-8 h-8 flex items-center justify-center"
                    onClick={(e) => handleCant(e, product.id, -1)}
                    disabled={product.stock < 1}
                  >
                    -
                  </button>
                </div>
                <button
                  type="button"
                  onClick={
                    () => { productoAgregado(product.id)
                    window.location.reload(); // Recarga la página después de agregar el producto
                  }}
                  className={`bg-indigo-400 hover:bg-indigo-900 text-gold-500 font-semibold rounded-lg w-2/4 h-10 transition-colors duration-300 ease-in-out ${
                    product.stock < 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={product.stock < 1}
                >
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Link href="https://wa.me/1234567890" target="_blank" className="fixed bottom-5 right-5 w-16 h-16 bg-green-500 text-white rounded-full shadow-lg z-50 flex items-center justify-center">
          <img src="/wsp-icon.png" alt="WhatsApp" className="w-full h-full rounded-full" />
      </Link>
      <ToastContainer />
    </div>
  );
};

export default Cards;
