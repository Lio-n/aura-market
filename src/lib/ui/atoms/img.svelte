<script>
  import { imageFallback } from '$lib/helper/imageFallback';
</script>

<img {...$$props} on:error={imageFallback} class="bg-gray-100 {$$props.class}" />
