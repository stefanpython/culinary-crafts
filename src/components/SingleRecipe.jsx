import { useEffect, useState } from "react";
import "./SingleRecipe.css";
import { useParams } from "react-router-dom";
import { uid } from "uid";

function SingleRecipe() {
  const [recipe, setRecipe] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchRecipeInformation();
  }, []);

  const fetchRecipeInformation = () => {
    fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=65fb4eb13c2745dc8613ec2119bbaa69`
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

  console.log(recipe);

  return (
    <div className="single-recipe">
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <p>{recipe.instructions}</p>
      <p>Ready in: {recipe.readyInMinutes} minutes</p>
      <p>Servings: {recipe.servings}</p>
      <p>Health Score: {recipe.healthScore}</p>

      {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 ? (
        recipe.extendedIngredients.map((ingredient) => (
          <div className="ingredient-list" key={ingredient.id}>
            <h4>{ingredient.measures.us.amount} cups</h4>
            <img
              src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
              alt={ingredient.name}
            />
            <p>{ingredient.name}</p>
          </div>
        ))
      ) : (
        <p>No ingredients available.</p>
      )}
    </div>
  );
}

export default SingleRecipe;
