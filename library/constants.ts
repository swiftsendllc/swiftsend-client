export const authenticatedPaths = [
  "/home",
  "/search",
  "/posts",
  "/reels",
  "/account",
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
