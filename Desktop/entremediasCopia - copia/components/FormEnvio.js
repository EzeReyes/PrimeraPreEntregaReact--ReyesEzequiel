import { useCarrito } from '@/context/cartContext';
import { useEnvio } from '@/context/envioContext';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';



const FormularioEnvio = ({ calcularTotal, actualizarTotalEnvio }) => {
    
    const {
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
        codigoPostal,
        setCodigoPostal,
        setServicioSeleccionado,
        formularioVisible,
    } = useEnvio();

        const precioServicio = deliveredType === 'A' ? 0 : parseFloat(servicioSeleccionado) || 0;
      
        const total = () => {
          const totalCalculado = calcularTotal() + precioServicio;
          actualizarTotalEnvio(totalCalculado); // Actualiza el total en el componente padre
          return totalCalculado;
        };
      
        useEffect(() => {
          total(); // Llama a la función `total` cada vez que los valores cambien
        }, [calcularTotal, precioServicio, deliveredType]);


    return (
        <>
            <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6">
                {formularioVisible ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold text-gray-800">Selecciona tu método de envío</h3>
                            <div className="space-y-3">
                                {['S', 'D', 'A'].map((tipo) => (
                                    <label key={tipo} className="flex items-center space-x-3">
                                        <input
                                            type="radio"
                                            value={tipo}
                                            name="envio"
                                            onChange={handleMetodoEnvioChange}
                                            checked={deliveredType === tipo}
                                            className="w-4 h-4 text-blue-500 border-gray-300 rounded"
                                        />
                                        <span className="text-lg">
                                            {tipo === 'S' && 'Envío a Sucursal'}
                                            {tipo === 'D' && 'Envío a Domicilio'}
                                            {tipo === 'A' && 'Acordar Envío con el Vendedor'}
                                        </span>
                                    </label>
                                ))}
                            </div>

                            {deliveredType === 'S' && (
                                <div>
                                    <h4 className="text-lg font-medium text-gray-700 mb-2">Selecciona una sucursal:</h4>
                                    {cargando ? (
                                        <p className="text-gray-500">Cargando sucursales...</p>
                                    ) : sucursales.length > 0 ? (
                                        <select
                                            value={sucursalSeleccionada}
                                            onChange={(e) => setSucursalSeleccionada(e.target.value)}
                                            className="w-full border border-gray-300 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                            {servicios.length > 0 && (
                                <div>
                                    <h4 className="text-lg font-medium text-gray-700 mb-2">Selecciona un servicio:</h4>
                                    <select
                                        value={servicioSeleccionado}
                                        onChange={(e) => setServicioSeleccionado(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Selecciona un servicio</option>
                                        {servicios.map((servicio) => (
                                            <option
                                                title={`${servicio.productName} - $${servicio.price} - de ${servicio.deliveryTimeMin} a ${servicio.deliveryTimeMax} días.`}
                                                key={servicio.code}
                                                value={servicio.code}
                                            >
                                                {servicio.price}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md mt-6 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Confirmar Envío
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="text-center">
                        <h5 className="text-2xl font-semibold text-green-600 mb-4">Datos de envío cargados</h5>
                        <p><strong>Sucursal:</strong> {sucursalSeleccionada}</p>
                        <p><strong>Servicio:</strong> {servicioSeleccionado}</p>
                        <button
                            onClick={handleModificar}
                            className="mt-6 bg-gray-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            Modificar
                        </button>
                    </div>
                )}

                {/* {mensaje && <p className="mt-4 text-center text-red-200 text-lg">{mensaje}</p>} */}
            </div>

            <div className="max-w-lg mx-auto mt-6">
                <h4 className="text-l font-semibold text-gray-400">({precioServicio === 0 ? `Producto: ${calcularTotal()}` : `Producto: ${calcularTotal()} + envio: ${precioServicio}`})</h4>
                <h4 className="text-xl font-semibold text-gray-800">Total: ${total()}</h4>
            </div>
        </>
    );
};

export default FormularioEnvio;

