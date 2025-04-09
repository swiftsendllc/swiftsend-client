'use client';

import { UserContext } from '@/hooks/context/user-context';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { sideBarOptions } from './SearchComponents';

export function LeftSideBar() {
  const router = useRouter();
  const [user] = useContext(UserContext);

  return (
    <>
      <Box
        top={1}
        left={1}
        zIndex={8}
        sx={{
          position: 'fixed',
          display: { xs: 'none', md: 'block' },
          pr: 0
        }}
      >
        <Paper elevation={3}>
          <Typography sx={{ mb: 4 }} variant="h5" color="primary">
            🆂🆆🅸🅵🆃🆂🅴🅽🅳
          </Typography>
          <Divider />
          <List sx={{ pb: 5 }}>
            {sideBarOptions.map((option, idx) => (
              <Box key={idx}>
                <ListItemButton onClick={() => router.push(option.path)} sx={{ mb: 1 }}>
                  <ListItemIcon>{option.leftIcon}</ListItemIcon>
                  <ListItemText disableTypography>
                    <Typography variant="body1">{option.label}</Typography>
                  </ListItemText>
                </ListItemButton>
              </Box>
            ))}
            <ListItemButton sx={{ minWidth: 300 }} onClick={() => router.push(`/${user.username}`)}>
              <ListItemIcon>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText disableTypography>
                <Typography variant="body1">Account</Typography>
              </ListItemText>
            </ListItemButton>
          </List>
        </Paper>
      </Box>
    </>
  );
}
