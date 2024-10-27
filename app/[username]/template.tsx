"use client";

import BottomNav from "@/components/BottomNav";
import { Container } from "@mui/material";

export default function PageTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth="xs" style={{ padding: 5 }}>
      {children}
      <BottomNav />
    </Container>
  );
}
