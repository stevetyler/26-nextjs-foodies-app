import fs from 'node:fs';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = new sql('meals.db');

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 4000)); // Simulate async operation
    
    //throw new Error('Failed to fetch meals'); // Simulate an error for demonstration
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(mealSlug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(mealSlug); // protects against SQL injection
}

export async function saveMeal(mealData) {
    mealData.slug = slugify(mealData.title, { lower: true});
    mealData.instructions = xss(mealData.instructions);

    const extension = mealData.image.name.split('.').pop();
    const fileName = `${mealData.slug}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await mealData.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage, (error) => {
        if (error) {
            throw new Error('Failed to save image.');
        }
    }));

    mealData.image = `/images/${fileName}`;

    // needs to be in correct order as in DB
    db.prepare(`
        INSERT INTO meals 
            (title, summary, instructions, creator, creator_email, image, slug) 
        VALUES (
            @title, 
            @summary,
            @instructions, 
            @creator, 
            @creator_email,
            @image,
            @slug
        )
    `).run(mealData);
    
}