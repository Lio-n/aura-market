<script>
  const AcceptedPaymentContent = [
    '/payment/paypal.png',
    '/payment/visa.png',
    '/payment/mastercard.png',
    '/payment/shopify.png',
    '/payment/amazon.png',
    '/payment/skrill.png',
  ];

  const DepartmentContent = ['Clothes', 'Shoes', 'Miscellaneous', 'Electronics'];
  const AboutUsContent = ['Help', 'Press Center', 'Shop by location', 'Ideas & Guides', 'Affiliate & Partners'];
  const HelpContent = ['Returns', 'Track orders', 'Contact Us', 'Feedback', 'Security & Fraud'];
</script>

<footer class="border-t-[1px] mx-8 mb-12">
  <div class="mt-8 md:justify-around flex gap-4 flex-wrap max-w-screen-lg mx-auto">
    <div>
      <span class="flex items-center gap-2 text-xl font-semibold">
        <img src="/favicon.svg" alt="Logo icon" class="size-8" /> AuraMarket
      </span>

      <div class="mt-8">
        <span class="font-semibold text-md text-gray-700">Accepted Payments</span>
        <ul class="grid grid-rows-2 grid-cols-3 gap-4 w-fit mt-4">
          {#each AcceptedPaymentContent as item}
            <img src={item} class="h-8" alt="Payment logo" />
          {/each}
        </ul>
      </div>
    </div>

    <div class="flex flex-wrap gap-8">
      <div>
        <span class="font-semibold text-md text-gray-700">Department</span>
        <ul class="grid gap-2 mt-4">
          {#each DepartmentContent as item}
            <span class="text-sm text-gray-600 font-medium">{item}</span>
          {/each}
        </ul>
      </div>

      <div>
        <span class="font-semibold text-md text-gray-700">About Us</span>
        <ul class="grid gap-2 mt-4">
          {#each AboutUsContent as item}
            <span class="text-sm text-gray-600 font-medium">{item}</span>
          {/each}
        </ul>
      </div>

      <div>
        <span class="font-semibold text-md text-gray-700">Help</span>
        <ul class="grid gap-2 mt-4">
          {#each HelpContent as item}
            <span class="text-sm text-gray-600 font-medium">{item}</span>
          {/each}
        </ul>
      </div>
    </div>
  </div>

  <div class="border-t-[1px] flex flex-wrap mx-auto justify-center gap-4 mt-4 pt-8 text-xs text-gray-600 font-medium">
    <span>Terms of Use</span>
    <span>Privacy Policy</span>
    <span>Copyrights</span>
    <span>All Rights Reserved | 2025</span>
  </div>
</footer>
