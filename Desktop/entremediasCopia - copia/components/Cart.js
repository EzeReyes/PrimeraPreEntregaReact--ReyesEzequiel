import React, { useState } from 'react';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCarrito } from '../context/cartContext';
import { EnvioProvider, useEnvio } from '../context/envioContext'; // Importar el contexto
import FormularioEnvio from "./FormEnvio";
import FormCliente from './FormCliente';
import { gql, useQuery, useMutation } from '@apollo/client';


const CREAR_PREFERENCIA = gql`
  mutation crearPreferencia($amount: Float!, $nombre: String!, $apellido: String!, $email: String!, $telefono: String!) {
    crearPreferencia(amount: $amount, nombre: $nombre, apellido: $apellido, email: $email, telefono: $telefono)
  }
`;

export default function Cart() {
  const [crearPreferencia] = useMutation(CREAR_PREFERENCIA);
  const [errores, setErrores] = useState({});
  const { carro, handleDelete, calcularTotal, productos } = useCarrito();
  const [cliente, setCliente] = useState(null); // Aquí almacenamos los datos del cliente

  const [totalEnvio, setTotalEnvio] = useState(0);

  const actualizarTotalEnvio = (nuevoTotal) => {
    setTotalEnvio(nuevoTotal);
  };

  const agregarCliente = async (datosCliente) => {
    setCliente(datosCliente);
  };

  React.useEffect(() => {
    console.log('Los datos del cliente actualizados:', cliente?.nombre);
  }, [cliente]);
  

  // VER COMO PUEDO PASAR EL CARRO A EMAIL

  const crearPref = async () => {
    try {
      const { data } = await crearPreferencia({
        variables: {
          amount: parseFloat(totalEnvio),
          nombre: cliente?.nombre,
          apellido: cliente?.apellido,
          email: cliente?.email,
          telefono: cliente?.telefono
        },
      });


  
      if (!data || !data.crearPreferencia) {
        throw new Error("El servidor no devolvió una preferencia válida");
      }
  
      console.log("Preferencia creada:", data.crearPreferencia);
      window.location.replace(data.crearPreferencia);
    } catch (error) {
      console.error("Error al crear la preferencia de Mercado Pago:", error);
    }
  };
  

  return (
    <div className="mt-8 min-h-screen flex flex-col justify-between">
      <div className="flow-root">
        {!productos || productos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-center text-lg font-semibold text-gray-600">Su carrito está vacío</p>
            <Link
              href="/shop"
              className="bg-white text-gray-700 font-semibold py-2 px-6 rounded-md hover:bg-gray-300 mt-4"
            >
              Ir a shop
            </Link>
          </div>
        ) : (
          carro.map((product) => (
            <ul className="-my-6 divide-y divide-gray-200" key={product.id}>
              <li className="flex items-center justify-center py-4 mx-5">
                <div className="h-48 w-48 flex-shrink-0 overflow-hidden rounded-lg border border-gray-300">
                  <Link href={`/${product.id}`}>
                    <img
                      alt={product.nombre}
                      src={product.imagen}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                </div>
                <div className="h-48 w-48 ml-4 flex flex-col">
                  <button
                    type="button"
                    onClick={() => handleDelete(product.id)}
                    className="text-2xl text-right font-medium text-red-500 hover:text-red-600 transition"
                  >
                    X
                  </button>
                  <div className="text-base font-medium text-gray-800">
                    <p>{product.nombre}</p>
                  </div>
                  <p className="mt-1 text-xl text-gray-500">Precio: ${product.precio}</p>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <p className="text-gray-500">
                      Cantidad: {productos.find((p) => p.id === product.id)?.cantidad}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          ))
        )}
      </div>
      {productos.length !== 0 && (
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="text-center text-base font-medium text-gray-800">
            <p>Subtotal</p>
            <p>${calcularTotal()}</p>
            <p className="mt-2 text-sm text-gray-500">
              El valor subtotal no incluye gastos de envío. 
            </p>

            <hr className="border-t border-black w-4/5 mx-auto my-10" />
            <h3 className='my-6'>Datos de envio</h3>
            
            {/* Envolvemos FormularioEnvio con el EnvioProvider */}

            <EnvioProvider total={calcularTotal()} >
            <FormCliente total={calcularTotal()} enviarDatos={agregarCliente} />
            <FormularioEnvio calcularTotal={calcularTotal} actualizarTotalEnvio={actualizarTotalEnvio} />
            </EnvioProvider>
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Evita la recarga de la página
                crearPref(); // Llama a la función para crear la preferencia
              }}
            >
              <button
                type="submit"
                title="Al clickear aquí será redirigido a la pasarela de MercadoPago"
                className="w-40 bg-blue-600 text-white font-semibold py-3 rounded-md my-10 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Ir a pagar
              </button>
            </form>

          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

