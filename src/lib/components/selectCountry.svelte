<script lang="ts">
  import countriesJson from '$lib/data/json/countries.json';
  import type { Countries } from '$lib/stores/shippingAddress.store';
  import SelectField from '$lib/ui/atoms/selectField.svelte';

  let countries: Array<{ value: string; name: string }> = countriesJson.map((i: Countries) => ({
    value: i.countryCode,
    name: i.flag + ' ' + i.country,
  }));

  export let selected = countries[0].value;
  export let name = 'country';
</script>

<div {...$$props}>
  {#if countries}
    <label for="countries_select" class="block mb-2 text-sm font-medium text-gray-600">Select Shipping Country</label>
    <SelectField id="countries_select" options={countries} {selected} {name} />
  {/if}
</div>
