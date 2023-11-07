import "./Recipes.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Recipes() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");
  const [recipeData, setRecipeData] = useState([]);

  useEffect(() => {
    fetchSearch();
  }, [searchQuery]);

  const fetchSearch = () => {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&apiKey=65fb4eb13c2745dc8613ec2119bbaa69`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data from server");
        }
        return response.json();
      })
      .then((data) => {
        setRecipeData(data.results);
      })
      .catch((err) => {
        console.error("Error retrieving data: ", err);
      });
  };

  console.log(recipeData);

  return <h1>Recipes page</h1>;
}

export default Recipes;

// - display recipes
// - make them clickable with link
// - display related recipes in single page
// - style everithing up
// - add back button to navbar
// - add logo/name
