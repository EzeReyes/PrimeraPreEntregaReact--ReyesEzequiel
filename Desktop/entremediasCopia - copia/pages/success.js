import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';

const GET_PAYMENT_DETAILS = gql`
  query GetPaymentDetails($id: ID!) {
    GetPaymentDetails(id: $id) {
      id
      topic
      created_at
    }
  }
`;

const Success = () => {
  const router = useRouter();
  const { payment_id } = router.query;

  console.log(payment_id)

  const { data, loading, error } = useQuery(GET_PAYMENT_DETAILS, {
    variables: { id: payment_id },
    skip: !payment_id,
  });

  if (loading) return <p>Cargando los detalles de tu transacción...</p>;
  if (error) return <p>Error al cargar los detalles: {error.message}</p>;

  if (!data || !data.GetPaymentDetails) {
    return <p>No se encontraron detalles del pago con el ID proporcionado.</p>;
  }

  const { id, topic, created_at } = data.GetPaymentDetails;

  return (
    <div>
      <h1 className="text-2xl font-bold">¡Gracias por tu compra!</h1>
      <h2 className="mt-4 text-lg">Detalles de la transacción:</h2>
      <div className="mt-2 p-4 border border-gray-300 rounded">
        <p><strong>ID del Pago:</strong> {id}</p>
        <p><strong>Tema:</strong> {topic}</p>
        <p><strong>Fecha de Creación:</strong> {new Date(parseInt(created_at)).toLocaleString()}</p>
        </div>
    </div>
  );
};

export default Success;
