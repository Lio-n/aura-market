<script lang="ts">
  import type { Icons } from './icon.svelte';
  import Icon from './icon.svelte';

  type Button = {
    variant?: 'outline' | 'solid' | 'ghost';
    size?: 'small' | 'medium';
    icon?: Icons | null;
    text: string;
    disabled?: boolean;
    loading?: boolean;
    class?: string;
    type?: 'reset' | 'submit' | 'button' | null | undefined;
    form?: string;
  };

  let {
    variant = 'solid',
    size = 'small',
    icon = null,
    text = '',
    disabled = false,
    loading = false,
    ...props
  }: Button = $props();

  const custom_variants = {
    outline: 'bg-white text-gray-950 enabled:hover:text-white enabled:hover:bg-gray-950 group',
    ghost: `bg-white text-gray-950 group border-transparent`,
    solid: 'bg-gray-950 text-white enabled:hover:bg-white enabled:hover:text-gray-950 group',
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

<!-- svelte-ignore event_directive_deprecated -->
<button
  on:click
  {...props}
  {disabled}
  class:opacity-90={disabled || loading}
  class:cursor-not-allowed={disabled}
  class:pointer-events-none={loading}
  class="flex gap-2 justify-center items-center transition-colors rounded-md w-full font-semibold border-2 border-gray-950 {custom_variants[
    variant
  ]} {custom_size[size]} {props.class}"
>
  {#if icon && !loading}
    <Icon name={icon} class="transition-colors size-4 {custom_variants_icon[variant]}" />
  {/if}

  {#if !loading}
    {text}
  {/if}

  {#if loading}
    <svg
      aria-hidden="true"
      class="inline size-4 text-gray-200 animate-spin fill-gray-500"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      ></path>
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      ></path>
    </svg>
  {/if}
</button>
