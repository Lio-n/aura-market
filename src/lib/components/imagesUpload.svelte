<script lang="ts">
  import Button from '$lib/ui/atoms/button.svelte';
  import Icon from '$lib/ui/atoms/icon.svelte';
  import TextField from '$lib/ui/atoms/textField.svelte';
  import { type SvelteComponent } from 'svelte';

  let { uploadedImages = $bindable(), defaultImages = [], onReset = () => {} } = $props();

  let currImageUrl = $state('');
  // svelte-ignore non_reactive_update
  let refInputImage: SvelteComponent & { $$bindings: 'value' | 'ref' };
  let listImages: Array<string> = $state(defaultImages);

  const handleAddImages = () => {
    listImages = [...listImages, currImageUrl];
    refInputImage.value = '';
    uploadedImages = listImages;
  };

  const handleRemoveImage = (item: string) => {
    let updatedList = listImages.filter((e) => e !== item);
    listImages = updatedList;
    uploadedImages = listImages;
  };
</script>

<div class="grid items-end gap-2 mb-4 pb-4 {listImages.length ? 'border-b-[1px]' : ''}">
  <TextField
    name="image"
    label="URL"
    placeholder="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    bind:value={currImageUrl}
    bind:ref={refInputImage}
    class="w-full"
    required={!listImages.length}
  />

  <div class="flex justify-end">
    <Button
      text="Add image"
      type="button"
      on:click={handleAddImages}
      class="!w-fit !p-2 text-nowrap"
      disabled={listImages.length === 3}
    />
  </div>
</div>

<div class="space-y-2">
  {#each listImages as item, i}
    <div class="flex justify-between items-center p-2 rounded w-full bg-gray-100">
      <img src={item} alt="" class="size-10 rounded object-cover" />

      <Icon
        name="x-mark"
        class="size-6 stroke-1 stroke-gray-900 hover:stroke-gray-950 cursor-pointer"
        on:click={() => handleRemoveImage(item)}
      ></Icon>
    </div>
  {/each}
</div>
