import { writable } from 'svelte/store';
import PublicLayout from '$lib/ui/template/publicLayout.svelte';

export const layoutStore = writable(PublicLayout);
