'use server';

import { redirect } from 'next/navigation';

import { saveMeal } from './meals';

function isInvalidtext(text) {
  return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData ) { // useFormState requires 2 parameters
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  if(
    isInvalidtext(meal.title) ||
    isInvalidtext(meal.summary) ||
    isInvalidtext(meal.instructions) ||
    isInvalidtext(meal.creator) ||
    isInvalidtext(meal.creator_email) ||
    !meal.image || meal.image.size === 0
  ) {
    //throw new Error('Title, summary, instructions, name, email, and image are required.'); // will discard form submission values
    return {
      message: 'Title, summary, instructions, name, email, and image are required.'
    }
  }

  await saveMeal(meal);
  redirect('/meals');
}