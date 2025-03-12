import React, { useState } from "react";
import { gql, useQuery, useMutation } from '@apollo/client';
import { useEnvio } from "@/context/envioContext";
import { useCarrito } from '../context/cartContext';


const provincias = [
  { codigo: 'A', nombre: 'Salta' },
  { codigo: 'B', nombre: 'Provincia de Buenos Aires' },
  { codigo: 'C', nombre: 'Ciudad Autónoma de Buenos Aires' },
  { codigo: 'D', nombre: 'San Luis' },
  { codigo: 'E', nombre: 'Entre Ríos' },
  { codigo: 'F', nombre: 'La Rioja' },
  { codigo: 'G', nombre: 'Santiago del Estero' },
  { codigo: 'H', nombre: 'Chaco' },
  { codigo: 'J', nombre: 'San Juan' },
  { codigo: 'K', nombre: 'Catamarca' },
  { codigo: 'L', nombre: 'La Pampa' },
  { codigo: 'M', nombre: 'Mendoza' },
  { codigo: 'N', nombre: 'Misiones' },
  { codigo: 'P', nombre: 'Formosa' },
  { codigo: 'Q', nombre: 'Neuquén' },
  { codigo: 'R', nombre: 'Río Negro' },
  { codigo: 'S', nombre: 'Santa Fe' },
  { codigo: 'T', nombre: 'Tucumán' },
  { codigo: 'U', nombre: 'Chubut' },
  { codigo: 'V', nombre: 'Tierra del Fuego' },
  { codigo: 'W', nombre: 'Corrientes' },
  { codigo: 'X', nombre: 'Córdoba' },
  { codigo: 'Y', nombre: 'Jujuy' },
  { codigo: 'Z', nombre: 'Santa Cruz' },
];

    const NUEVA_ORDEN = gql`
    mutation nuevaOrden($nombre: String!, $apellido: String!, $telefono: String!, $calle: String!, $numero: String! $localidad: String!, $provincia: String!, $codigoPostal: String!, $email: String!, $productos: [OrdenInput!]!) {
      nuevaOrden(nombre: $nombre, apellido: $apellido, telefono: $telefono, calle: $calle, numero: $numero, localidad: $localidad, provincia: $provincia, codigoPostal: $codigoPostal, email: $email, productos: $productos) {
        id
      }
    }
  `;



const FormCliente = ({ total, enviarDatos }) => {
  const { actualizarDatosCliente, setProvinciaSeleccionada, datosCliente, setDatosCliente } = useEnvio(); // Obtén la función del contexto
  const [provincia, setProvincia] = useState({ codigo: '', nombre: '' });
    const [mensaje, setMensaje] = useState('');
    const [errores, setErrores] = useState({});    
    const [nuevaOrden] = useMutation(NUEVA_ORDEN);
    const { carro, productos } = useCarrito();  

    // Función para manejar el cambio en los inputs del formulario
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setDatosCliente({
        ...datosCliente,
        [name]: type === 'checkbox' ? checked : value, // Maneja el checkbox de "aceptoTerminos"
      });
    };

    const handleProvinciaChange = (e) => {
      const codigo = e.target.value;
      const nombre = provincias.find((prov) => prov.codigo === codigo)?.nombre || '';
      setProvincia({ codigo, nombre }); // Actualiza el estado local
      setProvinciaSeleccionada({ codigo, nombre }); // Actualiza en el contexto
    };

    const finalizarCompra = async () => {
      try {
        // Mapeamos los productos del carrito para ajustarlos al formato esperado por la mutación
        const productosOrden = carro.map((producto) => ({
          productoId: producto.id,  // Asegúrate de que el campo 'id' del producto sea un ObjectId válido
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: productos.find((p) => p.id === producto.id)?.cantidad
        }));
    
        // Preparamos las variables que se pasarán a la mutación
        const variables = {
          nombre: datosCliente.nombre,
          apellido: datosCliente.apellido,
          telefono: datosCliente.telefono,
          calle: datosCliente.calle,
          numero: datosCliente.numeracion,
          localidad: datosCliente.localidad,
          provincia: provincia.nombre,  // Usando el nombre de la provincia seleccionada
          codigoPostal: datosCliente.codigopostal,
          email: datosCliente.email,
          productos: productosOrden  // Pasamos los productos correctamente formateados
        };


    
        console.log(variables)
        // Realizamos la llamada a la mutación
        const { data } = await nuevaOrden({ variables });
    
        console.log(variables)
        // Verificamos si la orden fue creada exitosamente
        if (data.nuevaOrden) {
          console.log('Orden creada exitosamente:', data.nuevaOrden);
          // Redirigir al usuario a la pasarela de Mercado Pago (esto es un ejemplo)
          // window.location.replace(data.crearPreferencia);  // Aquí pasas la URL de Mercado Pago si es necesario
        }
      } catch (error) {
        console.error('Error al crear la orden:', error);
        alert('Hubo un error al procesar su compra. Por favor, intente nuevamente.');
      }
    };

    // Función para manejar el envío del formulario
      const handleSubmit = async (e) => {
        e.preventDefault();        
      datosCliente.provincia = provincia;
      // Aquí puedes validar los datos o mostrar mensajes de error si es necesario
      if (datosCliente.aceptoTerminos) {
        // Actualiza el contexto con los datos del cliente
        actualizarDatosCliente({
          ...datosCliente,
          provincia,
        });
        enviarDatos(datosCliente);
            setMensaje('Datos de cliente enviados correctamente!');
        await finalizarCompra();
        // Si necesitas realizar otras acciones (como enviar la orden o hacer una mutación), hazlo aquí.
      } else {
        setErrores({ aceptoTerminos: 'Debes aceptar los términos para continuar' });
      }
    };
  
    return (
<form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">Información del Cliente</h2>

  <div>
              <label className="block text-sm font-medium text-gray-700">Provincia: *</label>
              <select
                name="provincia"
                value={provincia.codigo}
                onChange={handleProvinciaChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Seleccione una provincia</option>
                {provincias.map((provincia) => (
                  <option key={provincia.codigo} value={provincia.codigo}>
                    {provincia.nombre}
                  </option>
                ))}
              </select>
              {errores.provincia && <p className="text-red-500 text-xs mt-1">{errores.provincia}</p>}
            </div>

  <div className="mb-4">
    <label htmlFor="nombre" className="block text-sm font-medium text-gray-600">
      Nombre
    </label>
    <input
      type="text"
      id="nombre"
      name="nombre"
      value={datosCliente.nombre}
      onChange={handleChange}
      className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="apellido" className="block text-sm font-medium text-gray-600">
      Apellido
    </label>
    <input
      type="text"
      id="apellido"
      name="apellido"
      value={datosCliente.apellido}
      onChange={handleChange}
      className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="telefono" className="block text-sm font-medium text-gray-600">
      Teléfono
    </label>
    <input
      type="text"
      id="telefono"
      name="telefono"
      value={datosCliente.telefono}
      onChange={handleChange}
      className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="calle" className="block text-sm font-medium text-gray-600">
      Calle
    </label>
    <input
      type="text"
      id="calle"
      name="calle"
      value={datosCliente.calle}
      onChange={handleChange}
      className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="numeracion" className="block text-sm font-medium text-gray-600">
      Numeración
    </label>
    <input
      type="text"
      id="numeracion"
      name="numeracion"
      value={datosCliente.numeracion}
      onChange={handleChange}
      className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="localidad" className="block text-sm font-medium text-gray-600">
      Localidad
    </label>
    <input
      type="text"
      id="localidad"
      name="localidad"
      value={datosCliente.localidad}
      onChange={handleChange}
      className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="codigopostal" className="block text-sm font-medium text-gray-600">
      Código Postal
    </label>
    <input
      type="text"
      id="codigopostal"
      name="codigopostal"
      value={datosCliente.codigopostal}
      onChange={handleChange}
      className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="email" className="block text-sm font-medium text-gray-600">
      Email
    </label>
    <input
      type="email"
      id="email"
      name="email"
      value={datosCliente.email}
      onChange={handleChange}
      className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
    />
  </div>

  <div className="mb-4">
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        name="aceptoTerminos"
        checked={datosCliente.aceptoTerminos}
        onChange={handleChange}
        className="rounded border-gray-300 text-gray-600 focus:ring-gray-500"
      />
      <span className="ml-2 text-sm text-gray-600">Acepto los términos y condiciones</span>
    </label>
    {errores.aceptoTerminos && <p className="text-sm text-red-500 mt-1">{errores.aceptoTerminos}</p>}
  </div>

  <button
    type="submit"
    className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
  >
    Enviar Datos
  </button>

  {mensaje && <p className="mt-4 text-sm text-green-600">{mensaje}</p>}
</form>

    );
  };
  
  export default FormCliente;
