import { UserProfilesEntity } from './users.entities';

export interface PaymentsEntity {
  userId: string;
  creatorId: string;
  contentId: string;
  stripe_payment_id: string;
  amount: number;
  status: string;
  currency: string | 'usd';
  createdAt: Date;
}

export interface PurchasesEntity {
  userId: string;
  contentId: string;
  purchasedAt: Date;
}

export interface SubscriptionsEntity {
  userId: string;
  creatorId: string;
  stripe_subscription_id: string;
  status: string;
  startedAt: Date;
  expiresAt: Date;
}

export interface CardsEntity {
  card_holder_id: string;
  name: string;
  city: string;
  country: string;
  postal_code: string;
  state: string;
  card_number: string;
  cvc: string;
  expiry_date: string;
  cardHolder: UserProfilesEntity;
  email: string;
  line1: string;
}
