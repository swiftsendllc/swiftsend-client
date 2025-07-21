export const configService = {
  get NEXT_PUBLIC_LOCAL_API_URL() {
    return process.env.NEXT_PUBLIC_LOCAL_API_URL!;
  },
  get NEXT_PUBLIC_DEV_API_URL() {
    return process.env.NEXT_PUBLIC_DEV_API_URL!;
  },
  get NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY() {
    return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
  }
};
