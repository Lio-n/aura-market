import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PUBLIC_PLATZI_FAKE_STORE_API_V1 } from '$env/static/public';

export const load: PageServerLoad = async ({ params }) => {
  const query = params.query;
  if (!query) error(404);

  const res = await fetch(PUBLIC_PLATZI_FAKE_STORE_API_V1 + `products/?title=${query}&offset=0&limit=8`);
  const products = await res.json();

  return {
    query,
    products,
  };
};
