<script>
  import TextField from '../atoms/textField.svelte';
</script>

<div class="space-y-4">
  <TextField name="card_number" placeholder="Card number" />
  <TextField name="card_name" placeholder="Name on card" />

  <div class="grid grid-cols-2 gap-2">
    <TextField name="expiration_date" placeholder="Expiration date (MM/YY)" />
    <TextField name="card_cvv" placeholder="CVV" />
  </div>

  <div class="flex justify-end mt-4">
    <slot />
  </div>
</div>
