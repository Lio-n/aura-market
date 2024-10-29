export const ROLES = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
} as const;

export const PERMISSIONS = {
  CREATE_PRODUCTS: 'create:products',
  UPDATE_PRODUCTS: 'update:products',
  DELETE_PRODUCTS: 'delete:products',
  READ_PROFILE: 'read:profile',
  UPDATE_PROFILE: 'update:profile',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
