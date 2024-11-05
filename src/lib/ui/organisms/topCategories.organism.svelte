<script>
  const TopCategoriesContent = [
    { to: '/product/category/clothes', name: 'Clothes', thumbnail: '/products/top_clothes.jpg' },
    { to: '/product/category/shoes', name: 'Shoes', thumbnail: '/products/top_shoes.jpg' },
    {
      to: '/product/category/miscellaneous',
      name: 'Miscellaneous',
      thumbnail: '/products/top_miscellaneous.jpeg',
    },
    {
      to: '/product/category/electronics',
      name: 'Electronics',
      thumbnail: '/products/top_electronics.jpg',
    },
  ];
</script>

<section class="px-4 py-4 md:py-8 md:px-12">
  <h2 class="text-xl mb-4 font-bold text-gray-900">Shop Our Top Categories</h2>

  <ul
    class="grid grid-cols-2 grid-rows-[repeat(2,_8rem)] sm:grid-cols-4 sm:grid-rows-[repeat(1,_15rem)] gap-4 overflow-x-auto"
  >
    {#each TopCategoriesContent as item}
      <a href={item.to} class="group rounded-md relative overflow-hidden text-left text-sm text-gray-700">
        <span
          class="tracking-wide absolute top-0 text-center z-[1] w-full pt-4 font-semibold text-white text-md sm:text-lg"
        >
          {item.name}
        </span>
        <img
          src={item.thumbnail}
          class="size-full z-0 object-cover rounded-md absolute transition duration-500 ease-in-out group-hover:scale-110"
          alt="Louvre"
        />
      </a>
    {/each}
  </ul>
</section>
