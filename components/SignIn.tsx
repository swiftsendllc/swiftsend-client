"use client";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InstagramIcon from "@mui/icons-material/Instagram";
import { LoadingButton } from "@mui/lab";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


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

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState("");

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
        <InstagramIcon sx={{ width: 100, height: 100 }} />
        <Typography variant="h5" fontWeight={300}>
          instagram
        </Typography>
      </Box>
      <Box width="100%" alignContent="center" textAlign="center" mt={10}>
        <AccountCircleIcon sx={{ width: 25, height: 25 }} />
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
            id="date-of-birth-required"
            label="Date of birth"
            type="date"
            value={dateOfBirth}
            focused
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
          <TextField
            required
            id="gender-required"
            label="Gender"
            type="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <TextField
            required
            id="region-required"
            label="Region"
            type="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={null}
            variant="contained"
            type="submit"
            href="/"
          >
            Sign In
          </LoadingButton>
        </Stack>
      </FormControl>
    </Container>
  );
}
