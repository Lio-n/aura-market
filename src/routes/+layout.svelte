<script>
  import { userStore } from '$lib/stores/user.store';
  import '../app.css';

  export let data;

  $: {
    userStore.set(data.user);
  }
</script>

<slot />
