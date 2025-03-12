import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';

import { Navigation, Pagination } from 'swiper/modules'; // Cambia esto


const ProductCarousel = ({ products }) => {
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
        1024: { slidesPerView: 4, spaceBetween: 30 },
      }}
    >
{products.map((product) => (
  <SwiperSlide key={product.id}>
    <div className="text-center text-[25px] flex flex-col items-center">
      <Link href={product.id}>
        <img src={product.imagen} alt={product.nombre} className="w-full max-w-[200px] mb-2.5" />
      </Link>
      <h3 className="text-xl font-bold my-2.5">{product.nombre}</h3>
      <p className="text-xl text-orange-400 font-bold">${product.precio}</p>
    </div>
  </SwiperSlide>
))}

    </Swiper>
  );
};

export default ProductCarousel;
