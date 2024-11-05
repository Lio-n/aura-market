import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const id = params.id;
  if (!id) error(404);

  return {
    id,
  };
};
