"use client";

import BottomNav from "@/components/BottomNav";
import VerifiedTopNav from "@/components/TopNav";
import { authenticated, authenticatedPaths } from "@/library/constants";
import { Container } from "@mui/material";
import { usePathname } from "next/navigation";

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if ([...authenticated].includes(pathname)) {
    return (
      <Container maxWidth="xs" style={{ padding: 5 }}>
        <VerifiedTopNav />
        {children}
        <BottomNav />
      </Container>
    );
  }

  if (![...authenticatedPaths].includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <Container maxWidth="xs" style={{ padding: 0 }}>
      {children}
      <BottomNav />
    </Container>
  );
}
