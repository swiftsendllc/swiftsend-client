"use client";

import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";
import { Container } from "@mui/material";
import { useParams, usePathname } from "next/navigation";

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { id: groupId } = useParams();
  const pathName = usePathname();

  if (![`/groups/${groupId}`].includes(pathName)) {
    return <>{children}</>;
  }

  return (
    <Container maxWidth="xs" style={{ padding: 5 }}>
      <TopNav />
      {children}
      <BottomNav />
    </Container>
  );
}
