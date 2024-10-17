"use client";

import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";
import VerifiedTopNav from "@/components/VerifiedTopNav";
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
      //needs to be fixed verified top nav
      <Container maxWidth="xs" style={{ padding: 5 }}>
        <VerifiedTopNav/>
        {children}
        <BottomNav />
      </Container>
    );
  }
  if (![...authenticatedPaths].includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <Container maxWidth="xs" style={{ padding: 5 }}>
      {children}
      <BottomNav />
    </Container>
  );
}
