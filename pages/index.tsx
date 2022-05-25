import Link from 'next/link';
import { Recipe } from '../interfaces';
import { getRecipes, WrappedRecipe } from '../utils';

const HomePage = ({ recipes }: { recipes: WrappedRecipe[] }) => {
  return (
    <div className='container'>
      <h1 className='mt-3'>Recetario</h1>
      <div className='row'>
        {recipes.map((r, i) =>
          <Link key={i} href={`/recipes/${r.diskName}`}>
            {r.recipe.name}
          </Link>)}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const recipes = await getRecipes();
  return {
    props: {
      recipes
    }
  };
}

export default HomePage
