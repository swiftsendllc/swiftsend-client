'use client';

import BottomNav from '@/components/BottomNav';
import { SideBar } from '@/components/LeftSideBar';
import { Container } from '@mui/material';

export default function PageTemplate({ children }: { children: React.ReactNode }) {
  return (
    <Container style={{ padding: 5 }}>
      {children}
      <SideBar />
      <BottomNav />
    </Container>
  );
}
