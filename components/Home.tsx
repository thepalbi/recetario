import * as React from 'react';
import { Recipe as RecipeType } from '../interfaces';
import Recipe from './Recipe';

function Home() {
  let someTestRecipe: RecipeType = {
    recipe_name: "falafel",
    ingredients: {
      "Perejil": {
        amounts: [
          {
            amount: 1,
            unit: "parte"
          }
        ],
        notes: "Picar en brunoise pequeña.",
      }
    },
    steps: [],
  };
  return (
    <div className='container'>
      <h1>Recetario</h1>
      <div className='row'>
        <Recipe recipe={someTestRecipe} ></Recipe>
      </div>
    </div>
  )

}

export default Home;