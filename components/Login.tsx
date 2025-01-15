"use client";

import useAPI from "@/hooks/api/useAPI";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InstagramIcon from "@mui/icons-material/Instagram";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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
import InputAdornment from "@mui/material/InputAdornment";
import Link from "next/link";
import { useState } from "react";
import Animation from "./Animation";
import { useTranslation } from "@/locales/dictionary";

export default function LoginPage() {
  const { login } = useAPI();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const {t} = useTranslation()

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = async () => {
    setLoading(true);
    setPasswordError("");
    try {
      await login(email, password);
      window.location.href = "/home";
    } catch (err) {
      console.log(err);
      setPasswordError("Invalid credentials");
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
          LinkComponent={Link}
        >
          <ArrowBackIcon sx={{ width: 30, height: 30 }} />
        </IconButton>
      </Box>
      <Box width="100%" textAlign="right" alignContent="center" mb={10}>
        <Animation>
          <InstagramIcon sx={{ height: 100, width: 100 }} />
        </Animation>
        <Typography variant="h5" fontWeight={300}>
          instagram
        </Typography>
      </Box>
      <Box width="100%" alignContent="center" textAlign="center" mt={10}>
        <AccountCircleIcon sx={{ width: 25, height: 25 }} />
      </Box>
      <Box mt={{ md: 2, sm: 2 }} mb={2}>
        <Typography variant="h5"> {t("loginHeader")}</Typography>
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
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
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
          <Stack direction="row" spacing={15}>
            <Typography variant="body2" color="text.secondary" textAlign="left">
              <Link
                style={{
                  textDecoration: "none",
                  color: "currentcolor",
                }}
                href="/forgot-password"
              >
                {t('forgotPassword')}
              </Link>
            </Typography>

            <Typography color="text.secondary" textAlign="right">
              <Link
                style={{
                  textDecoration: "none",
                  color: "text.secondary",
                }}
                href="/signup"
              >
                {t('createAccount')}
              </Link>
            </Typography>
          </Stack>
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={null}
            variant="contained"
            type="submit"
            disabled={!(email && password)}
          >
            {t("login")}
          </LoadingButton>
        </Stack>
      </FormControl>
    </Container>
  );
}
