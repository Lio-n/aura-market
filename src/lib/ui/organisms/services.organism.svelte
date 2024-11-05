<script>
  const ServicesContent = [
    {
      name: 'Frequently Asked Questions',
      description: 'Common questions answered here.',
      thumbnail: '/generic/family_with_laptop.jpg',
    },
    {
      name: 'Online Payment Process',
      description: 'Secure and simple online payments.',
      thumbnail: '/generic/woman_buying.jpg',
    },
    {
      name: 'Home Delivery',
      description: 'Fast and reliable home delivery.',
      thumbnail: '/generic/delivery-boy.jpg',
    },
  ];
</script>

<section class="px-4 py-4 md:py-8 md:px-12">
  <h2 class="text-xl mb-4 font-bold text-gray-900">Services To Help You Shop</h2>

  <ul class="grid max-sm:grid-rows-3 sm:grid-cols-3 gap-4 overflow-x-auto">
    {#each ServicesContent as item}
      <div class="bg-gray-100 rounded-md grid grid-rows-1 max-sm:grid-cols-2 sm:grid-rows-2">
        <div class="p-3 sm:p-6 grid gap-4">
          <span class="text-xl font-bold">{item.name}</span>
          <span class="text-gray-700 text-xs sm:text-sm font-medium">{item.description}</span>
        </div>

        <div class="group max-sm:rounded-r-md sm:rounded-b-md relative overflow-hidden">
          <img
            src={item.thumbnail}
            class="size-full z-0 object-cover max-sm:rounded-r-md sm:rounded-b-md absolute transition duration-500 ease-in-out group-hover:scale-110"
            alt="{item.name} image"
          />
        </div>
      </div>
    {/each}
  </ul>
</section>
