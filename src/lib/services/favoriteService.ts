import { PUBLIC_STORAGE_KEY_FAVORITE } from '$env/static/public';
import type { FavoriteStore } from '$lib/stores/favorites.store';
import { storage, type LocalStorage } from '$lib/stores/localStorage';
import type { ProductEntity } from '$lib/stores/product.store';
import { type Writable } from 'svelte/store';

export class FavoriteService {
  private store: Writable<FavoriteStore>;
  private localStorage: LocalStorage = storage;
  private STORAGE_KEY: string = PUBLIC_STORAGE_KEY_FAVORITE;

  constructor(store: Writable<FavoriteStore>) {
    this.store = store;
  }

  addItem(item: ProductEntity): void {
    this.store.update((favorite) => {
      favorite.items = [...favorite.items, item];
      favorite.total++;

      return favorite;
    });
  }

  removeItem(id: number) {
    this.store.update((favorite) => {
      favorite.items = [...favorite.items.filter((i) => i.id !== id)];
      favorite.total--;
      return favorite;
    });
  }

  reset() {
    this.store.set({
      items: [],
      total: 0,
    });

    this.localStorage.removeItem(this.STORAGE_KEY);
  }

  subscribe(callback: (favorite: FavoriteStore) => void) {
    return this.store.subscribe(callback);
  }
}
