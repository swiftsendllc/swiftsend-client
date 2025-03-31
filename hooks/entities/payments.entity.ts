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

export interface SubscriptionPlansEntity {
  _id: string;
  price: number;
  description: string;
  bannerURL: string | null;
  createdAt: Date;
  deletedAt: Date | null;
  syncedAt: Date;
  tier: string;
  creatorId: string;
}

export interface SubscriptionsEntity {
  userId: string;
  creatorId: string;
  stripe_subscription_id: string;
  status: string;
  startedAt: Date;
  expiresAt: Date;
  price: number;
  subscription_plans_id: string;
}

export interface CardsEntity {
  id: string;
  card: {
    brand: string;
    checks: {
      address_line1_check: boolean | null;
      address_postal_code_check: string;
      cvc_check: string;
    };
    country: string;
    display_brand: string;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
    funding: string;
    generated_from: string | null;
    last4: string;
    networks: { available: [string]; preferred: boolean | null };
    regulated_status: string;
    three_d_secure_usage: { supported: true };
    wallet: boolean | null;
  };
  customer: {
    id: string;
    object: 'customer';
    address: string | null;
    balance: number;
    created: number;
    currency: string | null;
    default_source: string | null;
    delinquent: boolean;
    description: string | null;
    discount: string | null;
    email: string;
    invoice_prefix: string;
    invoice_settings: {
      custom_fields: null;
      default_payment_method: string;
      footer: string | null;
      rendering_options: null;
    };
    livemode: boolean;
    metadata: {
      userId: string;
    };
    name: string;
    next_invoice_sequence: number;
    phone: string | null;
    preferred_locales: string[];
    shipping: string | null;
    tax_exempt: string;
    test_clock: string | null;
  };
}
