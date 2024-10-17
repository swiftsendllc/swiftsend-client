export const authCookieKey = "_accessToken";

export const authenticatedPaths = [
  "/home",
  "/search",
  "/posts",
  "/reels",
  "/account/settings",
  "/account/profile",
];
export const authenticated = [
  "/account",
  "/account/subscribers",
  "/account/reels",
  "/account/tags",
];

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
