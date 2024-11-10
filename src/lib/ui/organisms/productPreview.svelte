<script lang="ts">
  import { draggable } from '@neodrag/svelte';
  import Icon from '../atoms/icon.svelte';
  import { onMount } from 'svelte';
  import { resize } from '$lib/helper/resize';

  let { product } = $props();
  let resize_container = 'container-product-preview';
  let resize_handler = 'resize-product-preview';

  let showModal = $state(false);
  const toggleModal = () => {
    showModal = !showModal;
  };

  onMount(() => {
    resize(resize_container, resize_handler);
  });
</script>

<!-- <div id={resize_container} class="absolute "> -->
<div
  id={resize_container}
  use:draggable={{ cancel: `#${resize_handler}`, bounds: { top: 20, left: 50, bottom: 20, right: 20 } }}
  class="absolute top-32 left-32 z-20 min-w-60 min-h-60 shadow bg-white rounded cursor-grab"
>
  <div class="bg-gray-950 w-full flex justify-end rounded-t">
    <button on:click={toggleModal}>
      <Icon
        name="x-mark"
        class="stroke-2 rounded-tr rstroke-2 p-2 size-8 bg-gray-800 stroke-gray-500 hover:bg-gray-200 hover:stroke-gray-800 cursor-pointer"
      /></button
    >
  </div>
  <div class="overflow">{product?.title}</div>

  <div id={resize_handler} class="absolute right-0 bottom-0 p-1 rounded-br cursor-nwse-resize group">
    <Icon name="bar-filter" class="stroke-gray-200 group-hover:stroke-gray-500  rotate-[-45deg]" />
  </div>
</div>
<!-- </div> -->
