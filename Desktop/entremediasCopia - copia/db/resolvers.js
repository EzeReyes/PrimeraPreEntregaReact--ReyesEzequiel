const  Producto  = require('../models/Producto');
const Cliente = require('../models/Cliente');
const Carrito = require('../models/Carrito');
const Categoria = require('../models/Categoria');
const Orden = require('../models/Orden');
require('dotenv').config({ path: '.env'});
const { MercadoPagoConfig, Preference} = require('mercadopago');
// Initialize the client object
const client = new MercadoPagoConfig({ accessToken: process.env.NEXT_PUBLIC_MP_ACCESS_TOKEN_PRUEBA, options: { timeout: 5000 } });
const { Types } = require('mongoose');
const Payment = require('../models/Payment');
const BACKEND_URL = process.env.NGROK_URL || process.env.PRODUCTION_URL
// Initialize the API object
const preference = new Preference(client);
const nodemailer = require('nodemailer');
require('dotenv').config();

function generarCodigoUnico() {
  const timestamp = Date.now(); // Tiempo actual en milisegundos
  const random = Math.floor(Math.random() * 1000000); // Número aleatorio entre 0 y 999999
  return `${timestamp}-${random}`; // Combina ambos valores
}

// Usar el código generado
const externalReference = generarCodigoUnico();
console.log('Código único generado:', externalReference);


// Configuración de nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

const enviarCorreo = async (asunto, mensaje, destinatario) => {
  const mailOptions = {
    from: process.env.MAILTRAP_USER,
    to: destinatario,
    subject: asunto,
    html: mensaje,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado exitosamente.');
  } catch (error) {
    console.error('Error al enviar el correo:', error.message);
    throw new Error('No se pudo enviar el correo.');
  }
};


// Resolvers
const resolvers = {
    Query: {
      obtenerCategorias: async () => {
        try {
            const categorias = await Categoria.find({});
            return categorias;
        }catch (error) {
            console.log(error);
        }
    },
    obtenerCategoria: async (_, { id }) => {
      const categoria = await Categoria.findById(id);
      console.log('Antes de populate:', categoria);
    
      const categoriaPopulada = await Categoria.findById(id).populate('productos');
      console.log('Después de populate:', categoriaPopulada);
    
      if (!categoriaPopulada) {
        throw new Error('Categoría no encontrada');
      }
    
      return categoriaPopulada;
    },
    
        obtenerProductos: async () => {
            try {
              const productos = await Producto.find().sort({ stock: -1, nombre: 1 });              // Ordena por stock (descendente)
                return productos;
            }catch (error) {
                console.log(error);
            }
        },
        obtenerProducto: async (_, {id} ) => {
          //  Revisar si el producto existe o no
          const producto = await Producto.findById(id)

          if(!producto) {
              throw new Error ('Producto no encontrado')
          }

          return producto;

      },
        obtenerProductosPorIds: async (_, { ids }) => {
            console.log("IDs recibidos:", ids); // Verifica los datos de entrada
      
            try {
              // Convertir los IDs a ObjectId de Mongoose
              const objectIds = ids.map(id => new Types.ObjectId(id));
              
              // Buscar los productos en la base de datos por los ObjectIds
              const productos = await Producto.find({ _id: { $in: objectIds } });
      
              // Devolver los productos encontrados
              return productos;
            } catch (error) {
              console.error("Error al obtener productos:", error);
              throw new Error("Hubo un problema al recuperar los productos.");
            }
          },
        obtenerClientes: async (_, {id}) => {
            try {
                const clientes = await Cliente.find({});
                return clientes;
            } catch (error) {
                console.log(error)
            }
        },

        obtenerCarrito: async (_, __, { cliente }) => {
            try {
              if (!cliente) {
                throw new Error('Token expirado o no autenticado');
              }
          
              const idCliente = cliente.id;
              const carrito = await Carrito.findOne({ cliente: idCliente }).populate('items.producto');
          
              if (!carrito) {
                throw new Error('Carrito no encontrado para este cliente');
              }
          
              return carrito;
            } catch (error) {
              throw new Error(error.message);
            }
          },
          
          obtenerCarritoId : async (_, {id}) => {
                        // Revisar si el carrito existe o no

            const carrito = await Carrito.findById(id)
            if(!carrito) {
                throw new Error ('Carrito no encontrado');
            }

            // Quien lo creo puede verlo
            console.log(carrito);
            return carrito;

          },
            obtenerOrdenes : async () => {
                try {
                    // Obtén todos los carritos y usa populate para los productos
                    const ordenes = await Orden.find();
                    console.log(`Todas las ordenes ${ordenes}`);
                                  return ordenes;
                  } catch (error) {
                    console.error('Error al obtener todas las ordenes:', error);
                    throw new Error('Error al obtener todas las ordenes');
                  }
            },

            datosCliente: async (_, __, { cliente }) => {
                try {

            
                    console.log(`Datos del Carrito: ${JSON.stringify(carrito, null, 2)}. 
                        
                        Datos del Cliente: ${JSON.stringify(datosCliente, null, 2)}`
                    );
            
                    return {
                        carrito,
                        datosCliente
                    } // Devolver el carrito del cliente
                } catch (error) {
                    throw new Error(error.message);
                }
            },
            GetPaymentDetails: async (_, { id }) => {
              // Reemplaza `db` con tu instancia real de la base de datos
              const payment = await Payment.findOne({ id });
              if (!payment) throw new Error('Pago no encontrado');
              return payment;
            },
                          },
    Mutation: {
      nuevoProducto: async (_, { input }) => {
        try {
          const { nombre, descripcion, categoria, imagen, stock, precio } = input;
      
          // Crear el producto
          const nuevoProducto = new Producto({
            nombre,
            descripcion,
            categoria,
            imagen,
            stock,
            precio,
          });
      
          const productoCreado = await nuevoProducto.save();
      
          // Actualizar el campo `productos` en la categoría correspondiente
          await Categoria.findByIdAndUpdate(
            categoria, // ID de la categoría asociada
            { $push: { productos: productoCreado._id } }, // Agregar el ID del producto al array `productos`
            { new: true } // Devuelve la categoría actualizada
          );
      
          return productoCreado;
        } catch (error) {
          console.error("Error al crear el producto:", error);
          throw new Error("Hubo un error al crear el producto.");
        }
      },
      
        actualizarProducto:  async (_, {id, input}) => {
               //  Revisar si el producto existe o no
            let producto = await Producto.findById(id);

                if(!producto) {
                    throw new Error ('Producto no encontrado')
                }

                // Guardar producto modificado en la base de datos
                producto = await Producto.findOneAndUpdate({_id : id}, input, { new: true});

                return producto;
        },
        eliminarProducto : async (_, {id}) => {
        //  Revisar si el producto existe o no
            let producto = await Producto.findById(id);

                if(!producto) {
                    throw new Error ('Producto no encontrado')
                }
            
            // Eliminar el producto
            await Producto.findOneAndDelete({_id : id});

            return ('Producto Eliminado');
        },
        agregarACarro: async (_, { id, cantidad }, { cliente }) => {
            try {
                // Verificar que el cliente está autenticado
                if (!cliente) {
                    throw new Error('No estás autenticado');
                }
        
                const idCliente = cliente.id; // Obtén el ID del cliente desde el token
        
                // Verificar si el cliente existe en la base de datos
                const clienteData = await Cliente.findById(idCliente);
                if (!clienteData) {
                    throw new Error('Cliente no encontrado');
                }
        
                // Verificar si el producto existe
                let producto = await Producto.findById(id);
                if (!producto) {
                    throw new Error('Producto no encontrado');
                }


                console.log(`Producto encontrado: ${producto.id}`);
                const idToString = producto.id.toString();

        
                // Verificar si hay suficiente stock
                if (producto.stock < cantidad) {
                    throw new Error('No disponible');
                }
        
                // Restar la cantidad de stock del producto
                producto.stock -= cantidad;
                await producto.save(); // Guardar el producto actualizado
        
                // Buscar el carrito del cliente
                let carrito = await Carrito.findOne({ cliente: idCliente });
                if (carrito) {
                    // Verificar si el producto ya está en el carrito
                    const itemIndex = carrito.items.findIndex(item => item.producto.toString() === id);
                    
                    if (itemIndex > -1) {
                        // Si el producto ya está en el carrito, sumar la cantidad
                        carrito.items[itemIndex].cantidad += cantidad;
                    } else {
                        // Si no está, agregar el producto al carrito
                        carrito.items.push({
                            producto: producto.id, // Convertir ObjectId a cadena
                            cantidad: cantidad
                        });
                    }
                } else {
                    // Si no existe un carrito, crear uno nuevo para este cliente
                    carrito = new Carrito({
                        items: [{
                            producto: idToString, // Convertir ObjectId a cadena
                            cantidad: cantidad
                        }],
                        cliente: idCliente, // Asociar el carrito con el cliente,
                        activo: true
                    });
                }
                console.log('Carrito', carrito.items)

                await carrito.save(); // Guardar el carrito actualizado
        
                carrito = await carrito.populate('items.producto'); 

                return carrito; // Retornar el carrito actualizado
            } catch (error) {
                console.error('Error al agregar al carrito:', error); // Log del error
                throw new Error('Error al agregar el producto al carrito');
            }
        },
        nuevoCliente: async (_, { input }) => {
          const { email, provincia, nombre, apellido, telefono, domicilio, codigopostal, localidad } = input;
          console.log(`Datos del Cliente nuevo: ${email}`);
      
          // Verificar si el cliente ya está registrado
          let cliente = await Cliente.findOne({ email });
          if (cliente) {
              console.log('Ese Cliente ya está registrado');
              // Retorna el cliente encontrado en lugar de interrumpir el flujo
              return cliente;
          } else {            
              // Crear una nueva instancia de Cliente si no está registrado
              const nuevoCliente = new Cliente({
                  nombre,
                  apellido,
                  telefono,
                  domicilio,
                  localidad,
                  codigopostal,
                  email,
                  provincia
              });
      
              // Guardar el cliente en la base de datos
              try {
                  cliente = await nuevoCliente.save();
                  console.log('Cliente creado:', nombre, apellido);
              } catch (error) {
                  console.log('Error al crear el cliente:', error);
                  throw new Error('Error al crear el cliente');
              }
      
              return cliente;
          }
      },                  
        actualizarCliente: async (_, {id, input}, ctx) => {
            // Verificar si existe o no
                let cliente = await Cliente.findById(id);

                if(!cliente) {
                    throw new Error ('Ese cliente no existe');
                }
            // Verificar si el vendedor es quien edita                
                if(cliente.vendedor.toString() !== ctx.usuario.id) {
                    throw new Error('No tienes las credenciales');
                }

            // Guardar el cliente
            cliente = await Cliente.findOneAndUpdate({_id : id}, input, {new: true});
                return cliente;
        },
        eliminarCliente : async (_, {id}, ctx) => {
            // Verificar si existe o no
            let cliente = await Cliente.findById(id);

            if(!cliente) {
                throw new Error ('Ese cliente no existe');
            }
        // Verificar si el vendedor es quien edita                
            if(cliente.vendedor.toString() !== ctx.usuario.id) {
                throw new Error('No tienes las credenciales');
            }
        
        // Eliminar cliente
        await Cliente.findOneAndDelete({_id : id});
        return "Cliente Eliminado";
        },
        eliminarProductoDelCarro: async (_, { productoId }, { cliente }) => {
            const clienteId = cliente.id;
            if (!clienteId) {
              throw new Error("No se ha encontrado el cliente");
            }
          
            let carro = await Carrito.findOne({ cliente: clienteId });
            if (!carro) {
              throw new Error("No se ha encontrado el carrito del cliente");
            }
          
            carro.items = carro.items.filter(item => item.producto.toString() !== productoId);
            await carro.save();
            carro = await carro.populate('items.producto'); 
            console.log(`Carro actualizado: ${carro}`);
            return carro;
          },
          nuevaOrden: async (_, { nombre, apellido, telefono, calle, numero, localidad, provincia, codigoPostal, email, productos }) => {
            console.log('Cliente:', { nombre, apellido, telefono, calle, numero, localidad, provincia, codigoPostal, email });
            console.log('Productos:', productos);
          
            // Mapear los productos para asegurarnos de que tengan los campos correctos
            const productosMapeados = productos.map(producto => ({
              productoId: producto.productoId,  // Asumiendo que es un ObjectId de producto
              nombre: producto.nombre,
              precio: producto.precio,
              cantidad: producto.cantidad
            }));
          
            // Crear una instancia del modelo Orden
            const orden = new Orden({
              nombre,
              apellido,
              telefono,
              calle,
              numero,
              localidad,
              provincia,
              codigoPostal,
              email,
              productos: productosMapeados,
              fechaCreacion: new Date()  // Fecha de creación
            });
          
            // Guardar la orden en la base de datos
            try {
              const ordenGuardada = await orden.save();
          
              // Formatear productos para el correo
              const productosLista = productosMapeados
                .map(p => `<li>${p.nombre} (Cantidad: ${p.cantidad}, Precio: $${p.precio})</li>`)
                .join('');
          
                const mensaje = `
                <img 
                  alt="entremedias" 
                  loading="lazy" 
                  width="30" 
                  height="30" 
                  decoding="async" 
                  src="https://i.ibb.co/3dhk11d/logo-entremedias.jpg" 
                  style="display: block; margin: 0 auto 20px; border-radius: 50%;">
                <div style="background-color: #163127; color: #b5a887; padding: 20px; font-family: Arial, sans-serif; border-radius: 8px;">
                  <h1 style="text-align: center; color: #b5a887; font-size: 24px; margin-bottom: 10px;">ENTREMEDIAS</h1>
                  <h2 style="color: white; margin-top: 20px;">Orden Guardada</h2>
                  <h3 style="color: #b5a887; margin-bottom: 10px;">Detalles del Cliente:</h3>
                  <p><strong>Nombre:</strong> ${ordenGuardada.nombre} ${ordenGuardada.apellido}</p>
                  <p><strong>Teléfono:</strong> ${ordenGuardada.telefono}</p>
                  <p><strong>Email:</strong> ${ordenGuardada.email}</p>
                
                  <h3 style="color: #b5a887; margin-top: 20px;">Dirección de Envío:</h3>
                  <p>${ordenGuardada.calle} ${ordenGuardada.numero}, ${ordenGuardada.localidad}, ${ordenGuardada.provincia}, CP: ${ordenGuardada.codigoPostal}</p>
                
                  <h3 style="color: yellow; margin-top: 20px;">Productos Solicitados:</h3>
                  <ul style="color: white; margin-left: 20px; list-style-type: disc;">${productosLista}</ul>
                
                  <p style="font-style: italic; color: white; margin-top: 20px;">Gracias por tu compra. Si tienes preguntas, contáctanos.</p>
                  <p style="font-style: italic; color: white; font-size: 12px; margin-top: 20px;">Entremedias. Todos los derechos reservados.</p>
                </div>
              `;
              
              const asun = 'Nueva solicitud de producto';
              
              await enviarCorreo(asun, mensaje, ordenGuardada.email);
                        
              return ordenGuardada;
            } catch (error) {
              console.error('Error al guardar la orden:', error);
              throw new Error('Error al guardar la orden');
            }
          },
          
          
          crearPreferencia: async (_, { amount, nombre, apellido, email, telefono }) => {
            try {
                // const orderId = '6651121616';
              const paymentRequest = await preference.create({
                body: {
                    "items": [
                        {
                            "id": "item-ID-1234",
                            "title": "entremedias.shop",
                            "currency_id": "ARS",
                            "picture_url": "https://i.ibb.co/wRt0cbZ/Whats-App-Image-2024-10-04-at-10-36-41.jpg",
                            "description": "Producto de entremedias",
                            "category_id": "art",
                            "quantity": 1,
                            "unit_price": amount
                        },
                    ],
                    "payer": {
                      "name": nombre,
                      "surname": apellido,
                      "email": email,
                      "phone": {
                        "area_code": "0",
                        "number": telefono
                      },
                    },         
                  external_reference: externalReference, // Código único para correlacionar con tu sistema
                  statement_descriptor: 'ENTREMEDIAS', // Nombre personalizado para el extracto bancario       
                  back_urls: {
                    success: `${process.env.PRODUCTION_URL}/success`,
                    failure: 'http://www.your-site.com/failure',
                    pending: 'http://www.your-site.com/pending',
                  },
                  auto_return: 'approved',
                  notification_url: `${process.env.PRODUCTION_URL}/notificacion`
                },
              });

          
              // console.log('Payment link created:', paymentRequest.sandbox_init_point);
              console.log('Payment link created:', paymentRequest);
              return paymentRequest.init_point;
            } catch (error) {
              console.error('Error en la creación de la preferencia:', error);
              throw new Error(error);
            }
          
        },
  // Resolver para recibir Webhooks
  handleExternalNotification: async (_, { data }) => {
    try {
      const { id, topic, status, external_reference, merchant_order_id } = data;
  
      console.log('Datos de la notificación recibidos:', data);
  
      const paymentData = new Payment({
        id,
        topic,
        created_at: new Date(),
      });
  
      await paymentData.save();
  
      console.log('Notificación procesada y guardada en la base de datos:', paymentData);
  
      return {
        success: true,
        message: 'Notificación procesada correctamente',
        data: {
          id,
          approved: status,
          external_reference,
          merchant_order_id,
        },
      };
    } catch (error) {
      console.error('Error procesando la notificación:', error.message);
      throw new Error('Error al procesar la notificación.');
    }
  },
            
        },
        }

module.exports = resolvers;