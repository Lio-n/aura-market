<script lang="ts">
  export let options: { value: string; name: string }[] = [];
  export let label: string | null = null;
  export let preview: boolean = false;
  export let selected: string = '';
  export let placeholder: string = '';
</script>

<div>
  {#if label}
    <label for={$$props.name} class="block mb-2 text-sm font-medium text-gray-500">{label}</label>
  {/if}
  <div class="relative">
    <select
      id={$$props.name}
      name={$$props.name}
      class="bg-gray-50 border border-gray-300 !text-gray-500 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-8 appearance-none cursor-pointer"
      disabled={preview}
      class:bg-white={preview}
      class:border-none={preview}
      class:text-gray-500={preview}
    >
      {#if placeholder}
        <option hidden selected>{placeholder}</option>
      {/if}
      {#each options as item}
        <option value={item.value} class="text-gray-500" selected={selected === item.value}>{item.name}</option>
      {/each}
    </select>
    {#if !preview}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.2"
        stroke="currentColor"
        class="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
      </svg>
    {/if}
  </div>
</div>
