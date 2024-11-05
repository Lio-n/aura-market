import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const discount_percentage = params.slug;

  if (!discount_percentage) error(404);

  return {
    discount_percentage,
  };
};
