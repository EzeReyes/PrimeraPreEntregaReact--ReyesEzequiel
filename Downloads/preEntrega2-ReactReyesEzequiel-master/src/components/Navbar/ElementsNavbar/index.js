import React from "react";
import "./styles.css";
import {Link} from "react-router-dom";



const ElementsNavbar = ({ to, title, CantidadEnCarrito }) => {
  return (
      <ul>
      <Link to={to} className="title">{title}
      {CantidadEnCarrito}</Link>
      </ul>
  );
};

export default ElementsNavbar;
