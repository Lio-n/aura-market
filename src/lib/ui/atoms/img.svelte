<script>
  import { imageFallback } from '$lib/helper/imageFallback';
</script>

<img {...$$props} on:error={imageFallback} />
