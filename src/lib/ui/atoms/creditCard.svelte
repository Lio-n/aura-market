<script lang="ts">
  import { type PaymentDetails } from '$lib/stores/payment.store';

  export let credit_card: PaymentDetails['credit_card'];
</script>

<div class="w-64 h-36 m-auto bg-red-100 rounded-md relative text-white shadow-lg">
  <img
    alt="credit card background"
    class="relative object-cover w-full h-full rounded-md"
    src="https://i.imgur.com/kGkSg1v.png"
  />

  <div class="w-full px-4 absolute top-4">
    <div class="flex justify-between">
      <div>
        <p class="font-light text-xs">Name</p>
        <p class="font-medium tracking-wide text-sm">{credit_card.holder_name}</p>
      </div>
      <img alt="mastercard icon" class="w-10 h-10" src="https://i.imgur.com/bbPHJVe.png" />
    </div>
    <div class="pt-1">
      <p class="font-light text-xs">Card Number</p>
      <p class="font-medium tracking-wide text-sm">**** **** **** {credit_card.last_4_digits}</p>
    </div>
    <div class="pt-3 pr-3">
      <div class="flex justify-between">
        <div>
          <p class="font-light text-xs">Expiry</p>
          <p class="font-medium tracking-wide text-xs">{credit_card.expiration_date}</p>
        </div>

        <div>
          <p class="font-light text-xs">CVV</p>
          <p class="font-bold tracking-wide text-xs">{credit_card.card_cvv}</p>
        </div>
      </div>
    </div>
  </div>
</div>
