import React from "react";
import "./styles.css";



const ElementsNavbar = ({ title, CantidadEnCarrito }) => {
  return (
      <p className="title">{title}
      {CantidadEnCarrito}</p>
  );
};

export default ElementsNavbar;
