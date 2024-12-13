<script lang="ts">
  import TextField from '../atoms/textField.svelte';
  export let inValid: { errors: { [k: string]: any } | null } = { errors: null };
  export let values:
    | {
        fullname: string;
        email: string;
        confirm_password: string;
        phone_number: string;
        street_name: string;
        city: string;
        region: string;
        postal_code: string;
      }
    | null
    | undefined = null;
</script>

<div class="space-y-4">
  <TextField
    name="fullname"
    label="Fullname"
    value={values?.fullname}
    placeholder="Enter your full name"
    isInvalid={inValid.errors?.fullname}
    required
  />

  <div class="grid grid-cols-2 gap-2">
    <TextField
      name="email"
      label="Email address"
      value={values?.email}
      placeholder="Enter your email"
      isInvalid={inValid.errors?.email}
      required
    />
    <TextField
      name="confirm_email"
      label="Confirmation email"
      value={values?.confirm_password}
      placeholder="Enter your confirmation email"
      isInvalid={inValid.errors?.confirm_email}
      required
    />
  </div>

  <TextField
    name="phone_number"
    label="Phone number"
    value={values?.phone_number}
    type="tel"
    placeholder="Enter your phone number"
    isInvalid={inValid.errors?.phone_number}
    required
  />

  <TextField
    name="street_name"
    value={values?.street_name}
    label="Street name and house number"
    placeholder="Enter your Street name and house number"
    isInvalid={inValid.errors?.street_name}
    required
  />

  <div class="grid grid-cols-2 gap-2">
    <TextField
      value={values?.city}
      name="city"
      label="City"
      placeholder="City"
      isInvalid={inValid.errors?.city}
      required
    />
    <TextField
      value={values?.region}
      name="region"
      label="Region"
      placeholder="Region"
      isInvalid={inValid.errors?.region}
      required
    />
  </div>

  <TextField
    name="postal_code"
    value={values?.postal_code}
    label="Postal code"
    placeholder="Enter your postal code"
    isInvalid={inValid.errors?.postal_code}
    required
  />

  <div class="flex justify-end mt-4">
    <slot />
  </div>
</div>
