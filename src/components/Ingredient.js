import React from "react";
import "../css/Ingredient.css";
export default function Ingredient({ ingredient, amount }) {
  return (
    <div className="ingredient-container">
      <p>{ingredient}</p>
      <p>{amount}</p>
    </div>
  );
}
