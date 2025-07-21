'use server';

import { LoginInput, SignupInput } from '@/hooks/dto/auth/auth.dto';
import { authCookieKey } from '@/library/constants';
import { configService } from '@/util/config';
import { formatUrl } from '@/util/format-url';
import { getCookie } from 'cookies-next';

async function makeRequest(url: string | URL, init: RequestInit) {
  const res = await fetch(url, init);
  const data = await res.json();

  if (!res.ok) {
    return {
      error: {
        message: data.message,
        path: url,
        variables: init.body
      }
    };
  }
  return data;
}

export const loginRequest = async (input: LoginInput) => {
  const url = formatUrl({
    host: configService.NEXT_PUBLIC_LOCAL_API_URL,
    path: '/auth/login'
  });
  return await makeRequest(url, {
    method: 'POST',
    body: JSON.stringify(input),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const signupRequest = async (input: SignupInput) => {
  const url = formatUrl({
    host: configService.NEXT_PUBLIC_LOCAL_API_URL,
    path: '/auth/signup'
  });
  return await makeRequest(url, {
    method: 'POST',
    body: JSON.stringify(input),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const uploadFileRequest = async (formData: FormData) => {
  const accessToken = getCookie(authCookieKey);
  const url = formatUrl({
    host: configService.NEXT_PUBLIC_LOCAL_API_URL,
    path: '/users/upload'
  });
  return await makeRequest(url, {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};
