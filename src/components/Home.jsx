import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { uid } from "uid";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1); // Track the current page for fetching recipes
  const isLoading = useRef(false);

  const fetchRecentRecipes = (pageNum) => {
    isLoading.current = true;
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=65fb4eb13c2745dc8613ec2119bbaa69&sort=created&number=9&page=${pageNum}&offset=${
        (pageNum - 1) * 10
      }`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data from the server");
        }
        return response.json();
      })
      .then((data) => {
        setRecipes((prevRecipes) => [...prevRecipes, ...data.results]);
        isLoading.current = false;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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

  useEffect(() => {
    fetchRecentRecipes(page);
  }, [page]);

  useEffect(() => {
    // Add a scroll event listener to the document
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="home-container">
      <h2>Recent Recipes</h2>

      {!recipes.length ? (
        <h2>
          Sorry,free API Quota limit has been reached. Try again tomorrow.
        </h2>
      ) : (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <div className="recipe-card" key={recipe.id + uid()}>
              <Link to={`/recipe/${recipe.id}`}>
                <h3>{recipe.title}</h3>
                <img src={recipe.image} alt={recipe.title} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
