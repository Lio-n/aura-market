import { json } from '@sveltejs/kit';

export const POST = async ({ cookies, locals }) => {
  cookies.delete('access_token', { path: '/' });

  return json({ success: true, message: 'Logout successful' });
};
