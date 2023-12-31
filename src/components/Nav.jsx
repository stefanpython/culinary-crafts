import { useState } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Nav() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/recipes?query=${searchQuery}`);
    setSearchQuery("");
  };

  // console.log(searchQuery);

  return (
    <nav className="navbar">
      <h1 className="title">Culinary crafts</h1>
      <Link to={`/`}>
        <img className="logo" src="./logo2.png" alt="logo" />
      </Link>
      <div className="nav-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter ingredients"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </nav>
  );
}

export default Nav;
