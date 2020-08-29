import React, { useState } from "react";
import "./App.css";
import ListRecipe from "./components/ListRecipe";
import RecipeEditor from "./components/RecipeEditor";
import { RecipesContext, DispatchContext } from "./RecipesContext";
import useReducerLocalStorage from './useReducerLocalStorage'
import { v4 as uuid } from "uuid";

const initialData = [
  {
    id: uuid(),
    title: "Grandma's cookies",
    author: "Grandma",
    servings: 20,
    instructions: "Made with love",
    ingredients: [
      { id: uuid(), ingredient: "Love", amount: "tons" },
      { id: uuid(), ingredient: "Cholocate", amount: "8 lb" },
    ],
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        {
          id: uuid(),
          title: "",
          author: "",
          servings: 1,
          instructions: "",
          ingredients: [{ id: uuid(), ingredient: "", amount: "" }],
        },
        ...state,
      ];
    case "DELETE":
      return state.filter((recipe) => recipe.id !== action.id);

    case "UPDATE":
      return state.map(recipe => recipe.id === action.id ? { ...recipe, ...action.newRecipe } : recipe)

    default:
      return state;
  }
};

function App() {
  const [recipes, dispatch] = useReducerLocalStorage('myrecipes', initialData, reducer)
  const [recipeId, setRecipeId] = useState(null);
  const recipeEditing = recipes.find((r) => r.id === recipeId);

  return (
    <div className="App">
      <DispatchContext.Provider value={dispatch}>
        <RecipesContext.Provider value={recipes}>
          <ListRecipe setRecipeId={setRecipeId} />
          {recipeEditing && <RecipeEditor recipeEditing={recipeEditing} setRecipeId={setRecipeId} />}
        </RecipesContext.Provider>
      </DispatchContext.Provider>

    </div>
  );
}

export default App;
