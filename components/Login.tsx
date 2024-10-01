"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InstagramIcon from "@mui/icons-material/Instagram";
import LoadingButton from "@mui/lab/LoadingButton";
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

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Box mt={{ md: 2, sm: 2 }} mb={2}>
        <IconButton
          aria-label="back-button"
          color="inherit"
          sx={{ padding: 0, py: 1 }}
          href="/"
        >
          <ArrowBackIcon sx={{ width: 30, height: 30 }} />
        </IconButton>
      </Box>
      <Box width="100%" textAlign="right" alignContent="center" mb={10}>
        <InstagramIcon sx={{ height: 100, width: 100 }} />
        <Typography variant="h5" fontWeight={300}>
          instagram
        </Typography>
      </Box>
      <Box mt={{ md: 2, sm: 2 }} mb={2}>
        <Typography variant="h5"> Login with Instagram</Typography>
      </Box>
      <FormControl
        variant="standard"
        fullWidth
        component="form"
        onSubmit={(event) => {
          event.preventDefault();
          return onSubmit();
        }}
      >
        <Stack direction="column" spacing={1}>
          <TextField
            required
            id="email-required"
            label="Email"
            type="email"
            autoComplete="username"
            value={email}
            focused
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            id="password-required"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Stack direction="row" spacing={15}>
            <Typography variant="body2" color="text.secondary" textAlign="left">
              <a
                style={{
                  textDecoration: "none",
                  color: "currentcolor",
                }}
                href="/forgot-password"
              >
                Forgot your password?
              </a>
            </Typography>

            <Typography color="text.secondary" textAlign="right">
              <a
                style={{
                  textDecoration: "none",
                  color: "text.secondary",
                }}
                href="/signup"
              >
                Create account
              </a>
            </Typography>
          </Stack>
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={null}
            variant="contained"
            type="submit"
          >
            Login
          </LoadingButton>
        </Stack>
      </FormControl>
    </Container>
  );
}
