<script lang="ts">
  import { onMount } from 'svelte';
  import PopularCategories from './popularCategories.svelte';
  import type { ProductEntity } from '$lib/stores/product.store';
  import { goto } from '$app/navigation';

  interface FilteredProduct extends Pick<ProductEntity, 'id' | 'title' | 'price'> {
    image: string;
  }

  let searchRef: HTMLDivElement;
  let isTapping = false;
  let hasError = null;
  let isLoading = false;
  let data: Array<FilteredProduct> | null = null;
  let searchValue = '';

  const handleKeyDown = async (event: KeyboardEvent) => {
    if (searchValue.length === 0 || event.key !== 'Enter') return;

    isLoading = false;
    goto(`/product/search/${searchValue}`);
  };

  const handleSubmit = async (event: Event) => {
    const input = event.currentTarget as HTMLInputElement;
    searchValue = input.value.substring(0, 10);

    isLoading = searchValue.length !== 0;

    const max_min_input_length = input.value.length < 2;
    if (max_min_input_length) return;

    data = await SearchByQuery(input.value);
  };

  const SearchByQuery = async (queryTitle: string) => {
    try {
      const res = await fetch(`/api/products/?query=${queryTitle}`);
      const parsedJson = await res.json();

      return parsedJson;
    } catch (error) {
      hasError = 'Something goes wrong!';
    } finally {
      isLoading = false;
    }
  };

  const toggleContent = () => {
    if (!isTapping) {
      isTapping = true;
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef && !searchRef.contains(event.target as Node)) {
      isTapping = false;
      data = null;
    }
  };

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });
</script>

<div class={`md:relative w-full max-w-96`}>
  <div class={`relative flex items-center justify-end`} bind:this={searchRef}>
    <input
      on:click={toggleContent}
      on:input={handleSubmit}
      on:keydown={handleKeyDown}
      type="text"
      class={`transition-all py-2 rounded-2xl w-full py-2 px-4 text-xs bg-gray-100 border-none font-medium focus:outline-none bg-right bg-no-repeat ${isTapping ? 'max-w-96' : 'max-w-60'}`}
      placeholder="Search Product"
    />
    <img
      src="/icons/{isLoading ? 'arrow-path.svg' : 'magnifying-glass.svg'}"
      alt="magnifying glass icon"
      class="absolute mr-2 w-4 {isLoading ? 'animate-spin' : ''}"
    />
  </div>

  {#if isTapping}
    <div
      class="left-0 rigth-0 w-dvw md:w-[30rem] md:left-[-3rem] sm:block absolute top-6 p-2 md:py-6 md:px-4 md:rounded-md grid bg-white shadow-md mt-8"
    >
      {#if data}
        {#if data?.length === 0}
          <p class="text-center font-medium text-gray-700">No products found</p>
        {:else}
          <div class="space-y-1">
            {#each data as item}
              <a
                class="w-full rounded-md bg-gray-100 flex justify-between items-center p-2 gap-4 font-semibold text-xs border-2 border-transparent hover:bg-gray-200 hover:border-gray-300"
                href="/product/{item.id}"
              >
                <div class="flex items-center">
                  <img src={item.image} alt="clothes - category" class="size-12 rounded-md aspect-square" />
                  <p class="ml-2 truncate max-sm:w-60">{item.title}</p>
                </div>

                <span class="flex text-lg text-green-600">
                  <span class="text-xs">$</span>
                  {item.price}
                </span>
              </a>
            {/each}
          </div>
        {/if}
      {:else}
        <PopularCategories />
      {/if}
    </div>
  {/if}
</div>
