import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata, Viewport } from "next";
import { Kanit } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { UserProfilesEntity } from "@/hooks/types";
import { UserContextWrapper } from "@/hooks/context/user-context";
import { authCookieKey } from "@/library/constants";
import theme from "@/util/theme";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import "./globals.css";

const kanitFont = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "400", "500", "600"],
});

export const metadata = {
  title: "Instagram",
  description: "cloning Instagram",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs14", "next14", "pwa", "next-pwa"],
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-192x192.png" },
    { rel: "icon", url: "icons/instagram-symbol.png" },
  ],
} satisfies Metadata;

export const viewport: Viewport = {
  themeColor: "black",
};

const validateAuth = async () => {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") ?? "/";
  const accessToken = cookies().get(authCookieKey)?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/status`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (
    (res.status === 401 || res.status === 403) &&
    !["/", "/login", "/signup"].includes(pathname)
  ) {
    return redirect("/");
  }

  const user = await res.json();
  return user as UserProfilesEntity;
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await validateAuth();

  console.log({ user });

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="generator" content={metadata.generator} />
        <link rel="manifest" href={metadata.manifest} />
        <meta name="keywords" content={metadata.keywords.join(", ")} />
        {metadata.icons.map(({ rel, url }, idx) => (
          <link key={idx} rel={rel} href={url} />
        ))}
      </head>

      <body className={kanitFont.className}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName="toaster-wrapper"
          toastOptions={{
            className: "single-toaster",
            duration: 5000,
            icon: null,
            style: {
              background: "#000",
              color: "#fff",
              padding: "5px 5px",
              borderRadius: "3px",
              fontSize: "14px",
            },
            success: { style: { background: "#000", color: "#fff" } },
            error: { style: { background: "#b33234", color: "#fff" } },
          }}
        />
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <UserContextWrapper user={user}>{children}</UserContextWrapper>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
