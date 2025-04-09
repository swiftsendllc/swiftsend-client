'use client';

import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { sideBarOptions } from './SearchComponents';

export function RightSideBar() {
  const router = useRouter();
  return (
    <>
      <Box top={1} right={1} zIndex={8} sx={{ position: 'fixed', display: { xs: 'none', md: 'block' }, pl: 0 }}>
        <Paper elevation={3}>
          <Typography variant="h5" color="primary" sx={{ mb: 4 }}>
            🆂🆆🅸🅵🆃🆂🅴🅽🅳
          </Typography>
          <Divider />
          <List sx={{ pb: 5, minWidth: 300 }}>
            {sideBarOptions.map((option, idx) => (
              <Box key={idx}>
                <ListItemButton
                  onClick={() => router.push(option.path)}
                  sx={{
                    mb: 1
                  }}
                >
                  <ListItemIcon>{option.leftIcon}</ListItemIcon>
                  <ListItemText disableTypography>
                    <Typography variant="body1">{option.label}</Typography>
                  </ListItemText>
                </ListItemButton>
              </Box>
            ))}
          </List>
        </Paper>
      </Box>
    </>
  );
}
