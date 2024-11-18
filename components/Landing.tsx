"use client";

import InstagramIcon from "@mui/icons-material/Instagram";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { GoogleIconCustom } from "./CustomIcons";

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

        <Button fullWidth variant="outlined" href="/login">
          Login
        </Button>
        <Button
          fullWidth
          variant="contained"
          startIcon={<GoogleIconCustom />}
          href="/account"
        >
          Continue with Google
        </Button>
      </Stack>
      <Typography variant="body2" align="center" color="text.secondary">
        By signing up, you agree to our <a href="/terms">Terms of Service</a>{" "}
        and <a href="/policy">Privacy Policy</a>
      </Typography>
    </Container>
  );
}
