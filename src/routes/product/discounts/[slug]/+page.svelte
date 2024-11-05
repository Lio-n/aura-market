<script>
  let { data } = $props();
</script>

<h1>
  Discount percentage : {data.discount_percentage}
  <!-- {#each data.products as item}
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
  {/each} -->
</h1>
