import React, { useContext } from "react";
import Recipe from "./Recipe";
import "../css/ListRecipe.css";
import { RecipesContext } from "../RecipesContext";

export default function ListRecipe(props) {
  const { recipes, dispatch } = useContext(RecipesContext);
  return (
    <div className="list-recipe-container">
      <button
        className="list-recipe-add"
        onClick={() => dispatch({ type: "ADD" })}
      >
        Add
      </button>
      {recipes.map((recipe) => (
        <Recipe {...recipe} key={recipe.id} setRecipeId={props.setRecipeId} />
      ))}
    </div>
  );
}
