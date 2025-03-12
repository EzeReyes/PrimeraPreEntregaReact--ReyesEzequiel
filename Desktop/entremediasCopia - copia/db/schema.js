const { gql } = require ('apollo-server');


// Schema
const typeDefs = gql`
    
#El type es lo que me retorna la consulta

type Cliente {
        id: ID!
        nombre: String!
        apellido: String!
        telefono: String!
        domicilio: String!
        localidad: String!
        codigopostal: String!
        email: String!
        provincia: String!
        creado: String
}


type Categoria {
  id: ID
  nombre: String
  descripcion: String
  productos: [Producto]
  imagen: String
  creado: String
}


# Definición del tipo Orden, para la respuesta de la mutación

# Definición del tipo de la orden, para la respuesta de la mutación
type Orden {
  id: ID!
  nombre: String!
  apellido: String!
  telefono: String!
  calle: String!
  numero: String!
  localidad: String!
  provincia: String!
  codigoPostal: String!
  email: String!
  productos: [OrdenProducto!]!
}


    
type Producto {
        id: ID!
        nombre: String
        descripcion: String
        categoria: Categoria
        imagen: [String]
        stock: Int
        precio: Float
        creado: String
}

type CarritoItem {
  id: ID!
  producto: Producto
  cantidad: Int!
}

type Carrito {
  id: ID!
  cliente: [Cliente]
  items: [CarritoItem]
  total: Float!
  creado: String!
  fechaCreacion: String!
  activo: Boolean!
}




type DatosCliente {
  carrito: Carrito
  datosCliente: Cliente
}

type DatosNotificacion {
  id: String!
  approved: String!
  external_reference: String!
  merchant_order_id: String!
}

type MensajeRespuesta {
  mensaje: String!
}

type Payment {
  id: ID!
  topic: String!
  created_at: String!
}
  
type OrdenProducto {
  productoId: ID!
  nombre: String!
  precio: Float!
  cantidad: Int
}
  type NotificationResponse {
    success: Boolean
    message: String
    data: Payment
  }

#El input es lo que le tengo que pasar al momento de crear, modificar, etc, seria al momento de realizar la consulta

# Input para los productos dentro de la orden
input OrdenInput {
  productoId: ID!
  nombre: String!
  precio: Float!
  cantidad: Int
}

input ProductoInput {
        nombre: String!
        stock: Int!
        precio: Float!
        descripcion: String!
        imagen: [String]!
}

input NotificationInput {
  id: String!
  status: String!
  external_reference: String!
}

type PaymentResponse {
  success: Boolean!
  message: String
  data: DatosNotificacion
}
    input ClienteInput {
        nombre: String!
        apellido: String!
        telefono: String!
        domicilio: String!
        localidad: String!
        codigopostal: String!
        email: String!
        provincia: String!
        aceptoTerminos: Boolean
    }

input NotificationData {
    id: String!
    topic: String!
    status: String
    external_reference: String
    merchant_order_id: String
  }

input CategoriaInput {
        nombre: String!
        descripcion: String!
        imagen: String!
    }

type Query {
        #Clientes
        obtenerClientes: [Cliente]
        datosCliente: DatosCliente


        #Productos
        obtenerProductos: [Producto]
        obtenerProducto(id: ID!) : Producto
        obtenerProductosPorIds(ids: [ID]): [Producto]

        #Categoria
        obtenerCategorias: [Categoria]
        obtenerCategoria(id: ID!) : Categoria

        #Carrito
        obtenerCarrito: Carrito
        obtenerCarritoId(id: ID!) : [Carrito]
        #Ordenes
        obtenerOrdenes: [Orden]

        #Payments
        GetPaymentDetails(id: ID!) : Payment
} 

#Mutation se utiliza para crear, modificar o borrar una entidad 
type Mutation {
        #Productos
        nuevoProducto(input: ProductoInput) : Producto
        actualizarProducto( id: ID!, input : ProductoInput ) : Producto
        eliminarProducto( id: ID!) : String

        #Clientes
        nuevoCliente(input: ClienteInput) : Cliente
        actualizarCliente(id: ID!, input: ClienteInput) : Cliente
        eliminarCliente(id: ID!) : String

        #CARRITO
        agregarACarro(id: String, cantidad: Int!) : Carrito
        eliminarProductoDelCarro(productoId: ID!) : Carrito

        #ORDEN DE COMPRA
# Mutación para crear una nueva orden de compra

  nuevaOrden(
    nombre: String!,
    apellido: String!,
    telefono: String!,
    calle: String!,
    numero: String!,
    localidad: String!,
    provincia: String!,
    codigoPostal: String!,
    email: String!,
    productos: [OrdenInput!]!
  ): Orden


        #COMPRA
          crearPreferencia(amount: Float!, nombre: String!, apellido: String!, email: String!, telefono: String!): String
    handleExternalNotification(data: NotificationData!): NotificationResponse

        restablecerContrasena(token: String!, nuevaContrasena: String!): MensajeRespuesta
      
        enviarCorreoRecuperacion(email: String!): String
}
    


`;

module.exports = typeDefs;