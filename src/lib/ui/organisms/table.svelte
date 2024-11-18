<script lang="ts">
  export let tableHeads: Array<string>;
  export let tableBody: Array<ArrayLike<{ [key: string]: string | number }>> | null = null;
</script>

<div class="relative">
  <table class="w-full text-sm text-left rtl:text-right text-gray-500">
    <thead class="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        {#each tableHeads as item}
          <th scope="col" class="pl-2 py-3"> {item} </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#if tableBody}
        {#each tableBody as product, i}
          <tr class="bg-white border-b">
            {#each Object.entries(product) as [key, value]}
              <td class="pl-2 py-4">{value} {console.log(value)}</td>
            {/each}
          </tr>
        {/each}
      {:else}
        <slot />
      {/if}
    </tbody>
  </table>
</div>
