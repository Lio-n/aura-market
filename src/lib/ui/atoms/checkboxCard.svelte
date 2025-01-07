<script>
  let { group = $bindable(), id, name, value, checked = false } = $props();
</script>

<div>
  <input {id} {name} {value} {checked} bind:group class="hidden peer" type="radio" />
  <!-- svelte-ignore slot_element_deprecated -->
  <label
    for={id}
    class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50"
  >
    <slot />
  </label>
</div>
