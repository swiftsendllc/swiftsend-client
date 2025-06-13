'use server';

import { ENV } from '@/library/constants';
export const loginAction = async (email: string, password: string) => {
  const res = await fetch(`${ENV('NEXT_PUBLIC_API_URL')}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  if (!res.ok) return { error: data.message, data: null };

  return { data, error: null };
};
