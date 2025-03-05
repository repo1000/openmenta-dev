import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { accountSchema } from './schema';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
  // Initialize the form with default values
  const form = await superValidate(zod(accountSchema));

  return { form };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(accountSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real application, you would save the data to a database
    console.log('Form data:', form.data);

    // Return success message
    return {
      form,
      success: true
    };
  }
} satisfies Actions;