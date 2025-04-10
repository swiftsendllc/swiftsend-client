'use client';

import { RightSideBar } from '@/components/RightSideBar';
import React from 'react';

export default function PageTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
