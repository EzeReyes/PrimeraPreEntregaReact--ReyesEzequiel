// import enviarCorreo from '../config/sendEmail';

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//       const { asunto, mensaje } = req.body;
  
//       try {
//         await enviarCorreo(asunto, mensaje);
//         return res.status(200).json({ message: 'Correo enviado correctamente' });
//       } catch (error) {
//         console.error('Error al enviar el correo:', error);
//         return res.status(500).json({ error: 'Error al enviar el correo' });
//       }
//     } else {
//       res.setHeader('Allow', ['POST']);
//       return res.status(405).json({ error: 'Método no permitido' });
//     }
//   }
  
