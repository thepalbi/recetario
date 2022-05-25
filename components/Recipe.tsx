import { resourceUsage } from 'process';
import { func } from 'prop-types';
import * as React from 'react';
import { Recipe, IngredientDetails, NamedIngredient, Step } from '../interfaces';

type RecipeProps = {
  recipe: Recipe
}

function Recipe({ recipe }: RecipeProps) {
  return (
    <>
      <IngredientList ingredients={recipe.ingredients}></IngredientList>
      <StepList steps={recipe.steps}></StepList>
      <Notes notes={recipe.notes}></Notes>
    </>
  );
}

function Notes({ notes }: { notes: string }) {
  return (
    <>
      <h4 className='mt-3'>Notas</h4>
      <p>{notes}</p>
    </>
  )
}

type IngredientListProps = {
  ingredients: NamedIngredient[],
}

function IngredientList({ ingredients }: IngredientListProps) {
  return (
    <div className='card'>
      <div className='card-header'>
        <h4 className='pt-2'>
          <button className='btn btn-link' type='button' data-toggle='collapse' data-target="#collapsableIngredients">
            Ingredientes
          </button>
        </h4>
      </div>
      <div className='collapse show' id='collapsableIngredients'>
        <div className='card-body'>
          <ul className='list-group list-group-flush'>
            {ingredients.map(i => <Ingredient key={i.name} ingredient={i}></Ingredient>)}
          </ul>
        </div>
      </div>
    </div>
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
        <strong>{ingredient.name}</strong>
        {formattedFirstAmount}
      </div>
      {hasNotes && <small className="text-muted">{details.notes}</small>}
    </div>
  )
}

function StepList({ steps }: { steps: Step[] }) {
  return (
    <>
      <h4 className='mt-3'>Pasos</h4>
      <ul className='list-group'>
        {steps.map((s, i) =>
          <Step key={i} step={s}></Step>
        )}
      </ul>
    </>
  )
}

function Step({ step }: { step: Step }) {
  return (
    <li className='list-group-item'>
      {step.step}
    </li>
  );
}

export default Recipe;