<script>
  import { userStore } from '$lib/stores/user.store';
  import TextField from '$lib/ui/atoms/textField.svelte';
</script>

<div class="">
  <h2 class="ml-4 mt-4 mb-8 font-semibold text-lg">My Profile</h2>
  <div class="pl-4 ml-4 space-y-6">
    <div>
      <span class="block mb-2 text-sm font-medium text-gray-600">Profile Picture</span>
      <img
        src={$userStore?.avatar}
        alt="Avatar"
        class="text-center bg-gray-100 text-xs leading-[48px] rounded-full size-24"
      />
    </div>

    <TextField name="email" label="Email" value={$userStore?.email} preview={true} />
    <TextField name="fullname" label="Name" value={$userStore?.name} preview={true} />
  </div>
</div>
