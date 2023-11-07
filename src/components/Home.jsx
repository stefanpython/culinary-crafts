import { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecentRecipes();
  }, []);

  const fetchRecentRecipes = () => {
    fetch(
      "https://api.spoonacular.com/recipes/complexSearch?apiKey=65fb4eb13c2745dc8613ec2119bbaa69&sort=created&number=9"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data from the server");
        }
        return response.json();
      })
      .then((data) => {
        setRecipes(data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // console.log(recipes);

  return (
    <div className="home-container">
      <h2>Recent Recipes</h2>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>
              <h3>{recipe.title}</h3>
              <img src={recipe.image} alt={recipe.title} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
