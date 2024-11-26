import { browser } from '$app/environment';

type StorageValue = Record<string, any> | string | number | boolean | null;
export interface LocalStorage {
  setItem: (key: string, value: StorageValue) => void;
  getItem: <T extends StorageValue>(key: string) => T | null;
  removeItem: (key: string) => void;
  clear: () => void;
}

export const storage: LocalStorage = {
  setItem: (key: string, value: StorageValue): void => {
    browser && localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: <T extends StorageValue>(key: string): T | null => {
    let data = null;
    if (browser) data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : null;
  },
  removeItem: (key: string): void => {
    browser && localStorage.removeItem(key);
  },
  clear: (): void => {
    browser && localStorage.clear();
  },
};

export const ssr = false;
