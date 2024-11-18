// import { error } from '@sveltejs/kit';
// // import type { PageServerLoad } from './[slug]/$types';
// import { PUBLIC_PLATZI_FAKE_STORE_API_V1 } from '$env/static/public';
// import { CodeByCategory } from '$lib/stores/product.store';

// export const load: PageServerLoad = async ({ params }) => {
//   const category = params.slug;
//   if (!category) error(404);

//   const res = await fetch(
//     PUBLIC_PLATZI_FAKE_STORE_API_V1 + `products/?categoryId=${CodeByCategory[category]}&offset=0&limit=8`
//   );
//   const products = await res.json();

//   return {
//     category,
//     products,
//   };
// };
