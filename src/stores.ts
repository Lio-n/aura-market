import { writable } from 'svelte/store';

export const cartStore = writable<number[]>([]);
