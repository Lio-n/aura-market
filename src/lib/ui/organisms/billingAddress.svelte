<script lang="ts">
  import TextField from '../atoms/textField.svelte';
  import countriesJson from '$lib/data/json/countries.json';
  import type { Countries } from '../../../routes/(protected)/checkout/+page.server';
  import SelectField from '../atoms/selectField.svelte';

  let countries: Array<{ value: string; name: string }> = countriesJson.map((i: Countries) => ({
    value: i.countryCode,
    name: i.flag + ' ' + i.country,
  }));
</script>

<div class="space-y-4">
  <span>
    {#if countries}
      <label for="countries_select" class="block mb-2 text-sm font-medium text-gray-600">Select Shipping Country</label>
      <SelectField id="countries_select" options={countries} name="country" placeholder="Select country" />
    {/if}
  </span>

  <TextField name="phone_numnber" label="Phone number" type="tel" placeholder="Enter your phone number" />

  <TextField
    name="street_name"
    label="Street name and house number"
    placeholder="Enter your Street name and house number"
  />

  <div class="grid grid-cols-2 gap-2">
    <TextField name="city" label="City" placeholder="City" />
    <TextField name="region" label="Region" placeholder="Region" />
  </div>

  <TextField name="postal_code" label="Postal code" placeholder="Enter your postal code" />

  <div class="flex justify-end mt-4">
    <slot />
  </div>
</div>
