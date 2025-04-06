'use client';

import { UserContext } from '@/hooks/context/user-context';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Box, Chip, Divider, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { sideBarOptions } from './SearchComponents';

export function SideBar() {
  const router = useRouter();
  const [user] = useContext(UserContext);

  return (
    <>
      <Box
        top={1}
        left={1}
        zIndex={8}
        sx={{
          position: 'absolute',
          maxWidth: '100%',
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Paper elevation={3}>
          <Chip
            sx={{
              my: 2
            }}
            label="swiftsend"
            color="primary"
            variant="filled"
          />
          <Divider />
          <List sx={{ width: '100%' }}>
            {sideBarOptions.map((option, idx) => (
              <Box key={idx} my={1}>
                <ListItemButton sx={{ minWidth: 300 }} onClick={() => router.push(option.path)}>
                  <ListItemIcon>{option.leftIcon}</ListItemIcon>
                  <ListItemText disableTypography>
                    <Typography variant="body1">{option.label}</Typography>
                  </ListItemText>
                </ListItemButton>
                <Divider />
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
            <Divider />
          </List>
        </Paper>
      </Box>
    </>
  );
}
