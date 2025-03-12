import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { gql, useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../components/Spinner';

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext); 

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      imagen
      precio
      stock
    }
  }
`;

export const ProductProvider = ({ children }) => {
    const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

    const [cantidades, setCantidades] = useState({});
    
    const products = data?.obtenerProductos || [];

    // Actualiza la cantidad de un producto
    const handleCant = (e, idProducto, cambio) => {
      e.preventDefault();
      setCantidades((prevCantidades) => {
        const nuevaCantidad = (prevCantidades[idProducto] || 1) + cambio;
        return {
          ...prevCantidades,
          [idProducto]: nuevaCantidad > 0 ? nuevaCantidad : 1,
        };
      });
    };
  
    // Agrega el producto al carrito en localStorage
    const agregarAlCarritoLocal = (productoID, cantidad) => {
      // Obtiene el carrito existente de localStorage
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
      // Verifica si el producto ya está en el carrito
      const productoEnCarrito = carrito.find((item) => item.id === productoID);
  

      if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad;
      } else {
        carrito.push({ id: productoID, cantidad });
      }
      if (loading) {
        return (
          <>
            <h5>Cargando ....</h5>
            <Spinner />
          </>
        );
      }
      // Actualiza el carrito en localStorage
      localStorage.setItem('carrito', JSON.stringify(carrito));
      toast.success('Producto agregado al carrito');
    };
  
    // Llamada al agregar al carrito con localStorage
    const productoAgregado = (productoID) => {
      const cantidad = cantidades[productoID] || 1;
      agregarAlCarritoLocal(productoID, cantidad);
    };
  
    if (loading) {
      return (
        <>
          <h5>Cargando ....</h5>
          <Spinner />
        </>
      );
    }
  
    
    if (error) return <p>Error al cargar productos: {error.message}</p>;
  


  return (
    <ProductContext.Provider value={{ products, cantidades, handleCant, productoAgregado }}>
      {children}
    </ProductContext.Provider>
  );
};
