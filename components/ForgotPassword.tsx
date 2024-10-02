"use client";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InstagramIcon from "@mui/icons-material/Instagram";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Container,
  FormControl,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const onSubmit = async () => {
    setLoading(true);
    try {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: "100vh",
        alignItems: "center",
      }}
    >
      <Box mt={{ md: 2, sm: 2 }} mb={2}>
        <IconButton
          aria-label="back-button"
          color="inherit"
          sx={{ padding: 0, py: 1 }}
          href="/login"
        >
          <ArrowBackIcon sx={{ height: 30, width: 30 }} />
        </IconButton>
      </Box>
      <Box width="100%" alignContent="center" textAlign="right" mb={10}>
        <InstagramIcon sx={{ width: 100, height: 100 }} />
        <Typography variant="h5" fontWeight={300}>
          instagram
        </Typography>
        <Box width="100%" alignContent="center" textAlign="center">
          <Typography variant="h6" fontWeight={200} mt={6}>
            This extra step shows it&apos;s really you trying to sign in{" "}
          </Typography>
          <AccountCircleIcon sx={{ width: 25, height: 25, marginTop: 2 }}  />
        </Box>
      </Box>
      <Box mt={{ md: 2, sm: 2 }} mb={2}>
        <Typography variant="h5"> Verify email</Typography>
      </Box>
      <FormControl
        variant="standard"
        fullWidth
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          return onSubmit();
        }}
      >
        <Stack direction="column" spacing={2}>
          <TextField
            required
            id="email-required"
            label="Enter your email"
            type="email"
            autoComplete="username"
            value={email}
            focused
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={null}
            variant="contained"
            type="submit"
            href="/verify-otp"
          >
            verify
          </LoadingButton>
        </Stack>
      </FormControl>
    </Container>
  );
}
