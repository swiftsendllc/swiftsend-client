"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InstagramIcon from "@mui/icons-material/Instagram";

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

export default function VerifyOTPPage() {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

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
          href="/forgot-password"
        >
          <ArrowBackIcon sx={{ height: 30, width: 30 }} />
        </IconButton>
      </Box>
      <Box width="100%" alignContent="center" textAlign="right" mb={10}>
        <InstagramIcon sx={{ width: 100, height: 100 }} />
        <Typography variant="h5" fontWeight={300}>
          instagram
        </Typography>
      </Box>

      <Box mt={{ md: 2, sm: 2 }} mb={2}>
        <Typography variant="h5"> Verify OTP</Typography>
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
        <Stack direction='column' spacing={2}>
          <TextField
          required
          id="otp-required"
          label='Enter OTP'
          type="number"
          focused
          autoFocus
          
          />
        </Stack>
      </FormControl>
    </Container>
  );
}
