"use client";

import InstagramIcon from "@mui/icons-material/Instagram";
import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
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
        alignContent: "baseline",
        alignItems: "center",
      }}
    >
      <Box width="100%" textAlign="left" alignContent="center" mb={20}>
        <InstagramIcon sx={{ height: 100, width: 100 }} />
        <Typography variant="h5" fontWeight={300}>
          instagram
        </Typography>
      </Box>
      <Box >Sign in with Instagram</Box>
    </Container>
  );
}
