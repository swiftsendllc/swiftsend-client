export const authCookieKey = '_accessToken';

export const authenticatedPaths = [
  '/home',
  '/search',
  '/channels',
  '/reels',
  '/groups'
];

export const env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
};
type EnvKeys = keyof typeof env;
export const ENV = (key: EnvKeys) => env[key];

export const authenticatedPathsRegex = [
  /^\/home/,
  /^\/search/,
  /^\/posts/,
  /^\/reels/,
  /^\/account/
];
export const authenticatedPathRegex = new RegExp(
  authenticatedPathsRegex.map((r) => r.source).join('|')
);
