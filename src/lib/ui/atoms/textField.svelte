<script lang="ts">
  import { onMount } from 'svelte';
  import CurrencyInput from '@canutin/svelte-currency-input';

  export let label: string | null = null;
  export let preview: boolean = false;

  let textareaElement: HTMLTextAreaElement;

  // Función para ajustar la altura del textarea al contenido
  function adjustTextareaHeight() {
    if (textareaElement) {
      textareaElement.style.height = 'auto'; // Resetea la altura
      textareaElement.style.height = `${textareaElement.scrollHeight + 10}px`; // Ajusta al contenido
    }
  }

  onMount(() => adjustTextareaHeight());
</script>

<div>
  {#if label}
    <label for={$$props.name} class="block mb-2 text-sm font-medium text-gray-900">{label}</label>
  {/if}

  {#if $$props.type === 'textarea'}
    <textarea
      bind:this={textareaElement}
      on:input={adjustTextareaHeight}
      id={$$props.name}
      class="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 {$$props.class}"
      disabled={preview}
      class:bg-white={preview}
      class:border-none={preview}
      class:text-gray-500={preview}
      {...$$props}
    ></textarea>
  {:else if $$props.type === 'currency'}
    <div>
      <CurrencyInput
        id={$$props.name}
        inputClasses={{
          formatted: `text-xs rounded bg-gray-50 border border-gray-300 text-gray-900 text-xs focus:ring-gray-500 focus:border-gray-500 focus:outline-none block w-full p-2.5 ${preview ? 'bg-white border-none text-gray-500' : ''} ${$$props.class}`,
        }}
        isNegativeAllowed={false}
        disabled={preview}
        {...$$props}
      />
    </div>
  {:else}
    <input
      id={$$props.name}
      class="text-xs rounded bg-gray-50 border border-gray-300 text-gray-900 text-xs focus:ring-gray-500 focus:border-gray-500 focus:outline-none block w-full p-2.5 {$$props.class}"
      disabled={preview}
      class:bg-white={preview}
      class:border-none={preview}
      class:text-gray-500={preview}
      {...$$props}
    />
  {/if}
</div>

<style>
</style>
