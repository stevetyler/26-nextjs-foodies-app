import MealsGrid from '@/components/meals/meals-grid';
import classes from './page.module.css';
import Link from 'next/link';

export default function MealsPage() {
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
      <MealsGrid meals={[]} />
    </main>
   </>
  );
}