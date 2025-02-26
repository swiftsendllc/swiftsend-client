import { authCookieKey, ENV } from '@/library/constants';
import { getCookie } from 'cookies-next';

const usePaymentAPI = () => {
  const createPayment = async (
    creatorId: string,
    input: {
      contentId: string;
      amount: number;
      payment_method_type:[string]
    }
  ) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${ENV('NEXT_PUBLIC_API_URL')}/create/payment?creatorId=${creatorId}`,
      {
        method: 'POST',
        body: JSON.stringify(input),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  };
  return {
    createPayment
  };
};
export default usePaymentAPI;
