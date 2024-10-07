export const authCookieKey = "_accessToken";

export const authenticatedPaths = [
  "/home",
  "/search",
  "/posts",
  "/reels",
  "/account",
  "/account/reels",
  "/account/subscribers",
  "/account/tags",
  "/account/settings"
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
