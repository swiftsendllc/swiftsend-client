"use client";

import { Box, Button, Stack, Typography } from "@mui/material";

export const EncryptionNoticePage = () => {
  
  return (
    <>
      <Stack
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        position="relative"
        marginY={10}

      >
        <Box textAlign="center">
          <Typography variant="h4" fontWeight={500}>
            Welcome to swiftsend!
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            It looks like you have no messages yet.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Send a swift or send anything
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }} color="info">
            Messages are end to end encrypted.<br/> No one outside of this messages
            can read or write
          </Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
          >
            Send a wave 👋
          </Button>
        </Box>
      </Stack>
    </>
  );
};
