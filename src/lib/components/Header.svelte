<script>
  import Dropdown from './dropdown.svelte';
  import SearchProduct from './searchProduct.svelte';
  import SideBarManu from './sideBarMenu.svelte';

  const dropdownContent = [
    { to: '/product/category/clothes', name: 'Clothes' },
    { to: '/product/category/shoes', name: 'Shoes' },
    { to: '/product/category/miscellaneous', name: 'Miscellaneous' },
    { to: '/product/category/electronics', name: 'Electronics' },
  ];
</script>

<header
  class="relative z-10 flex gap-2 md:gap-4 place-items-center py-2 px-4 md:py-4 md:px-6 sticky top-0 bg-white justify-between w-full"
>
  <div class="md:hidden">
    <SideBarManu />
  </div>

  <img src="/favicon.svg" alt="favicon icon" class="hidden md:block size-8" />

  <nav class="hidden md:flex space-x-4 gap-2">
    <Dropdown name="Categories" content={dropdownContent} />
    <a href="/#deals" class="font-medium text-xs text-gray-700 hover:text-gray-900">Deals</a>
  </nav>

  <SearchProduct />

  <ul class="hidden md:flex space-x-4 gap-4">
    <a class="font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900" href="/account"
      ><img src="/icons/user.svg" class={`w-4`} alt="user icon" />Account</a
    >
    <a class="font-medium text-xs flex items-center gap-1 text-gray-700 hover:text-gray-900" href="/cart"
      ><img src="/icons/shopping-cart.svg" class={`w-4 stroke-blue-400`} alt="user icon" />Cart</a
    >
  </ul>
</header>
