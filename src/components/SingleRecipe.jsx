import "./SingleRecipe.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function SingleRecipe() {
  const [recipe, setRecipe] = useState([]);
  const [similar, setSimilar] = useState([]);
  const { id } = useParams();
  const nagigate = useNavigate();
  const apiKey = import.meta.env.VITE_APP_API_KEY;

  useEffect(() => {
    fetchRecipeInformation();
    fetchSimilarRecipes();
  }, [id]);

  const fetchRecipeInformation = () => {
    fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to retrieve data from server");
        }
        return response.json();
      })
      .then((data) => {
        // Filter unique ingredients and store them in state
        const uniqueIngredients = data.extendedIngredients.reduce(
          (unique, ingredient) => {
            const existingIngredient = unique.find(
              (item) => item.id === ingredient.id
            );
            if (!existingIngredient) {
              unique.push(ingredient);
            }
            return unique;
          },
          []
        );
        data.extendedIngredients = uniqueIngredients;
        setRecipe(data);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
      });
  };

  // Fetch similar recipe based on id
  const fetchSimilarRecipes = () => {
    fetch(`https://api.spoonacular.com/recipes/${id}/similar?apiKey=${apiKey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to retrieve data from server");
        }
        return response.json();
      })
      .then((data) => {
        setSimilar(data);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
      });
  };

  console.log(similar);

  return (
    <>
      <button className="home-btn" onClick={() => nagigate(-1)}>
        Back
      </button>
      <div className="single-recipe">
        <h1>{recipe.title}</h1>
        <img className="recipe-img" src={recipe.image} alt={recipe.title} />

        <div>
          <p>Ready in: {recipe.readyInMinutes} minutes</p>
          <p>Servings: {recipe.servings}</p>
          <p>Health Score: {recipe.healthScore}</p>
        </div>

        <br />
        <hr />

        {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 ? (
          <div className="ingredient-grid-container">
            {recipe.extendedIngredients.map((ingredient) => (
              <div className="ingredient-list" key={ingredient.id}>
                <h4>
                  {ingredient.measures.us.amount} cups or{" "}
                  {Math.round(ingredient.measures.metric.amount)} g
                </h4>
                <img
                  className="ingredient-img"
                  src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                  alt={ingredient.name}
                />
                <p>{ingredient.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No ingredients available.</p>
        )}

        <br />
        <hr />

        <p className="instructions">{recipe.instructions}</p>
      </div>

      <br />

      <h2>Related recipes</h2>
      <div className="recipe-grid">
        {similar.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>
              <h3>{recipe.title}</h3>
              <img
                src={`https://spoonacular.com/recipeImages/${recipe.id}-240x150.jpg`}
                alt={recipe.title}
              />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default SingleRecipe;
