<script>
  import { enhance } from '$app/forms';
  import Loading from '$lib/components/loading.svelte';

  let loading = false;
  let email = '';
  let password = '';
</script>

{#if loading}
  <Loading />
{:else}
  <div class="w-full mx-auto my-20 max-w-md rounded-lg bg-white p-8 shadow-sm">
    <div class="space-y-6">
      <div class="flex flex-col items-center space-y-2">
        <a class="text-2xl font-bold" href="/" rel="ugc"> AuraMarket </a>
        <p class="text-gray-500">Welcome back! Please sign in to your account.</p>
      </div>

      <form class="space-y-5" use:enhance method="POST" action="?/login">
        <div>
          <label class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium" for="email">
            Email
          </label>
          <input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="email"
            name="email"
            type="email"
            placeholder="Admin: admin@mail.com, Customer: john@mail.com"
            bind:value={email}
            required
          />
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium" for="password">
              Password
            </label>
          </div>
          <input
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            type="password"
            id="password"
            name="password"
            placeholder="Admin: admin123, Customer: changeme"
            bind:value={password}
          />
        </div>
        <button
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[hsl(243_5.9%_10%)] text-white hover:bg-[hsl(243_5.9%_10%)]/90 h-10 px-4 py-2 w-full"
          type="submit"
        >
          Sign in
        </button>
      </form>
    </div>
  </div>
{/if}
