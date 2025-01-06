import { PUBLIC_PLATZI_FAKE_STORE_API_V1 } from '$env/static/public';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.user = null;

  const accessToken = event.cookies.get('access_token');

  const fetchUserData = async () => {
    const userData = await fetch(PUBLIC_PLATZI_FAKE_STORE_API_V1 + 'auth/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(async (res) => await res.json());

    return userData;
  };

  switch (true) {
    case event.url.pathname.startsWith('/login'):
      if (accessToken) {
        throw redirect(303, '/');
      }
      break;
    case event.route.id?.startsWith('/(protected)'):
      if (!accessToken) {
        throw redirect(307, '/login');
      } else {
        try {
          event.locals.user = await fetchUserData();
        } catch (error) {
          throw redirect(307, '/login');
        }
      }
      break;
    default:
      if (accessToken) {
        try {
          event.locals.user = await fetchUserData();
        } catch (error) {
          console.error(error);
        }
      }
      break;
  }

  const response = await resolve(event);
  return response;
};
