import { PUBLIC_PLATZI_FAKE_STORE_API_V1 } from '$env/static/public';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    const formData = await request.formData();

    const formDataObject = Object.fromEntries(formData.entries());

    const res = await fetch(PUBLIC_PLATZI_FAKE_STORE_API_V1 + 'auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: formDataObject.email, password: formDataObject.password }),
    });

    const data = await res.json(); // access_toke - refresh_token

    cookies.set('access_token', data.access_token, { httpOnly: true, sameSite: 'strict', path: '/' });

    throw redirect(307, '/');
  },
};
