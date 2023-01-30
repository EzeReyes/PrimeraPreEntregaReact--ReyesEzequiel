import "./App.css";
import Navbar from "./components/Navbar"
import ItemListContainer from "./components/ItemListContainer";

const text ="Pablo"

function App() {
  return (
    <>    
    <div className="App">
      <header className="App-header">
        <Navbar/>
        <ItemListContainer greeting={text}/>
      </header>
    </div>
    </>
  );
}

export default App;
