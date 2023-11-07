import "./App.css";
import Home from "./components/Home";
import Nav from "./components/Nav";
import SingleRecipe from "./components/SingleRecipe";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<SingleRecipe />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
