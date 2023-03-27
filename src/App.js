import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/HomePage.js";
import Product from "./components/Products.js";

function App() {
  return (
    <div className="App">
      <header>
        <nav>
          <div className="logo">
            <h1>
              {" "}
              <a href=""> WEB3 Marketplace </a>
            </h1>
          </div>

          <ul>
            <li>
              <a href="./"> Home </a>{" "}
            </li>
            <li>
              <a href="/Products"> Product </a>{" "}
            </li>
            <li className="nav-cta">
              <a href="#"> Connect </a>
            </li>
          </ul>
        </nav>
      </header>

      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Products" element={<Product />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
