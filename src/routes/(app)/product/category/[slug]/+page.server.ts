import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PUBLIC_PLATZI_FAKE_STORE_API_V1 } from '$env/static/public';
import { codeByCategory } from '../../../../../constants';

export const load: PageServerLoad = async ({ params }) => {
  const category = params.slug;
  if (!category) error(404);

  const res = await fetch(
    PUBLIC_PLATZI_FAKE_STORE_API_V1 + `products/?categoryId=${codeByCategory[category]}&offset=0&limit=8`
  );
  const products = await res.json();

  return {
    category,
    products,
  };
};
