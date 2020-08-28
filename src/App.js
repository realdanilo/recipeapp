import React, { useReducer, useState } from "react";
import "./App.css";
import ListRecipe from "./components/ListRecipe";
import RecipeEditor from "./components/RecipeEditor";
import { RecipesContext } from "./RecipesContext";
import { v4 as uuid } from "uuid";

const initialData = [
  {
    id: uuid(),
    title: "name",
    author: "author",
    servings: 1,
    instructions: "instructions",
    ingredients: [
      { id: uuid(), ingredient: "one ingredient", amount: "one amount lb" },
      { id: uuid(), ingredient: "two ingredient", amount: "lb" },
    ],
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        {
          id: uuid(),
          title: "new title",
          author: "my author",
          servings: 1,
          instructions: "woo",
          ingredients: [{ id: uuid(), ingredient: "ton", amount: "lbs" }],
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
  const [recipes, dispatch] = useReducer(reducer, initialData);
  const [recipeId, setRecipeId] = useState(null);
  const recipeEditing = recipes.find((r) => r.id === recipeId);

  return (
    <div className="App">
      <RecipesContext.Provider value={{ recipes, dispatch }}>
        <ListRecipe setRecipeId={setRecipeId} />
        {recipeEditing && <RecipeEditor recipeEditing={recipeEditing} setRecipeId={setRecipeId} />}
      </RecipesContext.Provider>
    </div>
  );
}

export default App;
