<script lang="ts">
  import { onMount } from 'svelte';

  let searchRef: HTMLDivElement;
  let isTapping = false;
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

  const toggleContent = () => {
    if (!isTapping) {
      isTapping = true;
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef && !searchRef.contains(event.target as Node)) {
      isTapping = false;
    }
  };

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });
</script>

<div class={`relative w-full max-w-96`}>
  <div class={`relative flex items-center justify-end`} bind:this={searchRef}>
    <input
      on:click={toggleContent}
      type="text"
      class={`transition-all py-2 rounded-2xl w-full py-2 px-4 text-xs bg-gray-100 border-none font-medium focus:outline-none bg-right bg-no-repeat ${isTapping ? 'max-w-96' : 'max-w-60'}`}
      placeholder="Search Product"
    />
    <img src="/icons/magnifying-glass.svg" alt="magnifying glass icon" class="absolute mr-2 w-4" />
  </div>

  {#if isTapping}
    <div
      class="hidden left-[-6rem] md:left-[-3rem] sm:block absolute top-6 p-6 rounded-md grid bg-white shadow-sm mt-8 w-[30rem]"
    >
      <h2 class="mb-4 font-bold">Popular Categories</h2>

      <div class="border-t-[1px] pt-4 grid grid-cols-2 grid-rows-2 gap-4">
        {#each CategoriesContent as item}
          <a class="w-full rounded-md bg-gray-100 flex p-2 gap-2" href={item.to}>
            <img src={item.thumbnail} alt="clothes - category" class="size-12 rounded-md aspect-square" />

            <div class="grid gap-2 content-center">
              <p class="font-semibold text-base">{item.name}</p>
              <p class="text-xs text-gray-700">{item.availables} Items Available</p>
            </div>
          </a>
        {/each}
      </div>
    </div>
  {/if}
</div>
<!-- clothes.jpeg shoes.jpeg miscellaneous.jpeg electronics.jpeg -->
