<script>
  import DashboardHeader from '$lib/components/dashboardHeader.svelte';
  import DashboarSideBar from '$lib/components/dashboardSideBar.svelte';
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<main class="grid grid-cols-[auto,_1fr]">
  <DashboarSideBar />

  <div class="">
    <div>
      <!-- <DashboardHeader /> -->
      <!-- // Change name header to another. -->
    </div>

    <div class="px-4 md:px-8">
      <slot />
    </div>
  </div>
</main>
