"use client";

import useAPI from "@/hooks/api/useAPI";
import { useTranslation } from "@/locales/dictionary";
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
import Link from "next/link";
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
  const { signup } = useAPI();
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [fullName, setFullName] = useState("");
  const [isFullNameValid, setIsFullNameValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [continued, setContinued] = useState(false);
  const { t } = useTranslation();
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleContinue = () => {
    if (isEmailValid && isFullNameValid && password) {
      setContinued(true);
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const dob = new Date(dateOfBirth);
      await signup({
        fullName,
        email,
        password,
        gender: gender,
        region: region,
        dateOfBirth: dob,
      });

      window.location.href = "/channels";
    } catch (error) {
      console.error("SigUp failed", error);
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
              href="/signup"
              LinkComponent={Link}
            >
              <ArrowBackIcon sx={{ width: 30, height: 30 }} />
            </IconButton>
          </Box>
          <Box width="100%" textAlign="right" alignContent="center" mb={10}>
            <InstagramIcon sx={{ width: 100, height: 100 }} />
            <Typography variant="h5" fontWeight={300}>
              Swiftsend
            </Typography>
          </Box>
          <Box width="100%" alignContent="center" textAlign="center" mt={10}>
            <AccountCircleIcon sx={{ width: 25, height: 25 }} />
          </Box>
          <Box mt={{ md: 2, sm: 2 }} mb={2}>
            <Typography variant="h5">{t("signUpHeader")}</Typography>
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
                value={{ label: gender }}
                onChange={(e, newGender) => setGender(newGender?.label || "")}
                isOptionEqualToValue={(option, value) =>
                  option.label === value?.label
                }
                renderInput={(params) => (
                  <TextField required label="Gender" {...params} />
                )}
              />
              <Autocomplete
                disablePortal
                options={countries}
                value={{ label: region }}
                onChange={(e, newRegion) => setRegion(newRegion?.label || "")}
                isOptionEqualToValue={(option, value) =>
                  option.label === value?.label
                }
                renderInput={(params) => (
                  <TextField required label="Region" {...params} />
                )}
              />
              <LoadingButton
                loading={loading}
                loadingPosition="start"
                startIcon={null}
                variant="contained"
                type="submit"
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
              LinkComponent={Link}
            >
              <ArrowBackIcon sx={{ width: 30, height: 30 }} />
            </IconButton>
          </Box>
          <Box width="100%" textAlign="right" alignContent="center" mb={10}>
            <InstagramIcon sx={{ height: 100, width: 100 }} />
            <Typography variant="h5" fontWeight={300}>
              Swiftsend
            </Typography>
          </Box>
          <Box width="100%" alignContent="center" textAlign="center" mt={10}>
            <AccountCircleIcon sx={{ width: 25, height: 25 }} />
          </Box>
          <Box mt={{ md: 2, sm: 2 }} mb={2}>
            <Typography variant="h5">{t("signUpHeader")}</Typography>
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
                onChange={(e) => {
                  setFullName(e.target.value);
                  setIsFullNameValid(
                    /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(
                      e.target.value
                    )
                  );
                }}
              />
              <TextField
                required
                id="email-required"
                label="Email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onBlur={(e) => {
                  setIsEmailValid(
                    /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(
                      e.target.value
                    )
                  );
                }}
                error={!!email && !isEmailValid}
                helperText={
                  email && !isEmailValid ? (
                    <Typography sx={{ color: "var(--error)" }}>
                      {t("validEmail")}
                    </Typography>
                  ) : null
                }
              />
              <TextField
                required
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
                <Link
                  href="/login"
                  style={{
                    textDecoration: "none",
                    color: "currentcolor",
                  }}
                >
                  {t("existingAccount")}
                </Link>
              </Typography>
              <LoadingButton
                loading={loading}
                loadingPosition="start"
                startIcon={null}
                disabled={
                  !(
                    password &&
                    fullName &&
                    email &&
                    isEmailValid &&
                    isFullNameValid
                  )
                }
                variant="contained"
                type="submit"
                onClick={handleContinue}
              >
                {t("continue")}
              </LoadingButton>
            </Stack>
          </FormControl>
        </Container>
      )}
    </>
  );
}
