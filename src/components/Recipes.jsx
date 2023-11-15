import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Recipes.css";

function Recipes() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");
  const [recipeData, setRecipeData] = useState([]);
  const navigate = useNavigate();

  const [page, setPage] = useState(10); // Track the current page
  const isLoading = useState(false);

  const fetchSearch = (pageNum) => {
    isLoading.current = true;

    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&apiKey=65fb4eb13c2745dc8613ec2119bbaa69&number=${pageNum}&offset=${
        (pageNum - 1) * 10
      }`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data from server");
        }
        return response.json();
      })
      .then((data) => {
        setRecipeData((prevData) => [...prevData, ...data.results]);
        isLoading.current = false;
      })
      .catch((err) => {
        console.error("Error retrieving data: ", err);
        isLoading.current = false;
      });
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoading.current) {
      // Load more recipes when the user is 10 pixels from the bottom
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Display newly seached ingredient
  useEffect(() => {
    setPage(1);
    setRecipeData([]);
    fetchSearch(10);
  }, [searchQuery]);

  useEffect(() => {
    fetchSearch(page);
  }, [searchQuery, page]);

  useEffect(() => {
    // Add a scroll event listener to the document
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <button className="home-btn" onClick={() => navigate("/")}>
        Back
      </button>
      <h2>You have searched for: {searchQuery}</h2>
      {recipeData.length === 0 ? (
        <p>Sorry,free API Quota limit has been reached. Try again tomorrow.</p>
      ) : (
        <div className="recipe-grid">
          {recipeData.map((recipe) => (
            <div className="recipe-card" key={recipe.id}>
              <Link to={`/recipe/${recipe.id}`}>
                <h3>{recipe.title}</h3>
                <img src={recipe.image} alt={recipe.title} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Recipes;

// add related recipes in single page
