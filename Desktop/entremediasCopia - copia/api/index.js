const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const conectarDB = require('../config/db');
const typeDefs = require('../db/schema');
const resolvers = require('../db/resolvers');
const Payment = require('../models/Payment');
require('dotenv').config();

async function startServer() {
  const app = express();

  // Middleware para procesar JSON
  app.use(express.json());

  // Configurar CORS
  // const corsOptions = {
  //   origin: [
  //     process.env.PRODUCTION_URL,
  //     process.env.LOCALHOST_FRONT,
  //     process.env.LOCALHOST_BACK,
  //     process.env.NGROK_URL,
  //   ],
  //   methods: ['GET', 'POST'],
  //   credentials: true,
  // };
  // app.use(cors(corsOptions));

  app.use(cors());

  // Conectar a la base de datos
  conectarDB();
  

  // Crear instancia de Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: process.env.NODE_ENV !== 'production',
    playground: process.env.NODE_ENV !== 'production',
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: false,
  });

  // Iniciar el servidor
  const PORT = process.env.PORT || 4002;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor listo en http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
