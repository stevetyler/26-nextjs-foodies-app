import MealsGrid from '@/components/meals/meals-grid';
import classes from './page.module.css';
import Link from 'next/link';
import { getMeals } from '../lib/meals';  
import { Suspense } from 'react';

async function Meals() {
  const meals = await getMeals();

  return <MealsGrid meals={ meals } />
}

export default function MealsPage() { // can use async here for server components
  
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious Meals created <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Share your favorite recipes with the community and explore meals made by others.
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">
            Share your favourite recipe
          </Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}> 
          <Meals /> 
        </Suspense>
      </main>
    </>
  );
}