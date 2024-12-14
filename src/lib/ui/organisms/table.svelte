<script lang="ts">
  export let tableHeads: Array<string>;
  export let tableBody: Array<ArrayLike<{ [key: string]: string | number }>> | null | undefined = null;
</script>

<div class="relative {$$props.class}">
  <table class="w-full text-sm text-left rtl:text-right text-gray-500">
    <thead class="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        {#each tableHeads as item}
          <th scope="col" class="text-xs px-2 py-3"> {item} </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#if tableBody}
        {#each tableBody as product, i}
          <tr class="bg-white border-b">
            {#each Object.entries(product) as [key, value]}
              <td class="px-2 py-4">{value}</td>
            {/each}
          </tr>
        {/each}
      {:else}
        <slot />
      {/if}
    </tbody>
  </table>
</div>
