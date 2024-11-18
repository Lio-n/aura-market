<script lang="ts">
  export let options: { value: string; name: string }[] = [];
  export let label: string | null = null;
  export let preview: boolean = false;
  export let selected: string = '';
</script>

{#if label}
  <label for={$$props.name} class="block mb-2 text-sm font-medium text-gray-900">{label}</label>
{/if}
<select
  id={$$props.name}
  name={$$props.name}
  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
  disabled={preview}
  class:bg-white={preview}
  class:border-none={preview}
  class:text-gray-500={preview}
>
  {#each options as item}
    <option value={item.value} selected={selected === item.name}>{item.name}</option>
  {/each}
</select>
