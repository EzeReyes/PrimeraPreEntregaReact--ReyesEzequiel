import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useCorreoToken from '../api/useCorreoToken';


const EnvioContext = createContext();

export const useEnvio = () => useContext(EnvioContext); 


export const EnvioProvider = ({ children, total }) => {
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState({ codigo: '', nombre: '' });
  const token = useCorreoToken();
  useEffect(() => {
    if (token) {
      console.log('Token disponible para uso:', token);
      // Realiza otras acciones con el token
    }
  }, [token]);

  const [datosCliente, setDatosCliente] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    calle: '',
    numeracion: '',
    piso: '',
    departamento: '',
    localidad: '',
    codigopostal: '',
    email: '',
    aceptoTerminos: false,
  });

  const actualizarDatosCliente = (nuevoCliente) => {
    setDatosCliente((prevState) => ({
      ...prevState,
      ...nuevoCliente,
    }));
  };

    const [deliveredType, setDeliveredType] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [sucursales, setSucursales] = useState([]);
    const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
    const [servicios, setServicios] = useState([]);
    const [servicioSeleccionado, setServicioSeleccionado] = useState('');
    // const [codigoPostal, setCodigoPostal] = useState('');
    const [cargando, setCargando] = useState(false);
    const [formularioVisible, setFormularioVisible] = useState(true); // Nuevo estado
  
    useEffect(() => {
      setDeliveredType('');
      setSucursalSeleccionada('');
      setSucursales([]);
      setServicios([]);
    }, [provinciaSeleccionada]);
  
    const handleMetodoEnvioChange = async (e) => {
      const tipo = e.target.value;
      setDeliveredType(tipo);
      setSucursalSeleccionada('');
      setServicios([]);
      setMensaje('');
  
      localStorage.setItem('metodoEnvio', JSON.stringify(tipo));
  
      if (tipo === 'S') {
        await fetchSucursales();
      } else if (tipo === 'D') {
        await obtenerTarifas(tipo);
      }
    };
  
    const fetchSucursales = async () => {
      setCargando(true);
      try {
        const response = await fetch(
          `https://api.correoargentino.com.ar/micorreo/v1/agencies?customerId=0001495301&provinceCode=${provinciaSeleccionada.codigo}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (!response.ok) {
          throw new Error('Error al obtener sucursales');
        }
  
        const data = await response.json();
        setSucursales(data);
        await obtenerTarifas('S');
      } catch (error) {
        console.error('Error:', error);
        setMensaje('No se pudieron cargar las sucursales.');
      } finally {
        setCargando(false);
      }
    };
  
    const obtenerTarifas = async (tipo) => {
      setCargando(true);
      try {
        const response = await fetch(
          `https://api.correoargentino.com.ar/micorreo/v1/rates`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              customerId: process.env.NEXT_PUBLIC_CUSTOMER_ID,
              postalCodeOrigin: '7600',
              postalCodeDestination: datosCliente.codigopostal || '1704',
              deliveredType: tipo,
              dimensions: {
                weight: 2500,
                height: 10,
                width: 20,
                length: 30,
              },
            }),
          }
        );
  
        if (!response.ok) {
          throw new Error('Error al obtener tarifas');
        }
  
        const data = await response.json();
        setServicios(data.rates);
      } catch (error) {
        console.error('Error:', error);
        setMensaje('No se pudieron cargar las tarifas.');
      } finally {
        setCargando(false);
      }
    };
  
    const procesarHorario = (horarios) => {
      const diasLaborales = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
      let rango = '';
  
      const formatoHora = (hora) => `${hora.slice(0, 2)}:${hora.slice(2)}`;
  
      for (let dia of diasLaborales) {
        if (horarios[dia] && horarios[dia].start && horarios[dia].end) {
          rango = `De ${formatoHora(horarios[dia].start)} a ${formatoHora(horarios[dia].end)}`;
          break;
        }
      }
  
      return rango ? `Lunes a Viernes ${rango}` : 'Sin horarios disponibles';
    };
  
    const importar = async () => {
      try {
        const response = await fetch(
          `https://api.correoargentino.com.ar/micorreo/v1/shipping/import`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              customerId: process.env.NEXT_PUBLIC_CUSTOMER_ID,
              extOrderId: uuidv4(), // Genera un número aleatorio entre 0 y 99999
              orderNumber: uuidv4().slice(0, 8), // Genera un número aleatorio entre 0 y 9999
              sender: {
              name: process.env.NEXT_PUBLIC_NAME,
              phone: process.env.NEXT_PUBLIC_PHONE,
              cellPhone: process.env.NEXT_PUBLIC_PHONE,
              email: process.env.NEXT_PUBLIC_EMAIL,
              originAddress: {
              streetName: process.env.NEXT_PUBLIC_DIRECCION,
              streetNumber: "2721",
              floor: null,
              apartment: null,
              city: "Mar del Plata",
              provinceCode: "B",
              postalCode: "7600"
                }},
              recipient: {
              name: datosCliente.nombre || null,
              phone: datosCliente.telefono,
              cellPhone: datosCliente.telefono,
              email: datosCliente.email || null
              },
              shipping: {
              deliveryType: deliveredType,
              agency: deliveredType === "S" ? sucursalSeleccionada : undefined,
              address: {
              streetName: datosCliente.calle,
              streetNumber: datosCliente.numeracion,
              floor: datosCliente.piso,
              apartment: datosCliente.departamento,
              city: datosCliente.localidad,
              provinceCode: provinciaSeleccionada.codigo,
              postalCode: datosCliente.codigopostal
              },
              weight: 1000,
              declaredValue: total,
              height: 20,
              length: 40,
              width: 20
              }
            })
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error:', errorData);
    setMensaje(`Error: ${errorData.message || 'No se pudo procesar la solicitud.'}`);
    return;
  }
  

  const data = await response.json();
  setServicios(data.rates);
} catch (error) {
  console.error('Error:', error);
  setMensaje('No se pudieron cargar las tarifas.');
} finally {
  setCargando(false);
}
};

const validarDatosEnvio = () => {
  if (!datosCliente.nombre || !datosCliente.email) {
    setMensaje('Faltan datos del cliente.');
    return false;
  }
  if (deliveredType === 'S' && !sucursalSeleccionada) {
    setMensaje('Por favor, selecciona una sucursal.');
    return false;
  }
  return true;
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (!validarDatosEnvio()) {
    return;
  }

  if (!deliveredType) {
    setMensaje('Por favor, selecciona un método de envío.');
    return;
  }

  if (deliveredType === 'S' && !sucursalSeleccionada) {
    setMensaje('Por favor, selecciona una sucursal.');
    return;
  }

  setMensaje('Envio importado con éxito');
  importar(); // Importa la orden
  setFormularioVisible(false); // Solo cambia visibilidad, no afecta datos
};

  
    const handleModificar = () => {
      setFormularioVisible(true); // Reactiva el formulario
    };


  return (
    <EnvioContext.Provider value={{ 
        handleMetodoEnvioChange,
        handleModificar,
        handleSubmit,
        procesarHorario,
        deliveredType,
        mensaje,
        sucursales,
        cargando,
        sucursalSeleccionada,
        servicios,
        servicioSeleccionado,
        setSucursalSeleccionada,
        setServicioSeleccionado,
        formularioVisible,
        actualizarDatosCliente,
        datosCliente,
        setDatosCliente,
        provinciaSeleccionada,
        setProvinciaSeleccionada,  
        // extOrderId,
        // orderNumber, 
        // deliveryType   
     }}>
      {children}
    </EnvioContext.Provider>
  );
};