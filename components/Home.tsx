import * as React from 'react';
import { Recipe as RecipeType } from '../interfaces';
import Recipe from './Recipe';

type HomeProps = {
  recipes: RecipeType[],
}

function Home({ recipes }: HomeProps) {
  return (
    <div className='container'>
      <h1>Recetario</h1>
      <div className='row'>
        {recipes.map(r => <Recipe key={r.recipe_name} recipe={r}></Recipe>)}
      </div>
    </div>
  )

}

export default Home;