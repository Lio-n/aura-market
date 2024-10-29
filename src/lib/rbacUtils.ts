import type { Permission, Role } from '../constants';
import type { UserEntity } from '../stores';
import { rolePermissions } from './rolePermissions';

export function checkRole(user: UserEntity, requiredRole: Role) {
  if (!user) {
    return false;
  }

  return user.role === requiredRole;
}

export function checkPermissions(user: UserEntity, requiredPermissions: Permission) {
  if (!user) {
    return false;
  }

  const userPermissions = rolePermissions[user.role];
  return userPermissions?.includes(requiredPermissions);
}

export function checkRoleAndPermissions(user: UserEntity, requiredRole: Role, requiredPermissions: Permission) {
  return checkRole(user, requiredRole) && checkPermissions(user, requiredPermissions);
}
