import { useState, useEffect } from 'react';
require('dotenv').config();

let tokenExpiration = null; // Variable global para manejar la expiración del token
const username = process.env.NEXT_PUBLIC_CORREO_USERNAME;
const password = process.env.NEXT_PUBLIC_CORREO_PASSWORD;
console.log(process.env.NEXT_PUBLIC_CORREO_USERNAME, password);

const useCorreoToken = () => {
  const [token, setToken] = useState('');

  const obtenerToken = async () => {
    try {
      // Si el token ya existe y no ha expirado, reutilizarlo
      if (token && tokenExpiration && Date.now() < tokenExpiration) {
        console.log('Reutilizando token existente');
        return;
      }

      
      const response = await fetch(`https://api.correoargentino.com.ar/micorreo/v1/token`, {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + Buffer.from(`${process.env.NEXT_PUBLIC_CORREO_USERNAME}:${process.env.NEXT_PUBLIC_CORREO_PASSWORD}`).toString('base64'),
        },
      });

      if (!response.ok) {
        throw new Error(`Error al obtener el token: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      setToken(data.token); // Guardar el token en el estado
      tokenExpiration = Date.now() + data.expire * 1000; // Calcular el tiempo de expiración
      console.log('Token obtenido:', data.token);
    } catch (error) {
      console.error('Error al obtener el token:', error.message);
    }
  };

  useEffect(() => {
    obtenerToken(); // Obtener el token al montar el componente
  }, []);

  return token; // Retornar el token para usarlo en otros componentes
};

export default useCorreoToken;
