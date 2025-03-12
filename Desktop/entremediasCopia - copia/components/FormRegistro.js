import { useState, useEffect } from 'react';
const FormularioEnvio = ({ provinciaSeleccionada }) => {
  const [deliveredType, setDeliveredType] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [sucursales, setSucursales] = useState([]);
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
  const [cargando, setCargando] = useState(false);
  const [tarifas, setTarifas] = useState([]);

  const handleMetodoEnvioChange = (e) => {
    const deliveredType = e.target.value;
    setDeliveredType(deliveredType);

    // Guardar el método de envío seleccionado en localStorage
    localStorage.setItem('metodoEnvio', JSON.stringify(deliveredType));

    if (deliveredType === 'S') {
      fetchSucursales();
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
      <form onSubmit={handleSubmit}>
        <h3 className="text-lg font-semibold mb-4">Selecciona tu método de envío</h3>

        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="radio"
              value="S"
              name="envio"
              onChange={handleMetodoEnvioChange}
              checked={deliveredType === 'S'}
              className="mr-2"
            />
            Envío a Sucursal
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="D"
              name="envio"
              onChange={handleMetodoEnvioChange}
              checked={deliveredType === 'D'}
              className="mr-2"
            />
            Envío a Domicilio
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="A"
              name="envio"
              onChange={handleMetodoEnvioChange}
              checked={deliveredType === 'A'}
              className="mr-2"
            />
            Acordar Envío con el Vendedor
          </label>
        </div>

        {deliveredType === 'S' && (
          <div className="mt-4">
            <h4 className="text-md font-medium mb-2">Selecciona una sucursal:</h4>
            {cargando ? (
              <p className="text-gray-500">Cargando sucursales...</p>
            ) : sucursales.length > 0 ? (
              <select
                value={sucursalSeleccionada}
                onChange={handleSucursalSeleccionada}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Selecciona una sucursal</option>
                {sucursales.map((sucursal) => (
                  <option key={sucursal.code} value={sucursal.code}>
                    {sucursal.name} - {sucursal.location.address.city} - {sucursal.location.address.streetName} {sucursal.location.address.streetNumber} - {procesarHorario(sucursal.hours)}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-red-500">No hay sucursales disponibles.</p>
            )}
          </div>
        )}

        {tarifas.length > 0 && (
          <div className="mt-4">
            <h4 className="text-md font-medium mb-2">Tarifas disponibles:</h4>
            <ul>
              {tarifas.map((tarifa, index) => (
                <li key={index} className="text-gray-700">
                  {tarifa.description}: ${tarifa.price}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md mt-6 hover:bg-blue-600"
        >
          Confirmar Envío
        </button>

        {mensaje && <p className="mt-4 text-center text-red-500">{mensaje}</p>}
      </form>
    </div>
  );
};

export default FormularioEnvio;
