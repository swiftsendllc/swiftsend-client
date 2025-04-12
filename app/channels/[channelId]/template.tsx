'use client';

import { LeftSideBar } from '@/components/LeftSideBar';
import { Stack } from '@mui/material';
import { SideChannelsList } from './components/SideChannelsList';

export default function PageTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Stack
        direction={'row'}
        sx={{
          maxWidth: '900px',
          mx: 'auto',
          px: { xs: 2, md: '300px' },
          pt: 2
        }}
      >
        {children}
        <LeftSideBar />
        <SideChannelsList />
      </Stack>
    </>
  );
}
