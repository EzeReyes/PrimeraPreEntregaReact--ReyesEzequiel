const enviarCorreo = require('./sendEmail');

app.post('/submit-order', async (req, res) => {
  const { cliente, productos } = req.body;

  const listaProductos = productos
    .map((p) => `<li>${p.nombre} - Cantidad: ${p.cantidad}</li>`)
    .join('');

  const mensaje = `
    <h1>Nuevo pedido recibido</h1>
    <p>Cliente: ${cliente.nombre}</p>
    <p>Email: ${cliente.email}</p>
    <p>Detalles del pedido:</p>
    <ul>${listaProductos}</ul>
    <p>Prepárate para enviar el pedido.</p>
  `;

  try {
    await enviarCorreo('Nuevo pedido recibido', mensaje);
    res.status(200).send('Pedido registrado y notificación enviada.');
  } catch (error) {
    console.error('Error al registrar el pedido o enviar notificación:', error);
    res.status(500).send('Hubo un error al procesar el pedido.');
  }
});
