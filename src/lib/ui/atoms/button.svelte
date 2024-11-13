<script lang="ts">
  import type { Icons } from './icon.svelte';
  import Icon from './icon.svelte';

  export let variant: 'outline' | 'solid' | 'ghost' = 'solid';
  export let size: 'small' | 'medium' = 'small';
  export let icon: Icons | null = null;
  export let text = '';

  const custom_variants = {
    outline: 'bg-white text-gray-950 hover:text-white hover:bg-gray-950 group',
    ghost: 'bg-white text-gray-950 group border-transparent',
    solid: 'bg-gray-950 text-white hover:bg-white hover:text-gray-950 group',
  };

  const custom_size = {
    medium: 'py-2 px-4 sm:py-4 sm:px-6 text-xs sm:text-md',
    small: 'h-fit py-2 text-xs',
  };

  const custom_variants_icon = {
    outline: 'stroke-[1.5] fill-none stroke-gray-950 group-hover:stroke-white',
    ghost: 'stroke-[1.5] fill-none stroke-gray-950',
    solid: 'stroke-[1.5] fill-none stroke-white group-hover:stroke-gray-950',
  };
</script>

<button
  on:click
  class="flex gap-2 justify-center items-center transition-colors rounded-md w-full font-semibold border-2 border-gray-950 {custom_variants[
    variant
  ]} {custom_size[size]} {$$props.class}"
>
  {#if icon}
    <Icon name={icon} class="transition-colors size-4 {custom_variants_icon[variant]}" />
  {/if}
  {text}
</button>
