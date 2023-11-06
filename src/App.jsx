import "./App.css";
import Home from "./components/Home";
import Nav from "./components/Nav";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

// Search if you can fetch the newest recipes and display them grid 3 on a row
