"use client";

import UseAPI from "@/hooks/useAPI";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InstagramIcon from "@mui/icons-material/Instagram";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
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
import { countries } from "./SearchComponents";

const genderOption = [
  {
    label: "Male",
  },
  {
    label: "Female",
  },
];

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const { signup } = UseAPI();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [continued, setContinued] = useState(false);

  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = async () => {
    setLoading(true);
    try {
      await signup(email, fullName, password, dateOfBirth, gender, region);
      window.location.href = "/signin";
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {continued ? (
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
              <Autocomplete
                disablePortal
                options={genderOption}
                renderInput={(params) => (
                  <TextField
                    required
                    label="Gender"
                    {...params}
                    type="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                )}
              />
              <Autocomplete
                disablePortal
                options={countries}
                renderInput={(params) => (
                  <TextField
                    required
                    label="Region"
                    type="region"
                    {...params}
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  />
                )}
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
      ) : (
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="left"
              >
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
                onClick={() => setContinued(true)}
              >
                Continue
              </LoadingButton>
            </Stack>
          </FormControl>
        </Container>
      )}
    </>
  );
}
