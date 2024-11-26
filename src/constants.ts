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

export enum SHIPPING_TYPES {
  FREE = 'FREE',
  REGULAR = 'REGULAR',
  EXPRESS = 'EXPRESS',
}

export type SHIPPING_ITEM = { method: string; label: string; lead_time: string; price: number };

export type SHIPPING_METHOD = {
  [key in SHIPPING_TYPES]: SHIPPING_ITEM;
};

export const SHIPPING_METHOD: SHIPPING_METHOD = {
  FREE: { method: SHIPPING_TYPES.FREE, label: 'Free', lead_time: '7-30 business days', price: 0 },
  REGULAR: { method: SHIPPING_TYPES.REGULAR, label: 'Regular', lead_time: '3-14 business days', price: 5.49 },
  EXPRESS: { method: SHIPPING_TYPES.EXPRESS, label: 'Express', lead_time: '1-3 business days', price: 18.2 },
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
