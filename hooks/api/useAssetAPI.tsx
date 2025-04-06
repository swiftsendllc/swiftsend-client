import { authCookieKey, ENV } from '@/library/constants';
import { getCookie } from 'cookies-next';

const useAssetAPI = () => {
  const createAsset = async (input: { originalURL: string; blurredURL: string; type: string }) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${ENV('NEXT_PUBLIC_API_URL')}/assets/create`, {
      method: 'GET',
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const getCreatorAssets = async () => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${ENV('NEXT_PUBLIC_API_URL')}/assets/creator`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const getFanAssets = async () => {
    const accessToken = await getCookie(authCookieKey);
    const res = await fetch(`${ENV('NEXT_PUBLIC_API_URL')}/assets/fan`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };
  return {
    createAsset,
    getCreatorAssets,
    getFanAssets
  };
};
export default useAssetAPI;
