export const authCookieKey = "_accessToken";

export const authenticatedPaths = ["/home", "/search", "/messages", "/reels"];

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
