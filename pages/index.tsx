import { css } from '@emotion/css';
import Head from 'next/head';
import Link from 'next/link';
import Nav from '../components/Nav';
import { ExternalRecipe, getExternalRecipes, getRecipes, WrappedRecipe } from '../utils';

const HomePage = ({ recipes, externalRecipes }: { recipes: WrappedRecipe[], externalRecipes: ExternalRecipe[] }) => {
  return (
    <div className='container'>
      <Head>
        <title>Recetario</title>
      </Head>
      <Nav></Nav>
      <div className={css`
        margin-left: 11px;
      `}>
        <div className='row'>
          {recipes.map((r, i) =>
            <Link key={i} href={`/recipes/${r.diskName}`}>
              {r.recipe.name}
            </Link>)}
        </div>
        <div className={`row ${css`
        margin-top: 20px;
      `}`}>
          {externalRecipes.map((r, i) =>
            <Link
              key={i}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {r.title}
            </Link>)}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const recipes = await getRecipes();
  const externalRecipes = await getExternalRecipes();
  return {
    props: {
      recipes,
      externalRecipes
    }
  };
}

export default HomePage
