const { ApolloClient, InMemoryCache, HttpLink, gql } = require ('@apollo/client');
const {fetch} = require ('node-fetch');
require('dotenv').config({ path: '.env'});

// Configurar Apollo Client para usar en el servidor
const client = new ApolloClient({
  link: new HttpLink({ uri: `${process.env.NOTIFICACION}/graphql`, fetch }),
  cache: new InMemoryCache(),
});

// Definir la mutación GraphQL
const ACTUALIZAR_ORDEN = gql`
  mutation actualizarOrden($idPago: String, $fechaDePago: String, $idClienteMp: String) {
    actualizarOrden(idPago: $idPago, fechaDePago: $fechaDePago, idClienteMp: $idClienteMp) {
        idPago
        fechaDePago
        idClienteMp
    }
  }
`;

// Función para procesar el pago (controlador Express)
const PagarProducto = async (req, res) => {
  try {
    console.log('Notificación recibida en /notificacion');

    // Confirmar la recepción de la notificación a Mercado Pago
    res.status(200).send('OK');
    const { date_created, user_id } = req.body;
    const { id } = req.query; // Obtener el ID de la notificación de la URL
    console.log(`params ${req.params}`)
    console.log(req.query, '--------------------', req.body)
    console.log('Parámetros de la notificación:', id, date_created, user_id);

    // Ejecutar la mutación para actualizar la orden
    const { data } = await client.mutate({
      mutation: ACTUALIZAR_ORDEN,
      variables: {
        idPago: id,
        fechaDePago: date_created,
        idClienteMp: user_id,
      },
    });

    console.log('Orden actualizada:', data.actualizarOrden);

// Ya estamos captando el pago, y guardandolo en la base de datos, falta poder confirmar el usuario al que va, como acoplarlo al ID del carrito al que pertenecio la compra, y asi también el carrito cambiar su estado a false, para cerrar ese carrito 


  } catch (error) {
    console.error('Error al procesar la notificación:', error);
    res.status(500).send('Error al procesar la notificación');
  }
};

module.exports = {PagarProducto};
