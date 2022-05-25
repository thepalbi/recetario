import Link from 'next/link';
import { getRecipeNames } from '../utils';

const HomePage = ({ recipeNames }: { recipeNames: string[] }) => {
  return (
    <div className='container'>
      <h1 className='mt-3'>Recetario</h1>
      <div className='row'>
        {recipeNames.map(name =>
          <Link key={name} href={`/recipes/${name}`}>
            {name}
          </Link>)}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const recipeNames = await getRecipeNames();
  console.log("recipe names in home:", recipeNames);
  return {
    props: {
      recipeNames
    }
  };
}

export default HomePage
