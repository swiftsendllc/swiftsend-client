'use client';

import { Box, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { sideBarOptions } from './SearchComponents';
interface SideBarProps {
  list: [] | null;
}
export function RightSideBar() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: theme.spacing(8),
          right: theme.spacing(2),
          width: 280,
          zIndex: 8,
          display: { xs: 'none', sm: '48%', md: 'block' }
        }}
      >
        <Paper elevation={0} sx={{ borderRadius: 2 }}>
          <List sx={{ p: 2 }}>
            {sideBarOptions.map((option, idx) => (
              <ListItemButton
                key={idx}
                onClick={() => router.push(option.path)}
                sx={{
                  mb: 1,
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                    boxShadow: 4,
                    transform: 'scale(1.01)'
                  }
                }}
              >
                <ListItemIcon>{option.leftIcon}</ListItemIcon>
                <ListItemText disableTypography primary={<Typography variant="body1">{option.label}</Typography>} />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      </Box>
    </>
  );
}
