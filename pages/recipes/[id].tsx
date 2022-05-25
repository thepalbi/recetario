import Recipe from "../../components/Recipe";
import { Recipe as RecipeType } from "../../interfaces";
import { getRecipeByName, getRecipeNames } from "../../utils";

export default function RecipePage({ recipe }: { recipe: RecipeType }) {
  return (
    <div className='container'>
      <div className="row mt-2 mb-1 recipe-title">
        <h3>{recipe.name}</h3>
      </div>
      <div className='row justify-content-center'>
        <div className="col-md-9 pt-20 pb-20">
          <Recipe recipe={recipe}></Recipe>
        </div>
      </div>
      <style jsx>{`
      .recipe-title {
        text-align: center;
      }
    `}</style>
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