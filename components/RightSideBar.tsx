'use client';

import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { sideBarOptions } from './SearchComponents';

export function RightSideBar() {
  const router = useRouter();
  return (
    <>
      <Box>
        <Paper elevation={3}>
          <Typography variant="h5" color="primary">
            🆂🆆🅸🅵🆃🆂🅴🅽🅳
          </Typography>
          <Divider />
          <List>
            {sideBarOptions.map((option, idx) => (
              <Box key={idx}>
                <ListItemButton onClick={() => router.push(option.path)}>
                  <ListItemIcon>{option.leftIcon}</ListItemIcon>
                  <ListItemText>
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
