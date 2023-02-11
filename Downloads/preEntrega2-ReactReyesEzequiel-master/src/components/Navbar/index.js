import React from "react";
import ElementsNavbar from "./ElementsNavbar";
import CartWidget from "./CartWidget";

const Navbar = () => {
  return (
    <>
      <div className="nav">
          <ElementsNavbar
            title="GRANDPA MARIO" 
            to="/"
          />
          <ElementsNavbar
            title="ABOUT"
            to="/about"
/>
          <ElementsNavbar
            title="CONTACT"
            to="/contact"
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
