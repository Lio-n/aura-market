<script>
  import { layoutStore } from '$lib/stores/layout.store';
  import DashboardLayout from '$lib/ui/template/dashboardLayout.svelte';

  $layoutStore = DashboardLayout;
</script>

<slot />
