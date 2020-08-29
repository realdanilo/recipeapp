import React, { useContext, memo } from "react";
import "../css/Recipe.css";
import Ingredient from "./Ingredient";
import { DispatchContext } from "../RecipesContext";

function Recipe(props) {
  const { id, title, author, instructions, ingredients, setRecipeId, servings } = props;
  const dispatch = useContext(DispatchContext);
  return (
    <div className="recipe-container">
      <p>Title: {title}</p>
      <p>By: {author}</p>
      <p>Servings: {servings}</p>
      <p>Instructions:</p>
      <div className="instructions">{instructions}</div>
      <p>Ingredients:</p>
      <div>
        {ingredients.map((ingredient) => (
          <Ingredient key={ingredient.id} {...ingredient} />
        ))}
      </div>
      <div className="recipe-buttons">
        <button
          className="button button-delete"
          onClick={() => dispatch({ type: "DELETE", id })}
        >
          Delete
        </button>
        <button className="button  button-edit" onClick={() => setRecipeId(id)}>
          Edit
        </button>
      </div>
    </div>
  );
}
export default memo(Recipe)