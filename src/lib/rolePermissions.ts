import { PERMISSIONS, ROLES, type Permission, type Role } from '../constants';

type RolePermissions = Record<Role, Permission[]>;

export const rolePermissions = {
  [ROLES.ADMIN]: [PERMISSIONS.CREATE_PRODUCTS, PERMISSIONS.UPDATE_PRODUCTS, PERMISSIONS.DELETE_PRODUCTS],
  [ROLES.CUSTOMER]: [PERMISSIONS.READ_PROFILE, PERMISSIONS.UPDATE_PROFILE],
} as unknown as RolePermissions;
