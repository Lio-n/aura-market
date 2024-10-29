import type { UserEntity } from './stores';

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
    interface Locals {
      user: UserEntity | null;
    }
  }
}

export {};
