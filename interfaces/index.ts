export type Recipe = {
  recipe_name: string
  ingredients: NamedIngredients,
  steps: Step[]
};

export type NamedIngredients = { [name: string]: IngredientDetails | undefined };

export type IngredientDetails = {
  amounts: Amount[] | undefined,
  notes: string,
}

export type Amount = {
  amount: number,
  unit: string,
}

export type Step = {
  step: string
}