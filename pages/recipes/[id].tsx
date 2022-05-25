import Recipe from "../../components/Recipe";
import { Recipe as RecipeType } from "../../interfaces";
import { getRecipeByName, getRecipeNames } from "../../utils";

export default function RecipePage({ recipe }: { recipe: RecipeType }) {
  return (
    <div className='container'>
      <h3 className="mt-3 mb-3">{recipe.name}</h3>
      <div className='row'>
        <Recipe recipe={recipe}></Recipe>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const recipeNames = await getRecipeNames();
  return {
    paths: recipeNames.map(name => {
      return {
        params: { id: name }
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const recipe = await getRecipeByName(params.id);
  return {
    props: {
      recipe: recipe
    }
  };
}