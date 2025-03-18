import { authCookieKey, ENV } from '@/library/constants';
import { getCookie } from 'cookies-next';

const usePaymentAPI = () => {
  const createPayment = async (
    creatorId: string,
    input: {
      contentId: string;
      amount: number;
      payment_method: string;
      payment_method_types: [string];
    }
  ) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${ENV('NEXT_PUBLIC_API_URL')}/create/payment?creatorId=${creatorId}`, {
      method: 'POST',
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

  const getCard = async () => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${ENV('NEXT_PUBLIC_API_URL')}/customer/card`, {
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

  const attachPaymentMethod = async (input: { paymentMethodId: string }) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${ENV('NEXT_PUBLIC_API_URL')}/payments/attach-card`, {
      method: 'POST',
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

  const confirmCard = async (input: { paymentMethodId: string }) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${ENV('NEXT_PUBLIC_API_URL')}/payments/confirm-card`, {
      method: 'POST',
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

  const createSubscription = async (input: { creatorId: string }) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${ENV('NEXT_PUBLIC_API_URL')}/payments/subscriptions/create`, {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  };

  const customerPortal = async () => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${ENV('NEXT_PUBLIC_API_URL')}//payments/subscriptions/customer/portal`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  };

  return {
    createPayment,
    getCard,
    attachPaymentMethod,
    confirmCard,
    createSubscription,
    customerPortal
  };
};
export default usePaymentAPI;
