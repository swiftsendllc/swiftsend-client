export const authCookieKey = "_accessToken";

export const authenticatedPaths = ["/home", "/search", "/channels", "/reels", "/groups"];

export const Env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || ""
  }
  type EnvKeys = keyof typeof Env
  export const ENV = (key: EnvKeys) => Env[key]

export const authenticatedPathsRegex = [
  /^\/home/,
  /^\/search/,
  /^\/posts/,
  /^\/reels/,
  /^\/account/,
];
export const authenticatedPathRegex = new RegExp(
  authenticatedPathsRegex.map((r) => r.source).join("|")
);
