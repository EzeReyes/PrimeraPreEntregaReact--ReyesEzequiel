// REACT ROUTER DOM
import { BrowserRouter, Routes, Route } from "react-router-dom";


// PAGES
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import About from "./components/pages/About";


// COMPONENTS
import "./App.css";
import Navbar from "./components/Navbar"

function App() {
  return (
    <BrowserRouter>    
      <div className="App-header">
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
