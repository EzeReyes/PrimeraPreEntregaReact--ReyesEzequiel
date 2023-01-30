import React from "react";
import ElementsNavbar from "./ElementsNavbar";
import CartWidget from "./CartWidget";

const Navbar = () => {
  return (
      <div className="nav">
          <ElementsNavbar
            title="Proyecto React"
          />
          <ElementsNavbar
            title="Home"
          />
          <ElementsNavbar
            title="Quienes Somos"
          />
          <ElementsNavbar
            title="Productos"
          />
          <ElementsNavbar  
          title= {<CartWidget/>}
          CantidadEnCarrito="0"
          />     
          </div>
  );
};

export default Navbar;
