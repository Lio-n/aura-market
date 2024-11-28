<script lang="ts">
  import TextField from '../atoms/textField.svelte';
  export let inValid: { errors: { [k: string]: any } | null } = { errors: null };
</script>

<div class="space-y-4">
  <TextField
    name="fullname"
    label="Fullname"
    placeholder="Enter your full name"
    isInvalid={inValid.errors?.fullname}
    required
  />

  <div class="grid grid-cols-2 gap-2">
    <TextField
      name="email"
      label="Email address"
      placeholder="Enter your email"
      isInvalid={inValid.errors?.email}
      required
    />
    <TextField
      name="confirm_email"
      label="Confirmation email"
      placeholder="Enter your confirmation email"
      isInvalid={inValid.errors?.confirm_email}
      required
    />
  </div>

  <TextField
    name="phone_number"
    label="Phone number"
    type="tel"
    placeholder="Enter your phone number"
    isInvalid={inValid.errors?.phone_number}
    required
  />

  <TextField
    name="street_name"
    label="Street name and house number"
    placeholder="Enter your Street name and house number"
    isInvalid={inValid.errors?.street_name}
    required
  />

  <div class="grid grid-cols-2 gap-2">
    <TextField name="city" label="City" placeholder="City" isInvalid={inValid.errors?.city} required />
    <TextField name="region" label="Region" placeholder="Region" isInvalid={inValid.errors?.region} required />
  </div>

  <TextField
    name="postal_code"
    label="Postal code"
    placeholder="Enter your postal code"
    isInvalid={inValid.errors?.postal_code}
    required
  />

  <div class="flex justify-end mt-4">
    <slot />
  </div>
</div>
