"use client";

import { useTranslation } from "@/locales/dictionary";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InstagramIcon from "@mui/icons-material/Instagram";
import { LoadingButton } from "@mui/lab";

import {
  Box,
  Container,
  FormControl,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function VerifyOTPPage() {
  const [loading, setLoading] = useState(false);
  const [canSend, setCanResend] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const { t } = useTranslation();

  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true);
      return;
    }

    // set a timer to allow resend after 1 minute
    const interval = setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);
    //cleanup the timeout if the component unmounts
    return () => clearTimeout(interval);
  }, [timeLeft]);

  const onSubmit = async () => {
    if (!canSend) return;
    setCanResend(false);
    setLoading(true);
    setTimeLeft(60);
    try {
      console.log("Resending email");
    } finally {
      setLoading(false);
    }
    const timer = setTimeout(() => {
      setCanResend(true);
    }, 60000);
    return () => clearTimeout(timer);
  };
  //Reset the timeout after another 1 minute

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
        <Typography variant="h5"> {t("verifyEmailHeader")}</Typography>
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
          <Typography variant="h6" fontWeight={200}>
            {t("verifyEmail")}
          </Typography>
          <Typography variant="h6" fontWeight={200}>
            {t("emailCheck")}
          </Typography>
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            startIcon={null}
            variant="contained"
            type="submit"
            disabled={!canSend}
          >
            {canSend ? "Resend Email" : `Resend email in ${timeLeft} seconds`}
          </LoadingButton>
        </Stack>
      </FormControl>
    </Container>
  );
}
