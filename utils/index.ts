import { parse } from 'yaml';
import { readFile, readdir } from 'fs/promises';
import path from 'path';
import { NamedIngredient, ORFRecipe, Recipe } from '../interfaces';

function getRecipesDir() {
  return path.join(process.cwd(), `recipes/`);
}

async function doGetRecipe(path: string) {
  const sampleRecipeContents = await readFile(path);
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
    notes: parsedRecipe.notes ?? '',
  };

  return convertedRecipe;
}

export type WrappedRecipe = {
  diskName: string,
  recipe: Recipe,
}

export async function getRecipes() {
  const recipesDir = getRecipesDir();
  const recipeFilenames = await readdir(recipesDir);
  const wrappedRecipes = await Promise.all(
    recipeFilenames
      .filter(rn => rn.endsWith(".yaml"))
      .map(async (filename) => {
        const recipePath = path.join(recipesDir, filename);
        return {
          diskName: filename.replace(/\.yaml$/, ''),
          recipe: await doGetRecipe(recipePath),
        };
      })
  );
  return wrappedRecipes;
}

export async function getRecipeByName(name: string) {
  const recipePath = path.join(getRecipesDir(), `${name}.yaml`);
  return doGetRecipe(recipePath);
}

export async function getRecipeNames() {
  const recipeFilenames = await readdir(getRecipesDir());
  console.log("recipe filenames", recipeFilenames);
  return recipeFilenames
    .filter(rn => rn.endsWith(".yaml"))
    .map(filename => filename.replace(/\.yaml$/, ''));
}

export interface ExternalRecipe {
  title: string,
  url: string,
}

export async function getExternalRecipes() {
  const externalRecipesPath = path.join(getRecipesDir(), `external.json`);
  const contents = await readFile(externalRecipesPath);
  return JSON.parse(contents.toString()) as ExternalRecipe[];
}
