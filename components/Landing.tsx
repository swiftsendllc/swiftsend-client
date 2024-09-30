"use client";

import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

export default function LandingPage() {
  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: "100vh",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Box width="100%" textAlign="center" alignContent="center" mb={20}>
        <InstagramIcon sx={{ height: 140, width: 140 }} />
        <Typography variant="h3" fontWeight={300}>
          instagram
        </Typography>
      </Box>

      <Stack spacing={3} mb={2}>
        <Button fullWidth variant="contained" color="success" href="/signup">
          Sign up
        </Button>

        <Button fullWidth variant="contained" href="/login">
          Login
        </Button>
        <Button
          fullWidth
          variant="contained"
          startIcon={<GoogleIcon />}
          href="/groups"
        >
          Login with Google
        </Button>
      </Stack>
      <Typography variant="body2" align="center" color="text.secondary">
        By signing up, you agree to our Terms of Service and Privacy Policy
      </Typography>
    </Container>
  );
}
