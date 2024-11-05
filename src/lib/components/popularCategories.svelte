<script>
  const CategoriesContent = [
    { to: '/product/category/clothes', name: 'Clothes', availables: 94, thumbnail: '/products/clothes.jpeg' },
    { to: '/product/category/shoes', name: 'Shoes', availables: 94, thumbnail: '/products/shoes.jpeg' },
    {
      to: '/product/category/miscellaneous',
      name: 'Miscellaneous',
      availables: 94,
      thumbnail: '/products/miscellaneous.jpeg',
    },
    {
      to: '/product/category/electronics',
      name: 'Electronics',
      availables: 94,
      thumbnail: '/products/electronics.jpeg',
    },
  ];
</script>

<h2 class="mb-4 font-bold">Popular Categories</h2>

<div class="border-t-[1px] pt-4 grid grid-cols-2 grid-rows-2 gap-4">
  {#each CategoriesContent as item}
    <a
      class="w-full rounded-md bg-gray-100 flex p-2 gap-2 border-2 border-transparent hover:bg-gray-200 hover:border-gray-300"
      href={item.to}
    >
      <img src={item.thumbnail} alt="clothes - category" class="size-12 rounded-md aspect-square" />

      <div class="grid gap-2 content-center">
        <p class="font-semibold text-base truncate">{item.name}</p>
        <p class="text-xs text-gray-700 truncate">{item.availables} Items Available</p>
      </div>
    </a>
  {/each}
</div>
