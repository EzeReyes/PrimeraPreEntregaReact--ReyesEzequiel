import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

export default function ProductGallery({ imagenes }) {
  const [selectedImage, setSelectedImage] = useState(imagenes[0]); // Imagen fija inicial

  return (
    <div className="w-full max-w-lg flex flex-col items-center">
      {/* Imagen principal fija */}
      <div className="w-64 h-64 border mb-4">
        <img
          src={selectedImage}
          alt="entremedias"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Carrusel de imágenes pequeñas */}
      <div className="w-full">
        {imagenes.length > 0 ? (
          <Swiper
            spaceBetween={10}
            slidesPerView={3}
            loop
            onSlideChange={(swiper) => {
              const currentIndex = swiper.realIndex;
              setSelectedImage(imagenes[currentIndex]);
            }}
          >
            {imagenes.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`w-20 h-20 border-2 ${
                    selectedImage === image ? "border-blue-500" : "border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`Imagen ${index + 1}`}
                    className="w-full h-full object-cover cursor-pointer"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>Cargando imágenes...</p>
        )}
      </div>
    </div>
  );
}
