import sql from 'better-sqlite3';
const db = new sql('meals.db');

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate async operation
    return db.prepare('SELECT * FROM meals').all();
}

