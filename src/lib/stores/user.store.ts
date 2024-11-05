import { writable } from 'svelte/store';
import type { Role } from '../../constants';
import { storage } from './localStorage';

export interface UserEntity {
  id: number;
  email: string;
  password: string;
  name: string;
  role: Role;
  avatar: string;
}

// get user form localStorage
const storedUser = storage.getItem<string | null>('user_store');
const initialUser: UserEntity | null = storedUser ? JSON.parse(storedUser) : null;

export const userStore = writable<UserEntity | null>(initialUser);

userStore.subscribe((value) => {
  if (value) {
    storage.setItem('user_store', JSON.stringify(value));
  } else {
    storage.removeItem('user_store'); // clean if value is null
  }
});
