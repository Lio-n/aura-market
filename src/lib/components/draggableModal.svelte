<script lang="ts">
  import { draggable } from '@neodrag/svelte';
  import { onMount } from 'svelte';
  import { resize } from '$lib/helper/resize';
  import Icon from '$lib/ui/atoms/icon.svelte';

  let {
    onClose,
    resize_container,
    resize_handler,
  }: { onClose: () => void; resize_handler: string; resize_container: string } = $props();

  let handle_draggable = 'handle-draggable';

  onMount(() => {
    resize(resize_container, resize_handler);
  });
</script>

<div
  id={resize_container}
  use:draggable={{
    handle: `.${handle_draggable}`,
    bounds: { top: 20, left: 50, bottom: 20, right: 20 },
  }}
  class="no-scrollbar max-h-[80vh] overflow-auto absolute top-10 left-32 z-20 min-h-[20rem] w-[40rem] min-w-[40rem] shadow-lg bg-white rounded"
>
  <div>
    <div class="bg-gray-950 w-full flex justify-between rounded-t sticky top-0">
      <Icon
        name="dots-6"
        class="{handle_draggable} stroke-2 p-2 size-8 stroke-gray-200 hover:stroke-gray-100 cursor-grab"
      />

      <!-- svelte-ignore event_directive_deprecated -->
      <button on:click={onClose}>
        <Icon
          name="x-mark"
          class="stroke-2 rounded-tr stroke-2 p-2 size-8 bg-gray-800 stroke-gray-500 hover:bg-gray-200 hover:stroke-gray-800 cursor-pointer"
        /></button
      >
    </div>

    <slot />
  </div>

  <div class="sticky bottom-0 flex justify-end">
    <div id={resize_handler} class="p-2 rounded-br cursor-nwse-resize group">
      <Icon name="bar-filter" class="stroke-gray-200 group-hover:stroke-gray-500 rotate-[-45deg]" />
    </div>
  </div>
</div>
