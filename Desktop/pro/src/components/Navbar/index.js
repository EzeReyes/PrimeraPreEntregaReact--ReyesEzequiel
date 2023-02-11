import React from "react";
import ElementsNavbar from "./ElementsNavbar";
import CartWidget from "./CartWidget";

const Navbar = () => {
  return (
    <>
      <div className="nav">
          <ElementsNavbar
            enlace={"#"}
            title="Proyecto React" 
          />
          <ElementsNavbar
            title="Quienes Somos"
            enlace={"#containerInfo"}
          />
          <ElementsNavbar
            enlace={"#ContainerElements"}
            title="Productos"
          />
          <ElementsNavbar  
          title= {<CartWidget/>}
          CantidadEnCarrito="0"
          />     
          </div>
          </>
  );
};

export default Navbar;
