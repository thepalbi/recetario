import type { NextPage } from 'next'
import Home from '../components/Home'
import { parse } from 'yaml';
import { readFile } from 'fs/promises';
import { NamedIngredient, ORFRecipe, Recipe } from '../interfaces';
import * as path from 'path';

const HomePage = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <Home recipes={recipes}></Home>
  )
}

export async function getStaticProps() {
  const sampleRecipeContents = await readFile(path.join(process.cwd(), "recipes/chimichurri.yaml"));
  const parsedRecipe = parse(sampleRecipeContents.toString()) as ORFRecipe;

  const convertedRecipe: Recipe = {
    recipe_name: parsedRecipe.recipe_name,
    steps: parsedRecipe.steps,
    ingredients: parsedRecipe.ingredients.map(namedIngredients => {
      let ingredients = Object.keys(namedIngredients).map(name => {
        let ingredient: NamedIngredient = {
          name: name,
          amounts: namedIngredients[name]?.amounts ?? [],
          notes: namedIngredients[name]?.notes ?? '',
        };
        return ingredient;
      });
      return ingredients[0];
    }),
  };

  console.log("parsed recipe:", JSON.stringify(parsedRecipe));
  return {
    props: {
      recipes: [convertedRecipe],
    }
  }
}

export default HomePage
