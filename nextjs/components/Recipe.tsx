import * as React from 'react';
import { Recipe, IngredientDetails, NamedIngredients } from '../interfaces';

type RecipeProps = {
  recipe: Recipe
}

function Recipe({ recipe }: RecipeProps) {
  return <div className='card'>
    <div className='card-body'>
      <h3 className='card-header'>{recipe.recipe_name}</h3>
      <IngredientList ingredients={recipe.ingredients}></IngredientList>
    </div>
  </div>;
}

type IngredientListProps = {
  ingredients: NamedIngredients,
}

function IngredientList({ ingredients }: IngredientListProps) {
  return (
    <ul className='list-group list-group-flush'>
      {Object.keys(ingredients).map(name =>
        <Ingredient name={name} details={ingredients[name]}></Ingredient>
      )}
    </ul>
  )
}

type IngredientProps = {
  name: string,
  details: IngredientDetails | undefined,
}

function Ingredient({ name, details }: IngredientProps) {
  let formattedFirstAmount;
  let hasAmount = details && details.amounts && details.amounts.length > 0;
  let hasNotes = details && details.notes;
  if (hasAmount) {
    const firstAmount = details.amounts[0];
    formattedFirstAmount = <small>{`${firstAmount.amount} ${firstAmount.unit}`}</small>;
  }
  return (
    <div className="list-group-item list-group-item-action flex-column align-items-start">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{name}</h5>
        {formattedFirstAmount}
      </div>
      {hasNotes && <small className="text-muted">{details.notes}</small>}
    </div>
  )
}

export default Recipe;