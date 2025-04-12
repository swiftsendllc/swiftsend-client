'use client';
import { LeftSideBar } from '@/components/LeftSideBar';
import { Stack } from '@mui/material';
import React from 'react';

export default function PageTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Stack
        direction={'row'}
        sx={{
          maxWidth: 'xs',
          mx: 'auto',
          px: { xs: 2, md: '300px' },
          pt: 2
        }}
      >
        {children}
        <LeftSideBar />
      </Stack>
    </>
  );
}
