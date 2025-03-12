import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import { gql, useMutation, useQuery } from '@apollo/client';


import { Navigation, Pagination } from 'swiper/modules'; // Cambia esto

const OBTENER_CATEGORIAS = gql`
  query obtenerCategorias {
    obtenerCategorias {
      id
      nombre
      imagen
    }
  }
`;

const Category = () => {
  const { data, loading, error } = useQuery(OBTENER_CATEGORIAS);
  
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      loop={true}
      breakpoints={{
        640: { slidesPerView: 1, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 30 },
        1024: { slidesPerView: 3, spaceBetween: 30 },
      }}
    >
{data?.obtenerCategorias.map((product) => (
  <SwiperSlide key={product.id}>
    <div className="text-center text-[25px] flex flex-col items-center justify-center">
      <div className='flex flex-col items-center justify-around h-52'>
      <Link href={`/categoria/${product.id}`}>
      <div className="w-40 h-40 rounded-full overflow-hidden">
        <img
          src={product.imagen}
          alt={product.nombre}
          className="w-full h-full object-cover"
        />
      </div>
      </Link>
      <h3 className="text-xl font-bold">{product.nombre}</h3>
      </div>
    </div>
  </SwiperSlide>
))}

    </Swiper>
  );
};

export default Category;
