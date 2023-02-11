import React from "react";
import ElementsContainer from "./ElementsContainer";
import "./styles.css";
import chicle from "./ElementsContainer/ImagesProducts/chicle.jpg";
import desert from "./ElementsContainer/ImagesProducts/desert.jpeg";
import marine from "./ElementsContainer/ImagesProducts/marine.jpeg";
import matte from "./ElementsContainer/ImagesProducts/matte.jpg";


const ItemListContainer = ({greeting}) => {
  return (
    <>
    <h1>{greeting}</h1>  
    <div className="containerElements" id="containerElements">
    <ElementsContainer className="elementsContainer" Logo={chicle} Producto="Pomada chicle" Precio={400}/>
    <ElementsContainer className="elementsContainer" Logo={desert} Producto="Pomada desert" Precio={500}/>
    <ElementsContainer className="elementsContainer" Logo={marine} Producto="Pomada marine" Precio={500}/>
    <ElementsContainer className="elementsContainer" Logo={matte} Producto="Pomada matte" Precio={500}/>
    </div>
        </>
    );
};

export default ItemListContainer;
