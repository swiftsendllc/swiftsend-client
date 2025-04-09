'use client';

import BottomNav from '@/components/BottomNav';
import { LeftSideBar } from '@/components/LeftSideBar';
import { authenticatedPaths } from '@/library/constants';
import { Container } from '@mui/material';
import { usePathname } from 'next/navigation';

export default function RootTemplate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (![...authenticatedPaths].includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <Container style={{ padding: 5 }}>
      {children}
      <LeftSideBar />
      <BottomNav />
    </Container>
  );
}
