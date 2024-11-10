<script lang="ts">
  import { onMount } from 'svelte';

  let searchRef: HTMLDivElement;
  let isTapping = false;
  let isLoading = false;
  let searchValue = '';
  export let placeholder = 'Search';
  export let onKeyDown: () => void = () => {};
  export let onSearchByQuery: (query: string) => void = () => {};

  const handleKeyDown = async (event: KeyboardEvent) => {
    if (searchValue.length === 0 || event.key !== 'Enter') return;

    isLoading = false;
    onKeyDown();
  };

  const handleSubmit = async (event: Event) => {
    const input = event.currentTarget as HTMLInputElement;
    searchValue = input.value.substring(0, 10);

    isLoading = searchValue.length !== 0;

    const max_min_input_length = input.value.length < 2;
    if (max_min_input_length) return;

    await onSearchByQuery(input.value);
    isLoading = false;
  };

  const toggleContent = () => {
    if (!isTapping) {
      isTapping = true;
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef && !searchRef.contains(event.target as Node)) {
      isTapping = false;
    }
  };

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  });
</script>

<div class={`relative flex items-center justify-end w-full`} bind:this={searchRef}>
  <input
    on:click={toggleContent}
    on:input={handleSubmit}
    on:keydown={handleKeyDown}
    type="text"
    class={`transition-all py-2 rounded-2xl w-full py-2 px-4 text-xs bg-gray-100 border-none font-medium focus:outline-none bg-right bg-no-repeat max-sm:max-w-full ${isTapping ? 'max-w-96' : 'max-w-60'}`}
    {placeholder}
  />
  <img
    src="/icons/{isLoading ? 'arrow-path.svg' : 'magnifying-glass.svg'}"
    alt="magnifying glass icon"
    class="absolute mr-2 w-4 {isLoading ? 'animate-spin' : ''}"
  />
</div>
