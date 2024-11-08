import { writable } from 'svelte/store';
import MainLayout from '$lib/ui/template/mainLayout.svelte';

export const layoutStore = writable(MainLayout);
