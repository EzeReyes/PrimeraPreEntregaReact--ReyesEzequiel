import "./App.css";
import Navbar from "./components/Navbar"
import ItemListContainer from "./components/ItemListContainer";
import Info from "./components/Info";

const text ="Bienvenido Elija su producto"

function App() {
  return (
    <>    
      <header className="App-header">
        <Navbar/>
        <ItemListContainer greeting={text} className="ItemListContainer"/>
        <Info/>
      </header>
    </>
  );
}

export default App;
