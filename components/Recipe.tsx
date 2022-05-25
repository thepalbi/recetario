import * as React from 'react';
import { Recipe, IngredientDetails, NamedIngredient } from '../interfaces';

type RecipeProps = {
  recipe: Recipe
}

function Recipe({ recipe }: RecipeProps) {
  return <div className='card'>
    <div className='card-body'>
      <IngredientList ingredients={recipe.ingredients}></IngredientList>
    </div>
  </div>;
}

type IngredientListProps = {
  ingredients: NamedIngredient[],
}

function IngredientList({ ingredients }: IngredientListProps) {
  return (
    <>
      <h4>Ingredientes</h4>
      <ul className='list-group list-group-flush'>
        {ingredients.map(i => <Ingredient key={i.name} ingredient={i}></Ingredient>)}
      </ul>
    </>
  )
}

type IngredientProps = {
  ingredient: NamedIngredient,
}

function Ingredient({ ingredient }: IngredientProps) {
  let formattedFirstAmount;
  let details = ingredient as IngredientDetails;
  let hasAmount = details && details.amounts && details.amounts.length > 0;
  let hasNotes = details && details.notes;
  if (hasAmount) {
    const firstAmount = details.amounts[0];
    formattedFirstAmount = <small>{`${firstAmount.amount} ${firstAmount.unit}`}</small>;
  }
  return (
    <div className="list-group-item list-group-item-action flex-column align-items-start">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{ingredient.name}</h5>
        {formattedFirstAmount}
      </div>
      {hasNotes && <small className="text-muted">{details.notes}</small>}
    </div>
  )
}

export default Recipe;