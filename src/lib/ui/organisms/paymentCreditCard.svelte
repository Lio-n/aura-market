<script lang="ts">
  import TextField from '../atoms/textField.svelte';
  export let inValid: { errors: { [k: string]: any } | null } = { errors: null };
</script>

<div class="space-y-4">
  <TextField name="card_number" placeholder="Card number" required isInvalid={inValid.errors?.card_number} />
  <TextField name="card_name" placeholder="Name on card" required isInvalid={inValid.errors?.card_name} />

  <div class="grid grid-cols-2 gap-2">
    <TextField
      name="expiration_date"
      placeholder="Expiration date (MM/YY)"
      required
      isInvalid={inValid.errors?.expiration_date}
    />
    <TextField name="card_cvv" placeholder="CVV" required isInvalid={inValid.errors?.card_cvv} />
  </div>

  <div class="flex justify-end mt-4">
    <slot />
  </div>
</div>
