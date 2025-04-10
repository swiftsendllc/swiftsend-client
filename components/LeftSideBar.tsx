'use client';

import { UserContext } from '@/hooks/context/user-context';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  useTheme
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { sideBarOptions } from './SearchComponents';

export function LeftSideBar() {
  const router = useRouter();
  const [user] = useContext(UserContext);
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: theme.spacing(1),
          left: theme.spacing(2),
          width: 280,
          zIndex: 8,
          display: { xs: 'none', sm: '48%', md: 'block' }
        }}
      >
        <Paper elevation={0}>
          <Typography sx={{ mb: 4 }} variant="h5" color="primary">
            🆂🆆🅸🅵🆃🆂🅴🅽🅳
          </Typography>
          <Divider />
          <List
            sx={{
              pb: 5,
              minWidth: 280
            }}
          >
            {sideBarOptions.map((option, idx) => (
              <Box
                key={idx}
                sx={{
                  cursor: 'pointer',
                  boxShadow: 1,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: 4,
                    transform: 'scale(1.01)'
                  }
                }}
              >
                <ListItemButton onClick={() => router.push(option.path)} sx={{ mb: 1 }}>
                  <ListItemIcon>{option.leftIcon}</ListItemIcon>
                  <ListItemText disableTypography>
                    <Typography variant="body1">{option.label}</Typography>
                  </ListItemText>
                </ListItemButton>
              </Box>
            ))}
            <ListItemButton onClick={() => router.push(`/${user.username}`)}>
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
