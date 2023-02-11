import React from "react";
import CardListComponent from "../CardListComponent";

const Home = () => 
{
    return (
    <div>
        <h1>Home</h1>
        <CardListComponent greeting="Bienvenido" className="ItemListContainer"/>
    </div>
    )
}

export default Home;