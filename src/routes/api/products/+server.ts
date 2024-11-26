import type { RequestHandler } from '@sveltejs/kit';
import products from '$lib/data/json/query_products.json';

export const GET: RequestHandler = async ({ url }) => {
  const query = url.searchParams.get('query');

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query?.toLowerCase() || '')
  );

  return new Response(JSON.stringify(filteredProducts.slice(0, 5)), {
    status: 200,
  });
};
