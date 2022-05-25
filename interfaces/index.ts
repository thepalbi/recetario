export type Recipe = {
  name: string
  ingredients: NamedIngredient[],
  steps: Step[]
};

export type ORFRecipe = {
  recipe_name: string
  ingredients: ORFNamedIngredients[],
  steps: Step[]
}

export type ORFNamedIngredients = { [name: string]: IngredientDetails | undefined };

export type IngredientDetails = {
  amounts: Amount[],
  notes: string,
}

export type NamedIngredient = {
  name: string,
} & IngredientDetails;

export type Amount = {
  amount: number,
  unit: string,
}

export type Step = {
  step: string
}