import * as yaml from "js-yaml";

let sampleRecipe = `
recipe_name: Chimichurri
ingredients:
  - Perejil:
      amounts:
        - amount: 1
          unit: parte
      notes: Picar.
  - Ajo:
      amounts:
        - amount: 1
          unit: parte
      notes: Picar en brunoise pequeña.
  - Vinagre de vino:
      notes:  Suficiente para hidratar todos los ingredientes
  - Aceite de oliva:
  - Orégano seco:
      amounts:
        - amount: 1
          unit: parte
      notes: Forma parte de los secos.
  - Ají mólido:
      amounts:
        - amount: 1
          unit: parte
      notes: Forma parte de los secos.
steps:  
  - step: Mezclar el ajo, perejil y los secos. Hidratar con suficiente vinagre hasta que cubra todo.
  - step: Reservar en heladera.
  - step: Previo a utilizar, agregar el aceite de oliva y más perejil picado (de forma de agregar elementos frescos).
`;

export function loadRecipes() {
  let sampleLoadedRecipe = yaml.load(sampleRecipe);
  return [sampleLoadedRecipe];
}