import { writable } from 'svelte/store';
import type { ProductEntity } from './product.store';
import { FavoriteService } from '$lib/services/favoriteService';
import { storage } from './localStorage';
import { PUBLIC_STORAGE_KEY_FAVORITE } from '$env/static/public';

export interface FavoriteStore {
  items: Array<ProductEntity>;
  total: number;
}

const createFavorite = () => {
  const storedFavorite = storage.getItem<string | null>(PUBLIC_STORAGE_KEY_FAVORITE);
  const initialFavorite: FavoriteStore = storedFavorite
    ? JSON.parse(storedFavorite)
    : {
        items: [],
        total: 0,
      };

  const store = writable<FavoriteStore>(initialFavorite);

  const favoriteService = new FavoriteService(store);

  favoriteService.subscribe((favorite) => {
    storage.setItem(PUBLIC_STORAGE_KEY_FAVORITE, JSON.stringify(favorite));
  });

  return favoriteService;
};

const favoriteStore = createFavorite();
export { favoriteStore };
