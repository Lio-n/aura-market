import { redirect } from '@sveltejs/kit';

import { checkRole } from '$lib/rbacUtils';
import { ROLES } from '../../../constants';

/** @type {import('./$types').LayoutServerLoad} */
export function load({ locals }) {
  const user = locals.user;
  const isCustomer = user && checkRole(user, ROLES.CUSTOMER);

  if (!isCustomer) {
    redirect(307, '/unauthorized');
  }
}
