'use client';

import { Box } from '@mui/material';
import Channels from '../page';
import { MessageAssetAndAnalyticsBar } from './components/MessageAssetAndAnalyticsBar';
import { MessageThread } from './components/MessageThread';

export default function MessagePage() {
  return (
    <Box display="flex" height="100vh" fontFamily="Arial, sans-serif" sx={{ minWidth: 0, overflow: 'hidden' }}>
      <Channels />
      <MessageThread />
      <MessageAssetAndAnalyticsBar />
    </Box>
  );
}
