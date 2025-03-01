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

  const createCard = async (input: {
    name: string;
    city: string;
    country: string;
    postal_code: string;
    state: string;
    card_number: string;
    cvc: string;
    expiry_date: string;
    email: string;
    line1: string;
  }) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${ENV('NEXT_PUBLIC_API_URL')}/card/create`, {
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

  const attachPaymentMethod = async (input: {
    paymentMethodId: string;
    customerId: string;
  }) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${ENV('NEXT_PUBLIC_API_URL')}/payments/attach-card`,
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

  const confirmCard = async (input: {
    paymentMethodId: string;
    customerId: string;
  }) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${ENV('NEXT_PUBLIC_API_URL')}/payments/confirm-card`,
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
    createPayment,
    createCard,
    getCard,
    attachPaymentMethod,
    confirmCard
  };
};
export default usePaymentAPI;
