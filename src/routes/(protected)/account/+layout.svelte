<script>
  import { page } from '$app/stores';
  import NavegationCustomer from '$lib/components/navegationCustomer.svelte';
  import { userStore } from '$lib/stores/user.store';
  import Icon from '$lib/ui/atoms/icon.svelte';

  $: currPage = $page.url.pathname;
  let stylesByActualPage = 'text-gray-900 bg-gray-100 !border-blue-500';
</script>

<div class="flex my-8">
  <NavegationCustomer />

  <slot />
</div>

<div class="py-4"></div>
