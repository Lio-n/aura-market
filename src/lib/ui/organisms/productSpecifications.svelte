<script lang="ts" context="module">
  type SpecificationItem = {
    key: string;
    value: string | number;
  };

  export type SpecificationsType = {
    general: SpecificationItem[];
  };
</script>

<script lang="ts">
  export let specifications: SpecificationsType;
</script>

<section class="my-8 sm:my-20">
  <h2 class="text-lg sm:text-xl mb-4 font-bold text-gray-900">Full Specifications</h2>

  <div class="p-2 sm:p-4 md:p-8 bg-gray-100 rounded-md">
    <h3 class="text-gray-800 mb-2 font-semibold">General</h3>
    <div>
      {#each specifications.general as item, i}
        <div class=" px-4 py-2 flex justify-between {i % 2 !== 0 ? 'bg-gray-100' : 'bg-white rounded-md'}">
          <span class="text-gray-800 font-medium">{item.key}</span><span class="text-gray-500">{item.value}</span>
        </div>
      {/each}
    </div>
  </div>
</section>
