<script lang="ts">
  import { draggable } from '@neodrag/svelte';
  import { onDestroy, onMount } from 'svelte';
  import { resize } from '$lib/helper/resize';
  import Icon from '$lib/ui/atoms/icon.svelte';

  let {
    onClose,
    resize_container,
    resize_handler,
  }: { onClose: () => void; resize_handler: string; resize_container: string } = $props();

  let handle_draggable = 'handle-draggable';
  let isFullScreen = $state(false);
  let currentRef: HTMLElement;

  const toggleFullScreen = () => {
    isFullScreen = !isFullScreen;
  };

  const bringToFront = () => {
    if (!currentRef) return;

    let elems = document.querySelectorAll('.toFront');
    elems.forEach((item) => item.classList.remove('toFront'));

    currentRef.classList.add('toFront');
  };

  onMount(() => {
    resize(resize_container, resize_handler);
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore event_directive_deprecated -->
<div
  class={isFullScreen ? 'absolute w-screen h-screen p-4 bg-gray-200 left-0' : ''}
  on:click={bringToFront}
  bind:this={currentRef}
>
  <div
    id={resize_container}
    use:draggable={{
      handle: `.${handle_draggable}`,
      bounds: isFullScreen ? undefined : { top: 20, left: 50, bottom: 20, right: 20 },
    }}
    class="no-scrollbar overflow-auto absolute z-20 shadow-lg bg-white rounded
    {isFullScreen
      ? '!h-[calc(100%_-_2rem)] !w-[calc(100%_-_2rem)]'
      : 'top-10 left-32 max-h-[80vh] min-h-[20rem] w-[40rem] min-w-[40rem]'}"
    style={isFullScreen ? 'transform: translate3d(0, 0, 0px)' : ''}
  >
    <!-- svelte-ignore slot_element_deprecated -->
    <div>
      <div
        class="bg-gray-950 w-full flex {isFullScreen ? 'justify-end' : 'justify-between'} rounded-t sticky top-0 z-[2]"
      >
        {#if !isFullScreen}
          <Icon
            name="dots-6"
            class="{handle_draggable} stroke-2 p-2 size-8 stroke-gray-200 hover:stroke-gray-100 cursor-grab"
          />
        {/if}

        <div class="flex">
          <!-- svelte-ignore event_directive_deprecated -->
          <button on:click={toggleFullScreen}>
            {#if !isFullScreen}
              <Icon name="arrows-pointing-out" class="stroke-2 p-2 size-8 stroke-gray-200 hover:stroke-gray-100" />
            {:else}
              <Icon name="arrows-pointing-in" class="stroke-2 p-2 size-8 stroke-gray-200 hover:stroke-gray-100" />
            {/if}
          </button>

          <!-- svelte-ignore event_directive_deprecated -->
          <button on:click={onClose}>
            <Icon
              name="x-mark"
              class="stroke-2 rounded-tr stroke-2 p-2 size-8 bg-gray-800 stroke-gray-500 hover:bg-gray-200 hover:stroke-gray-800 cursor-pointer"
            /></button
          >
        </div>
      </div>

      <slot />
    </div>

    <div class="{isFullScreen ? 'hidden' : ''} sticky bottom-0 flex justify-end">
      <div id={resize_handler} class="p-2 rounded-br cursor-nwse-resize group">
        <Icon name="bar-filter" class="stroke-gray-200 group-hover:stroke-gray-500 rotate-[-45deg]" />
      </div>
    </div>
  </div>
</div>
