<script lang="ts">
  import { onMount } from 'svelte';
  import CurrencyInput from '@canutin/svelte-currency-input';

  let { label = null, preview = false, value = $bindable(), ref = $bindable(), ...props } = $props();

  let textareaElement: HTMLTextAreaElement;

  function adjustTextareaHeight() {
    if (textareaElement) {
      textareaElement.style.height = 'auto'; // Resetea la altura
      textareaElement.style.height = `${textareaElement.scrollHeight + 10}px`; // Ajusta al contenido
    }
  }

  onMount(() => {
    adjustTextareaHeight();
  });
</script>

<div>
  {#if label}
    <label for={props.name} class="block mb-2 text-sm font-medium text-gray-600">{label}</label>
  {/if}

  {#if props.type === 'textarea'}
    <textarea
      bind:this={textareaElement}
      on:input={adjustTextareaHeight}
      id={props.name}
      {value}
      class="resize-none block p-2.5 w-full text-sm text-gray-600 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 {props.class}"
      disabled={props.disabled || preview}
      class:bg-white={preview}
      class:border-none={preview}
      class:text-gray-500={preview}
      {...props}
    ></textarea>
  {:else if props.type === 'currency'}
    <div>
      <CurrencyInput
        id={props.name}
        bind:value
        name={props.name}
        inputClasses={{
          formatted: `text-xs rounded bg-gray-50 border border-gray-300 text-gray-600 text-xs focus:ring-gray-500 focus:border-gray-500 focus:outline-none block w-full p-2.5 ${preview ? 'bg-white border-none text-gray-500' : ''} ${props.class}`,
        }}
        isNegativeAllowed={false}
        disabled={props.disabled || preview}
        {...props}
      />
    </div>
  {:else}
    <input
      disabled={props.disabled || preview}
      bind:value
      bind:this={ref}
      id={props.name}
      class="text-xs rounded bg-gray-50 border border-gray-300 text-gray-600 text-xs focus:ring-gray-500 focus:border-gray-500 focus:outline-none block w-full p-2.5 {props.class}"
      class:bg-white={preview}
      class:border-none={preview}
      class:text-gray-500={preview}
      {...props}
    />
  {/if}
</div>

<style>
</style>
