'use client';

import { Box, Typography } from '@mui/material';

export const PostAnalyticsBar = () => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 350,
        borderRadius: 4,
        p: 3,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        gap: 2,
        height: 'fit-content',
        backdropFilter: 'blur(15px)'
      }}
    >
      <Typography variant="h6" fontWeight={700} gutterBottom>
        📊 Post Analytics
      </Typography>
      <Box>
        <Typography variant="body2">🔥 Most Viewed Post</Typography>
        <Typography variant="subtitle2">&quot;Nature Sunset Shot&quot;</Typography>
      </Box>
      <Box>
        <Typography variant="body2">💰 Top Selling</Typography>
        <Typography variant="subtitle2">&quot;Urban Graffiti Wall&quot;</Typography>
      </Box>
      <Box>
        <Typography variant="body2">🆓 Most Liked Free</Typography>
        <Typography variant="subtitle2">&quot;Café Morning Shot&quot;</Typography>
      </Box>
    </Box>
  );
};
