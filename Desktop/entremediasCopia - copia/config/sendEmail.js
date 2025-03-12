// const nodemailer = require('nodemailer');
// require('dotenv').config();

// const transporter = nodemailer.createTransport({
//   host: process.env.MAILTRAP_HOST,
//   port: process.env.MAILTRAP_PORT,
//   auth: {
//     user: process.env.MAILTRAP_USER,
//     pass: process.env.MAILTRAP_PASS,
//   },
//   debug: true, // Activa depuración
//   logger: true, // Activa logging
// });

// const enviarCorreo = async (asunto, mensaje) => {
//   const mailOptions = {
//     from: process.env.MAILTRAP_USER,
//     to: process.env.NOTIFICATION_EMAIL, // Dirección de correo válida
//     subject: asunto,
//     html: mensaje,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Correo enviado:', info.response);
//   } catch (error) {
//     console.error('Error al enviar el correo:', error.message);
//     throw new Error('No se pudo enviar el correo'); // Lanza un error para manejarlo en el frontend
//   }
// };

// module.exports = enviarCorreo;
