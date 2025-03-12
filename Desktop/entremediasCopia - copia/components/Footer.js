import Link from "next/link";

const Footer = () => {
    return (
        <>

    <footer className="bg-slate-900 text-gray-300 py-8">
        <div className="max-w-4xl mx-auto px-6 md:px-0">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                    <h2 className="text-lg font-semibold">Entremedias</h2>
                    <p className="text-sm">La elegancia y comodidad en cada paso.</p>
                </div>
                <div className="flex space-x-6">
                    <a href="/" className="text-gray-300 hover:text-gray-100">Inicio</a>
                    <a href="/sobre-nosotros" className="text-gray-300 hover:text-gray-100">Sobre Nosotros</a>
                    <a href="/coleccion" className="text-gray-300 hover:text-gray-100">Productos</a>
                </div>
            </div>
            <div className="flex justify-center mt-6">
                <Link href="https://www.instagram.com/entremedias.shop" className="text-gray-300 hover:text-gray-100 mx-2">Instagram</Link>
            </div>
            <div className="mt-6 text-center text-sm">
                <p>&copy; 2024 Entremedias. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>
        </> )
}

export default Footer;