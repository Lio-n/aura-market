import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const category = params.slug;

  if (!category) error(404);

  return {
    category,
  };
};
