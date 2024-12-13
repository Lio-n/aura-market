import { writable } from 'svelte/store';
import type { Role } from '../../constants';

export interface UserEntity {
  id: number;
  email: string;
  password: string;
  name: string;
  role: Role;
  avatar: string;
}

export const userStore = writable<UserEntity | null>(null);
