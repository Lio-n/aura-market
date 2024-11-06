<script>
  let { data } = $props();

  const Specifications = {
    general: [
      { Brand: 'Lorem ipsum' },
      { Model: data.product.title },
      { Price: data.product.price },
      {
        'Release date': new Date(data.product.creationAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
        }),
      },
      { 'Model Number': 'E10LRF9' },
    ],
  };
</script>

{#if !data?.product}
  <div class="h-80 grid place-items-center">
    <h2 class="font-medium text-gray-700">No product found</h2>
  </div>
{:else}
  <div class="mx-4">
    <nav class="text-xs text-gray-500 mt-4 font-medium flex">
      <!-- svelte-ignore a11y_consider_explicit_label -->
      <a href="/"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-4 hover:fill-gray-700"
        >
          <path
            d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"
          />
          <path
            d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"
          />
        </svg></a
      >
      <span class="mx-2">/</span>
      <a class="hover:text-gray-900" href="/category/{data.product.category.name}">{data.product.category.name}</a><span
        class="mx-2">/</span
      >
      <span class="text-gray-700">{data.product.title}</span>
    </nav>

    <section class="grid sm:grid-cols-2 gap-4 md:gap-12 mt-8">
      <div>
        <img
          class="size-full object-cover rounded-md max-h-60 sm:max-h-96"
          src={data.product.images[0]}
          alt="{data.product.title} image"
        />
      </div>
      <div>
        <div class="border-b-[1px] pb-4">
          <h2 class="text-2xl sm:text-4xl mb-2 sm:mb-4 font-bold text-gray-900">{data.product.title}</h2>
          <p class="text-xs text-gray-700">{data.product.description}</p>
        </div>

        <div class="flex justify-between items-center my-4 sm:my-6 md-my-8">
          <div class="flex bg-gray-100 text-gray-900 rounded-md font-semibold">
            <button class="px-4 hover:bg-gray-200">-</button>
            <span class="px-4 py-2">10</span>
            <button class="px-4 hover:bg-gray-200">+</button>
          </div>

          <span class="flex text-2xl text-green-600 font-semibold">
            <span class="text-base">$</span>
            {data.product.price}
          </span>
        </div>

        <div class="flex gap-2">
          <button
            class="transition-colors bg-gray-950 rounded-md py-2 px-4 text-sm sm:py-4 sm:px-6 sm:text-md w-full text-white font-semibold border-2 border-transparent hover:bg-white hover:border-gray-900 hover:text-gray-900 group"
          >
            Buy Now
          </button>

          <button
            class="transition-colors flex gap-2 justify-center items-center rounded-md py-2 px-4 text-sm sm:py-4 sm:px-6 sm:text-md w-full font-semibold border-2 bg-white hover:bg-gray-950 border-gray-900 text-gray-900 hover:text-white group"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="transition-colors size-4 sm:size-6 stroke-gray-900 group-hover:stroke-gray-200"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            Add to cart
          </button>
        </div>
      </div>
    </section>

    <section class="my-8 sm:my-20">
      <h2 class="text-lg sm:text-xl mb-4 font-bold text-gray-900">{data.product.title} Full Specifications</h2>

      <div class="p-4 sm:p-8 bg-gray-100 rounded-md">
        <h3 class="text-gray-800 mb-2 font-semibold">General</h3>
        <div>
          {#each Specifications.general as item, i}
            <div class=" px-4 py-2 flex justify-between {i % 2 !== 0 ? 'bg-gray-100' : 'bg-white rounded-md'}">
              <span class="text-gray-800 font-medium">{Object.keys(item)}</span><span class="text-gray-500"
                >{Object.values(item)}</span
              >
            </div>
          {/each}
        </div>
      </div>
    </section>
  </div>
{/if}
