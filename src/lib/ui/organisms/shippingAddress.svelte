<script>
  import TextField from '../atoms/textField.svelte';
</script>

<div class="space-y-4">
  <TextField name="fullname" label="Fullname" placeholder="Enter your full name" />

  <div class="grid grid-cols-2 gap-2">
    <TextField name="email" label="Email address" placeholder="Enter your email" />
    <TextField name="confirm_email" label="Confirmation email" placeholder="Enter your confirmation email" />
  </div>

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
