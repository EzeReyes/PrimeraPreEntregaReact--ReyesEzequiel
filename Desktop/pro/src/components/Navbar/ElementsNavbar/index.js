import React from "react";
import "./styles.css";



const ElementsNavbar = ({ enlace, title, CantidadEnCarrito }) => {
  return (
      <ul>
      <li className="title"><a href={enlace}>{title}
      {CantidadEnCarrito}</a></li>
      </ul>
  );
};

export default ElementsNavbar;
