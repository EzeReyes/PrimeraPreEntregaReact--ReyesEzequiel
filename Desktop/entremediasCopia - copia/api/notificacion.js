const axios = require('axios');

require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());  // Middleware para procesar el cuerpo en formato JSON

// Endpoint para manejar notificaciones de Mercado Pago
app.post('/notificacion', async (req, res) => {
  try {
    const { data, type } = req.body;

    console.log('Datos recibidos:', { data, type });

    // Validación de los datos recibidos
    if (!data?.id || !type) {
      console.error('Notificación inválida:', { query: req.query, body: req.body });
      return res.status(400).send('Datos de notificación inválidos');
    }

    // Enviar la notificación a GraphQL
    const graphqlQuery = {
      query: `
        mutation HandleExternalNotification($data: NotificationData!) {
          handleExternalNotification(data: $data) {
            success
            message
            data {
              id
              topic
              created_at
            }
          }
        }
      `,
      variables: {
        data: {
          id: data.id,
          topic: type,
          status: data.status, // Agrega más campos si es necesario
          external_reference: data.external_reference,
          merchant_order_id: data.merchant_order_id,
        },
      },
    };

    const response = await axios.post(`${process.env.PRODUCTION_URL}/graphql`, graphqlQuery, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Respuesta de GraphQL:', response.data);
    res.status(200).send('Webhook recibido correctamente');
  } catch (error) {
    console.error('Error procesando el webhook:', error.message);
    res.status(500).send('Error procesando el webhook');
  }
});

// Exportar la app para que pueda ser usada por el servidor de Express principal
module.exports = app;
