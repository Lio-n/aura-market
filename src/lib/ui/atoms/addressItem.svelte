<script lang="ts">
  export let data: {
    street_name: string;
    phone_number: string;
    country: string;
    city: string;
    postal_code: string;
    region: string;
  };
</script>

<div>
  <p class="text-sm text-gray-600 font-semibold">{data.street_name}</p>
  <div class="flex gap-1 text-xs text-gray-500 flex-wrap">
    <p>{data.phone_number}</p>
    <span>-</span>
    <p>{data.country}</p>
    <span>-</span>
    <p>{data.city}</p>
    <span>-</span>
    <p>{data.postal_code}</p>
    <span>-</span>
    <p>{data.region}</p>
  </div>
</div>
