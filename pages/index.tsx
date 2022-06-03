import Head from 'next/head';
import Link from 'next/link';
import Nav from '../components/Nav';
import { getRecipes, WrappedRecipe } from '../utils';

const HomePage = ({ recipes }: { recipes: WrappedRecipe[] }) => {
  return (
    <div className='container'>
      <Head>
        <title>Recetario</title>
      </Head>
      <Nav></Nav>
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
