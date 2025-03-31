import { authCookieKey, ENV } from '@/library/constants';
import { getCookie } from 'cookies-next';

const usePaymentAPI = () => {
  const createPayment = async (
    creatorId: string,
    purchaseType: string,
    input: {
      contentId: string;
      amount: number;
      payment_method: string;
      payment_method_types: [string];
    }
  ) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(
      `${ENV('NEXT_PUBLIC_API_URL')}/create/payment?creatorId=${creatorId}&purchaseType=${purchaseType}`,
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

  const createSubscriptionPlan = async (input: { creatorId: string }) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${ENV('NEXT_PUBLIC_API_URL')}/subscriptions/plans/create`, {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  };

  const getSubscriptionPlans = async (creatorId: string) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${ENV('NEXT_PUBLIC_API_URL')}/subscription/plans/${creatorId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  };

  const editSubscriptionPlan = async (
    subscription_plan_id: string,
    input: Partial<{ price: number; description: string; tier: string; bannerURL: string }>
  ) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${ENV('NEXT_PUBLIC_API_URL')}/subscription/plan/edit/${subscription_plan_id}`, {
      method: 'PATCH',
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
  };

  const deleteSubscriptionPlan = async (subscription_plan_id: string) => {
    const accessToken = getCookie(authCookieKey);
    const res = await fetch(`${ENV('NEXT_PUBLIC_API_URL')}/subscription/plan/delete/${subscription_plan_id}`, {
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
    createPayment,
    getCard,
    attachPaymentMethod,
    confirmCard,
    createSubscriptionPlan,
    getSubscriptionPlans,
    editSubscriptionPlan,
    deleteSubscriptionPlan
  };
};
export default usePaymentAPI;
