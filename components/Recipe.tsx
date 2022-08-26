import { css } from '@emotion/css';
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
      {recipe.notes != '' ? <Notes notes={recipe.notes}></Notes> : null}

    </>
  );
}

function Notes({ notes }: { notes: string }) {
  return (
    <div className='card mb-3'>
      <div className='card-header'>
        <h4 className='pt-2'>
          <button className='btn' type='button' data-toggle='collapse' data-target="#collapsableIngredients">
            Notas
          </button>
        </h4>
      </div>
      <div className='collapse show' id='collapsableIngredients'>
        <div className='card-body'>
          <p>{notes}</p>
        </div>
      </div>
    </div>
  )
}

interface IListWithTitleProps<T> {
  title: string,
  itemsList: T[];
}

const ListWithTitle = <T extends JSX.Element,>({ title, itemsList }: React.PropsWithChildren<IListWithTitleProps<T>>): JSX.Element => (
  <div className='card mb-3'>
    <div className='card-header'>
      <h4 className='pt-2'>
        <button className='btn' type='button' data-toggle='collapse' data-target="#collapsableIngredients">
          {title}
        </button>
      </h4>
    </div>
    <div className='collapse show' id='collapsableIngredients'>
      <div className='card-body'>
        <ul className='list-group list-group-flush'>
          {itemsList.map(item => (item))}
        </ul>
      </div>
    </div>
  </div>
);

type IngredientListProps = {
  ingredients: NamedIngredient[],
}

function IngredientList({ ingredients }: IngredientListProps) {
  return (
    <ListWithTitle
      title='Ingredientes'
      itemsList={ingredients.map(i => <Ingredient key={i.name} ingredient={i}></Ingredient>)}
    ></ListWithTitle>
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
    <ListWithTitle
      title='Pasos'
      itemsList={steps.map((s, i) => <Step key={i} step={s}></Step>)}
    ></ListWithTitle>
  )
}

function Step({ step }: { step: Step }) {
  return (
    <li className='list-group-item'>
      <div>
      {step.step}
      </div>
      {step.notes && (
        <div className={css`
          background-color: #f7f0b7;
          padding: 8px;
          margin-top: 5px;
          border-radius: 5px;
          box-shadow: 3px 3px 3px #f0f0f0;
        `}>
          {step.notes}
        </div>
      )}
    </li>
  );
}

export default Recipe;