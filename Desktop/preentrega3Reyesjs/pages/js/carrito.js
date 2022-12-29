/* EN ESTE ARCHIVO JS REALICE UN ARRAY DE OBJETOS PARA IMPLEMENTARLOS MEDIANTE CREATE ELEMENT + INNER HTML EN LA PAGINA DEL CARRITO DEL ECOMERCE, EL MISMO SERA UTILIZADO PROXIMAMENTE PARA REALIZAR VARIOS EVENTOS IMPORTANTES EN LA PÁGINA Y MAS QUE NADA FUE CREADO CON LA FINALIDAD BRINDAR UN CARRITO EFICIENTE PARA EL USUARIO */

/* COMO PODRÁ APRECIAR EL ARRAY ES EL MISMO QUE SE UTILIZO EN LA PREENTREGA ANTERIOR */
let producto = [
    {
        id: 01,
        nombre: "Chicle",
        precio: 400, /* producto con 15% de descuento */
        img: "./img/carrito/productos/1chicle.jpg",
        descripcion: "Ceras ABM linea Candy Fruits. Fijación media a fuerte HIDRATA y MODELA",
        tipo: "cera",
        oferta: true,
    },
    {
        id: 02,
        nombre: "Brutus",
        precio: 600,
        img: "./img/carrito/productos/2brutus.jpeg",
        descripcion: "Balsamo para Barba y Bigote.Nuestro bálsamo para barba exfolia e hidrata",
        tipo: "pomada",
        oferta: false,
    },
    {   
        id: 03,
        nombre: "Desert Clay",
        precio: 550,
        img: "./img/carrito/productos/3desert_clay.jpeg",
        descripcion: "Arcilla de alta calidad: Ingredientes orgánicos puros y arcilla bentonita",
        tipo: "pomada",
        oferta: false,
    },
    {   
        id: 04,
        nombre: "Gel Capilar",
        precio: 450,
        img: "./img/carrito/productos/4gel.jpg",
        descripcion: "Gel GOMINA de extra brillo y fijación ultra fuerte.Fragancia Kosiuko, efecto humedo",
        tipo: "gel",
        oferta: false,
    },
    {
        id: 05,
        nombre: "Manzana INK",
        precio: 400, /* producto con 15% de descuento */
        img: "./img/carrito/productos/5manzana_ink.jpg",
        descripcion: "Ceras ABM linea Candy Fruits. Fijación media a fuerte HIDRATA y MODELA",
        tipo: "cera",
        oferta: true,
    },
    {   
        id: 06,
        nombre: "Marine",
        precio: 450,
        img: "./img/carrito/productos/6marine.jpg",
        descripcion: "Fragancia exclusiva Staygold: notas cítricas, acuáticas y amaderadas",
        tipo: "cera",
        oferta: false,
    },
    {   
        id: 07,
        nombre: "Matte String",
        precio: 450,
        img: "./img/carrito/productos/7matte.jpg",
        descripcion: "Pomada de fijación media y acabado mate/opaco. Enriquecido con extractos naturales",
        tipo: "cera",
        oferta: false,
    },
    {   
        id: 08,
        nombre: "Oleo para barba",
        precio: 550,
        img: "./img/carrito/productos/8oleo.jpg",
        descripcion: "Óleo Formulado con mezcla de aceites que promueven el crecimiento del vello de la barba",
        tipo: "oleo",
        oferta: false,
    },
    {   
        id: 09,
        nombre: "ABM Powder",
        precio: 600,
        img: "./img/carrito/productos/9powder.jpg",
        descripcion: "Polvo voluminizador 3D para cabello normal y fino. Enriquecido con pantenol",
        tipo: "powder",
        oferta: false,
    },
    {   
        id: 10,
        nombre: "Shaving gel",
        precio: 550,
        img:"./img/carrito/productos/10shaving_gel.jpeg",
        descripcion: "Shaving Gel es un gel de afeitado que no oscurece, tampoco se convierte en espuma",
        tipo: "gel",
        oferta: false,
    }
]

const todosLosProductos = cardsHtml = ( array ) => {
    const contenedor = document.querySelector(".carrito")
    array.forEach( ( prod ) => {
        const card = document.createElement("div")
        card.innerHTML = `
        <div class="carrito__titulo">
        <p>${prod.nombre}</p>
        </div>
        <div class="carrito__prod">
        <img src="${prod.img}" alt="${prod.nombre}">
        </div>
        <h3>$${prod.precio}</h3>
        <div class="carrito__botones">
            <button class="btnCompra"><p>${prod.id} COMPRAR</p></button>
        </div>
        </div>      `
        contenedor.appendChild(card)})
    }
cardsHtml(producto)

const selector = document.querySelector("select")
const vacio = document.querySelector(".vacio")
const todos = document.querySelector(".todos")
const descuento = document.querySelector(".descuento")

/* function mostrarProductosConDescuento (pr) {
        const prodDescuento = producto.filter(( elemento ) => {
            elemento = (elemento.oferta==true)
            return elemento})
            console.log(prodDescuento)
        }
mostrarProductosConDescuento(producto) */
        /* 
const boton = document.querySelector(".btn")

const selectora = (select, nodo1, nodo2) => {
select.onclick = () => {
    nodo1.style.display = "flex"
    nodo2.style.display = "none"
}
}
selectora(boton,oferta,todosLosProductos)

 */



