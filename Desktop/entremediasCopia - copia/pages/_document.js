import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="es">
            <Head>
                {/* Meta tags esenciales */}
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="description" content="Entremedias - Descubre las mejores medias, lencería y ropa interior. Calidad, estilo y comodidad en un solo lugar." />
                <meta name="keywords" content="medias, lencería, ropa interior, entremedias, moda, comodidad" />
                <meta name="author" content="Ezequiel Reyes" />
                <meta property="og:title" content="Entremedias - Moda y Comodidad" />
                <meta property="og:description" content="Encuentra las mejores medias, lencería y ropa interior en Entremedias. Diseños únicos y confort inigualable." />
                <meta property="og:image" content="../../logo-entremedias.jpeg" />
                <meta property="og:url" content="https://www.entremedias.com" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Entremedias - Moda y Comodidad" />
                <meta name="twitter:description" content="Explora nuestra colección de medias, lencería y ropa interior." />
                <meta name="twitter:image" content="/logo-entremedias.jpeg" />

                {/* Normalize CSS */}
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"
                    integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
                {/* Favicon */}
                <link rel="icon" href="/logo-entremedias.jpeg" type="image/x-icon" />
                {/* Google Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet" />

                {/* Otros scripts o estilos */}
                <link rel="canonical" href="https://www.entremedias.com" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
