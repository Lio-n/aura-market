import { writable } from 'svelte/store';

export const favoriteStore = writable<number[]>([]);
