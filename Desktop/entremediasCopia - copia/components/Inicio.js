import React from "react";
import Link from "next/link";
import ProductCarousel from "../components/ProductCarousel";
import { useProduct } from "@/context/productsContext";
import Category from "./Category";

const Inicio = () => {
  const { products } = useProduct();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
  className="h-screen bg-fixed bg-center bg-cover flex items-center justify-center text-center text-white relative"
  style={{
    backgroundImage: "url('./media.webp')", // Cambia esto por la URL de tu imagen
  }}
>
  {/* Overlay sobre la imagen */}
  <div className="absolute inset-0 bg-black/50"></div>
  
  {/* Contenido encima del overlay */}
  <div className="relative z-10 flex flex-col items-center justify-center">
    <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-xl">
      Bienvenido a Nuestra Tienda
    </h1>
    <p className="text-md md:text-lg mb-6 drop-shadow-lg">
      Descubre lo último en moda y accesorios con ofertas exclusivas
    </p>
    <Link href="/coleccion">
      <button className="bg-gold-500 hover:bg-gold-600 text-black font-semibold py-2 px-4 rounded-lg">
        <h3 className="text-lg hover:text-white">Explorar Productos</h3>
      </button>
    </Link>
  </div>
</section>


      {/* Productos Destacados */}
      <section>
        <div className="my-5 text-start py-20">
          <h3 className="text-2xl font-bold mb-10 px-4">Productos Destacados</h3>
          <ProductCarousel products={products} />
        </div>
      </section>

      {/* CTA para ir a la tienda */}
      <div className="m-8 text-center">
        <p className="text-2xl font-bold">Conoce más productos en la tienda</p>
        <Link href="/shop">
          <button className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-full mt-4 inline-block">
            Ir a comprar
          </button>
        </Link>
      </div>

      <hr className="border-t border-black w-4/5 mx-auto my-16" />

      {/* Sección de información de productos */}
      <section className="py-28">
        <div className="container mx-auto px-4">
          {/* Primera fila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <h2 className="text-xl md:text-2xl font-bold mb-4">Estilo y Comodidad</h2>
              <p className="text-sm md:text-lg mb-6">
                Encuentra las mejores prendas y accesorios diseñados para brindarte estilo y comodidad. Cada producto ha
                sido seleccionado con la más alta calidad.
              </p>
              <Link href="/coleccion">
                <button className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-full w-40">
                  Ver más
                </button>
              </Link>
            </div>
            <div>
              <img
                src="https://images.vexels.com/media/users/3/206236/isolated/preview/2c8d182ee8566ccc8bd2518c6fe3ee79-icono-de-calcetines-storke.png"
                alt="Producto"
                className="rounded-lg shadow-lg object-cover w-full"
              />
            </div>
          </div>

          <hr className="border-t border-black w-4/5 mx-auto my-16" />

          {/* Segunda fila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div className="order-2 md:order-1">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT21ErC9viRw7yDMLjcrd45K6rmjV2rly0bfA&s"
                alt="Producto 2"
                className="rounded-lg shadow-lg object-cover w-full"
              />
            </div>
            <div className="flex flex-col justify-center order-1 md:order-2">
              <h2 className="text-xl md:text-2xl font-bold mb-4">Diseños Únicos</h2>
              <p className="text-sm md:text-lg mb-6">
                Nuestra colección cuenta con diseños exclusivos que destacan por su elegancia y originalidad. No te
                quedes sin tu pieza única.
              </p>
              <Link href="/coleccion">
                <button className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-full w-40">
                  Ver Colección
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Texto e Imagen Final */}
      <div className="flex flex-col md:flex-row justify-center text-center items-center my-16">
        <img
          src="/Creative socks.jpeg"
          alt="Producto 2"
          className="rounded-lg shadow-lg object-cover w-full md:w-1/2"
        />
        <p className="text-lg md:text-2xl font-bold mx-4 my-8 md:my-0">Tenemos todos los estilos</p>
      </div>

      <hr className="border-t border-black w-4/5 mx-auto my-16" />

      {/* Información sobre el negocio */}
      <div className="text-center py-20">
        <h3 className="text-2xl font-bold mb-4">Conoce Entremedias</h3>
        <p className="text-lg max-w-4xl mx-auto">
          En Entremedias, nos especializamos en ofrecer las mejores colecciones de medias y lencería para todas las
          ocasiones. Cada pieza está diseñada para brindar estilo, comodidad y elegancia.
        </p>
        <p className="mt-4">No solo vendemos medias, también verás productos con mucho estilo y de buena calidad.</p>
      </div>

      {/* Categorías de productos */}
      <section>
        <div className="my-5 text-start py-20">
          <h3 className="text-2xl font-bold mb-10 px-4">Categorías de productos</h3>
          <Category />
        </div>
      </section>

      {/* CTA para redes sociales */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Únete a Nuestra Comunidad</h2>
        <p className="text-gray-600 mb-6">Síguenos en las redes sociales</p>
        <div className="flex justify-center gap-4">
          <Link href="https://www.instagram.com/entremedias.shop" target="_blank">
            <img src="/instagram.png" alt="Instagram" className="w-8 md:w-10 h-8 md:h-10" />
          </Link>
        </div>
      </section>

            {/* CTA para redes sociales */}
      <section id="envios" className="py-16 bg-gray-100 text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Envíos</h2>
        <p className="text-gray-600 mb-6">Hacemos envíos a todo el pais</p>
        <div className="flex justify-center gap-4">
        <p className="text-gray-600 mb-6">A traves del servicio de correo Andreani</p>
            <img src="data:image/png;base64,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" alt="Instagram" className="w-8 md:w-10 h-8 md:h-10" />
        </div>
      </section>

      {/* Botón flotante de WhatsApp */}
      <Link
        href="https://wa.me/1234567890"
        target="_blank"
        className="fixed bottom-5 right-5 w-16 h-16 bg-green-500 text-white rounded-full shadow-lg z-50 flex items-center justify-center"
      >
        <img src="/wsp-icon.png" alt="WhatsApp" className="w-full h-full rounded-full" />
      </Link>
    </div>
  );
};

export default Inicio;
