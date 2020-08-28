import React, { useContext } from "react";
import "../css/IngredientEditor.css";
export default function IngredientEditor({ id, ingredient, amount, deleteIngredient, updateIngredient }) {

  const handleChange = (e) => {

    updateIngredient(id, e.target.name, e.target.value)

  }
  return (
    <>
      <div className="ingredient-editor-grid">
        <input value={ingredient} name="ingredient" onChange={handleChange} />

        <input value={amount} name="amount" onChange={handleChange} />
        <button onClick={() => deleteIngredient(id)}>&#10006;</button>
      </div>
    </>
  );
}
