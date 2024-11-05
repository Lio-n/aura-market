<script>
  const TopDiscountsContent = [
    {
      to: '/product/discounts/40',
      discount_percentage: 40,
      description: 'Find all types of outfits for women, perfect for any occasion.',
      thumbnail: '/products/woman_clothes.jpg',
      bg_color: 'bg-rose-200',
      text_color: 'text-rose-600',
    },
    {
      to: '/product/discounts/20',
      discount_percentage: 20,
      description: "Discover our full range of stylish men's clothes!",
      thumbnail: '/products/man_clothes.jpg',
      bg_color: 'bg-cyan-200',
      text_color: 'text-cyan-600',
    },
    {
      to: '/product/discounts/35',
      discount_percentage: 35,
      description: 'Dive into the magical world of all Harry Potter books!',
      thumbnail: '/products/book_harry_potter.jpeg',
      bg_color: 'bg-amber-200',
      text_color: 'text-amber-600',
    },
  ];
</script>

<section class="px-4 py-4 md:py-8 md:px-12">
  <h2 class="text-xl mb-4 font-bold text-gray-900">Get Up 70% OFF</h2>

  <ul class="grid sm:grid-cols-3 gap-4 overflow-x-auto">
    {#each TopDiscountsContent as item}
      <a href={item.to} class="{item.bg_color} rounded-md grid grid-rows-1 max-sm:grid-cols-2 sm:grid-rows-2">
        <div class="p-3 sm:px-6 sm:py-4">
          <span class="font-semibold text-gray-700 text-lg">Save</span>

          <span class={`flex font-bold ${item.text_color}`}>
            <span class={`text-2xl sm:text-5xl`}>
              {item.discount_percentage}
            </span>
            <span>%</span>
          </span>

          <span class="text-gray-700 text-xs sm:text-sm font-medium">
            {item.description}
          </span>
        </div>

        <div class="group max-sm:rounded-r-md sm:rounded-b-md relative overflow-hidden">
          <img
            src={item.thumbnail}
            class="size-full z-0 object-cover max-sm:rounded-r-md sm:rounded-b-md absolute transition duration-500 ease-in-out group-hover:scale-110"
            alt="Louvre"
          />
        </div>
      </a>
    {/each}
  </ul>
</section>
