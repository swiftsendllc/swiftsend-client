"use client";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InstagramIcon from "@mui/icons-material/Instagram";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Container,
  FormControl,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
        <Typography variant="h5">Sign in with Instagram</Typography>
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
        <Stack direction="column" spacing={2}>
          <TextField
            required
            id="fullName-required"
            label="Full Name"
            type="fullName"
            value={fullName}
            focused
            autoFocus
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            required
            id="email-required"
            label="Email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="password-required"
            label="Password"
            type={showPassword ? "text" : "password"}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Typography variant="body2" color="text.secondary" textAlign="left">
            <a
              href="/login"
              style={{
                textDecoration: "none",
                color: "currentcolor",
              }}
            >
              Already have an account? Login
            </a>
          </Typography>
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={null}
            variant="contained"
            type="submit"
            href="/signin"
          >
            Continue
          </LoadingButton>
        </Stack>
      </FormControl>
    </Container>
  );
}
