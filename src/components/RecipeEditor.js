import React, { useContext } from "react";
import { RecipesContext } from "../RecipesContext";
import IngredientEditor from "./IngredientEditor";
import "../css/RecipeEditor.css";
import { v4 as uuid } from "uuid";


export default function RecipeEditor(props) {
  const { title, author, instructions, id, ingredients, servings } = props.recipeEditing;
  const { dispatch } = useContext(RecipesContext);
  const handleChange = (e) => {
    let newRecipe = {
      [e.target.name]: e.target.value
    }
    dispatch({ type: "UPDATE", id, newRecipe })
  };
  const newIngredient = (e) => {
    let newRecipe = { ingredients: [...ingredients, { id: uuid(), ingredient: "", amount: "" }] }
    dispatch({ type: "UPDATE", id, newRecipe })
  }
  const deleteIngredient = (ingredientId) => {
    let newRecipe = { ingredients: ingredients.filter(ingr => ingr.id !== ingredientId) }

    dispatch({ type: "UPDATE", id, newRecipe })
  }

  const updateIngredient = (ingredientId, name, value) => {
    let newRecipe = {
      ingredients: ingredients.map(i => i.id === ingredientId ? { ...i, [name]: value } : i)
    }
    dispatch({ type: "UPDATE", id, newRecipe })
  }
  return (
    <div className="recipe-editor-container">
      <button className="close" onClick={() => props.setRecipeId(null)}> &#10006;</button>
      <h3>Editing: {title}</h3>
      <div className="recipe-editor-grid">
        <label htmlFor={title}>Title</label>
        <input id={title} value={title} name="title" onChange={handleChange} type="text" />
      </div>
      <div className="recipe-editor-grid">
        <label htmlFor={author}>Author</label>
        <input
          id={author}
          value={author}
          name="author"
          onChange={handleChange}
          type="text"
        />
      </div>
      <div className="recipe-editor-grid">
        <label htmlFor={servings}>Servings</label>
        <input
          id={servings}
          value={servings}
          name="servings"
          onChange={handleChange}
          type="number"
        />
      </div>
      <div className="recipe-editor-grid">
        <label htmlFor={instructions}>Instructions</label>
        <textarea
          id={instructions}
          value={instructions}
          name="instructions"
          onChange={handleChange}
        />
      </div>
      <hr />
      <div className="recipe-editor-grid ingredients">
        <p>Ingredient</p>
        <p>Amount</p>
        <p></p>
      </div>
      {
        ingredients.map((ingredient) => (
          <IngredientEditor key={ingredient.id}  {...ingredient} deleteIngredient={deleteIngredient} updateIngredient={updateIngredient} />
        ))
      }
      <button className="add" onClick={newIngredient}>Add New</button>

    </div >
  );
}
