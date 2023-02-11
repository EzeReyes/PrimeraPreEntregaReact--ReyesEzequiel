import React from "react";
import Button from "../../button";
import "./style.css";

const ElementsContainer = ({Logo,Producto,Precio}) => 
    <>
    <div className="products">
        <img src={Logo} alt="" className="imgSize"/>
        <p>{Producto}</p> 
        <p>Precio ${Precio}</p>
        <Button/>
    </div>    
    </>
    

export default ElementsContainer;
