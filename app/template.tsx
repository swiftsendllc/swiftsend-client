'use client';

import BottomNav from '@/components/BottomNav';
import { LeftSideBar } from '@/components/LeftSideBar';
import { authenticatedPaths } from '@/library/constants';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { usePathname } from 'next/navigation';

export default function RootTemplate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMidScreen = useMediaQuery(theme.breakpoints.down('md'));

  if (![...authenticatedPaths].includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <Box display="flex" height="100vh" fontFamily="Arial, sans-serif">
      {!isSmallScreen && !isMidScreen && <LeftSideBar />}
      {children}
      <BottomNav />
    </Box>
  );
}
