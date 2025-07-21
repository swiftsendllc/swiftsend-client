'use client';

import BottomNav from '@/components/BottomNav';
import { LeftSideBar } from '@/components/LeftSideBar';
import { authenticationPaths } from '@/library/constants';
import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';

export default function RootTemplate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if ([...authenticationPaths].includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <Box display="flex" height="100vh" fontFamily="Arial, sans-serif">
      <LeftSideBar />
      {children}
      <BottomNav />
    </Box>
  );
}
