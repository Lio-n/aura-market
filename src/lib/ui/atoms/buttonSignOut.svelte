<script lang="ts">
  import { goto } from '$app/navigation';
  import { userStore } from '$lib/stores/user.store';
  import Icon from './icon.svelte';

  const signOut = () => {
    document.cookie = 'access_token=;';
    $userStore = null;
    goto('/');
  };
</script>

<button
  on:click={signOut}
  class="w-full font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md p-2 {$$props.class}"
  ><Icon name="sign-out" class="transition-colors fill-none stroke-gray-900 stroke-2 hover:stroke-gray-950" />Sign Out</button
>
