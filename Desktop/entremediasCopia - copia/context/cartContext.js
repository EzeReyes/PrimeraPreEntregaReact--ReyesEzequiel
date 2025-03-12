import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { gql, useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../components/Spinner';


const CartContext = createContext();

export const useCarrito = () => useContext(CartContext);

const OBTENER_PRODUCTOS_POR_IDS = gql`
  query obtenerProductosPorIds($ids: [ID!]) {
    obtenerProductosPorIds(ids: $ids) {
      id
      nombre
      imagen
      precio
      stock
    }
  }
`;

export const CarritoProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);

    const router = useRouter();
  // Recuperar el carrito desde localStorage y almacenar tanto los IDs como las cantidades
  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productosConCantidad = carrito.map(item => ({
      id: item.id,
      cantidad: item.cantidad,
    }));

    if (productosConCantidad.length > 0) {
      setProductos(productosConCantidad);
    }
  }, []);

  const idsProductos = productos.map(product => product.id); // Extraer solo los IDs de los productos

  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS_POR_IDS, {
    variables: { ids: idsProductos },
    skip: idsProductos.length === 0, // Solo ejecuta la consulta si hay IDs
  });

  const carro = data?.obtenerProductosPorIds || [];

  // Función para calcular el total del carrito
  const calcularTotal = () => {
    return carro.reduce((acc, product) => {
      // Buscar la cantidad del producto en el estado
      const cantidad = productos.find(p => p.id === product.id)?.cantidad || 0;
      return acc + cantidad * product.precio;
    }, 0);
  };

  const cantidadEnCarrito = () => {
    return carro.reduce((acc, product) => {
      // Buscar la cantidad del producto en el estado
      const cantidad = productos.find(p => p.id === product.id)?.cantidad || 0;
      return acc + cantidad;
    }, 0);
  };

  // Función para eliminar un producto del carrito
  const handleDelete = (productoId) => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const nuevoCarrito = carrito.filter(item => item.id !== productoId);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    setProductos(nuevoCarrito.map(item => ({
      id: item.id,
      cantidad: item.cantidad,
    })));
    toast.error('Producto eliminado del carrito');
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar productos: {error.message}</p>;

  

  return (
    <CartContext.Provider value={{ carro, handleDelete, calcularTotal, productos, cantidadEnCarrito }}>
      {children}
    </CartContext.Provider>
  );
};
