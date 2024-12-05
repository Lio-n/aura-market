<script lang="ts">
  let {
    size = 'medium',
    value = 0,
    min = 0,
    callback = () => {},
    ...props
  }: {
    size?: 'small' | 'medium';
    value?: number;
    min?: number;
    class?: string;
    callback?: (count: number) => void;
  } = $props();

  let count = $state(value);
  const custom_size = {
    small: { button: 'px-2 text-xs', count: 'px-3 py-2 text-xs' },
    medium: { button: 'px-4 text-sm', count: 'px-4 py-2 text-sm' },
  };

  const onRest = () => {
    if (count <= min) return;
    count--;
    callback(count);
  };
  const onPlus = () => {
    count++;
    callback(count);
  };
</script>

<div class="flex bg-gray-100 text-gray-900 rounded w-fit {props.class}">
  <!-- svelte-ignore event_directive_deprecated -->
  <button class="rounded-l hover:bg-gray-200 {custom_size[size].button}" on:click={onRest}>-</button>
  <span class={custom_size[size].count}>{count}</span>
  <!-- svelte-ignore event_directive_deprecated -->
  <button class="rounded-r hover:bg-gray-200 {custom_size[size].button}" on:click={onPlus}>+</button>
</div>
