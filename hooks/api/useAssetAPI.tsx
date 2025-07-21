import { authCookieKey } from '@/library/constants';
import { configService } from '@/util/config';
import { getCookie } from 'cookies-next';

const useAssetAPI = () => {
  const uploadAndCreateAsset = async (formData: FormData) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${configService.NEXT_PUBLIC_LOCAL_API_URL}/assets/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: formData
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };

  const getCreatorAssets = async () => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${configService.NEXT_PUBLIC_LOCAL_API_URL}/assets/creator`, {
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
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${configService.NEXT_PUBLIC_LOCAL_API_URL}/assets/fan`, {
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

  const deleteCreatorAssets = async (input: { assetIds: string[] }) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${configService.NEXT_PUBLIC_LOCAL_API_URL}/assets/delete`, {
      body: JSON.stringify(input),
      method: 'DELETE',
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
    getCreatorAssets,
    getFanAssets,
    uploadAndCreateAsset,
    deleteCreatorAssets
  };
};
export default useAssetAPI;
