import { parse } from 'yaml';
import { readFile, readdir } from 'fs/promises';
import path from 'path';
import { NamedIngredient, ORFRecipe, Recipe } from '../interfaces';

function getRecipesDir() {
  return path.join(process.cwd(), `recipes/`);
}

export async function getRecipeByName(name: string) {
  const sampleRecipeContents = await readFile(path.join(getRecipesDir(), `${name}.yaml`));
  const parsedRecipe = parse(sampleRecipeContents.toString()) as ORFRecipe;

  const convertedRecipe: Recipe = {
    name: parsedRecipe.recipe_name,
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
    notes: parsedRecipe.notes,
  };

  return convertedRecipe;
}

export async function getRecipeNames() {
  const recipeFilenames = await readdir(getRecipesDir());
  console.log("recipe filenames", recipeFilenames);
  return recipeFilenames.map(filename => filename.replace(/\.yaml$/, ''));
}